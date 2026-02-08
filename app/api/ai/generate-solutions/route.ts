/**
 * API Route: Generate Solutions
 *
 * POST /api/ai/generate-solutions
 * Generates solution ideas using KIMI AI
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';
import { generateCompletion, parseAIJSON } from '@/lib/api/kimi-client';
import { buildSolutionGenerationPrompt, getSystemPrompt } from '@/lib/ai/prompts';
import { enforceRateLimit } from '@/lib/api/rate-limiter';
import { logAIGeneration } from '@/lib/ai/ai-logger';
import { SolutionData } from '@/types';

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { projectId } = body;

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'معرف المشروع مطلوب' },
        { status: 400 }
      );
    }

    await enforceRateLimit(session.user.id);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'المشروع غير موجود أو غير مصرح' },
        { status: 404 }
      );
    }

    const projectData = {
      title: project.title,
      description: project.description || '',
      problemStatement: project.problemStatement || '',
      selectedPersona: project.selectedPersona as any,
    };

    const userPrompt = buildSolutionGenerationPrompt(projectData);
    const systemPrompt = getSystemPrompt('ideate');

    const aiResponse = await generateCompletion(userPrompt, {
      systemPrompt,
      temperature: 0.9, // High creativity for ideation
      maxTokens: 2500,
    });

    const parsedData = parseAIJSON<{ solutions: SolutionData[] }>(aiResponse.content);

    if (!parsedData.solutions || parsedData.solutions.length === 0) {
      throw new Error('لم يتم إنشاء حلول من AI');
    }

    await prisma.project.update({
      where: { id: projectId },
      data: {
        solutions: parsedData.solutions,
        status: 'IDEATE',
      },
    });

    const latencyMs = Date.now() - startTime;
    await logAIGeneration({
      projectId,
      step: 'IDEATE',
      promptTokens: Math.floor(aiResponse.tokensUsed * 0.3),
      completionTokens: Math.floor(aiResponse.tokensUsed * 0.7),
      totalTokens: aiResponse.tokensUsed,
      model: aiResponse.model,
      latencyMs,
      success: true,
    });

    return NextResponse.json({
      success: true,
      data: {
        solutions: parsedData.solutions,
      },
      message: 'تم إنشاء الحلول بنجاح',
    });

  } catch (error: any) {
    console.error('AI Solution Generation Error:', error);

    const body = await request.json().catch(() => ({ projectId: 'unknown' }));
    await logAIGeneration({
      projectId: body.projectId,
      step: 'IDEATE',
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
        error: error.message || 'حدث خطأ أثناء إنشاء الحلول',
      },
      { status: 500 }
    );
  }
}
