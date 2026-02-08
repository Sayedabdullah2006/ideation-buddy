/**
 * API Route: Generate User Personas
 *
 * POST /api/ai/generate-personas
 * Generates 3 user personas based on project idea using KIMI AI
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';
import { generateCompletion, parseAIJSON } from '@/lib/api/kimi-client';
import { buildPersonaPrompt, getSystemPrompt } from '@/lib/ai/prompts';
import { enforceRateLimit } from '@/lib/api/rate-limiter';
import { logAIGeneration } from '@/lib/ai/ai-logger';
import { PersonaData } from '@/types';

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Authenticate user
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const body = await request.json();
    const { projectId } = body;

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'معرف المشروع مطلوب' },
        { status: 400 }
      );
    }

    // 3. Check rate limit
    try {
      await enforceRateLimit(session.user.id);
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 429 }
      );
    }

    // 4. Fetch project from database
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // 5. Verify ownership
    if (project.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح لك بالوصول لهذا المشروع' },
        { status: 403 }
      );
    }

    // 6. Build AI prompt
    const projectData = {
      title: project.title,
      description: project.description || '',
      rawIdea: project.rawIdea || '',
    };

    const userPrompt = buildPersonaPrompt(projectData);
    const systemPrompt = getSystemPrompt('empathize');

    // 7. Call KIMI AI
    const aiResponse = await generateCompletion(userPrompt, {
      systemPrompt,
      temperature: 0.8, // Higher creativity for persona generation
      maxTokens: 2000,
    });

    // 8. Parse AI response
    const parsedData = parseAIJSON<{ personas: PersonaData[] }>(aiResponse.content);

    if (!parsedData.personas || parsedData.personas.length === 0) {
      throw new Error('لم يتم إنشاء شخصيات من AI');
    }

    // 9. Update project with personas
    await prisma.project.update({
      where: { id: projectId },
      data: {
        personas: parsedData.personas,
        status: 'EMPATHIZE',
      },
    });

    // 10. Log AI generation
    const latencyMs = Date.now() - startTime;
    await logAIGeneration({
      projectId,
      step: 'EMPATHIZE',
      promptTokens: aiResponse.tokensUsed * 0.3, // Estimate
      completionTokens: aiResponse.tokensUsed * 0.7, // Estimate
      totalTokens: aiResponse.tokensUsed,
      model: aiResponse.model,
      latencyMs,
      success: true,
    });

    // 11. Return success
    return NextResponse.json({
      success: true,
      data: {
        personas: parsedData.personas,
      },
      message: 'تم إنشاء الشخصيات بنجاح',
    });

  } catch (error: any) {
    console.error('AI Persona Generation Error:', error);

    // Log failed generation
    const body = await request.json().catch(() => ({ projectId: 'unknown' }));
    await logAIGeneration({
      projectId: body.projectId,
      step: 'EMPATHIZE',
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      model: 'unknown',
      latencyMs: Date.now() - startTime,
      success: false,
      errorMessage: error.message,
    });

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'حدث خطأ أثناء إنشاء الشخصيات',
      },
      { status: 500 }
    );
  }
}
