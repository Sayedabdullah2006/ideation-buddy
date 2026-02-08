/**
 * API Route: Generate Problem Statement from Selected Personas
 *
 * POST /api/ai/generate-problem-statement
 * Generates a problem statement based on project idea and selected personas using AI
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';
import { generateCompletion, parseAIJSON } from '@/lib/api/kimi-client';
import { buildProblemStatementPrompt, getSystemPrompt } from '@/lib/ai/prompts';
import { enforceRateLimit } from '@/lib/api/rate-limiter';
import { logAIGeneration } from '@/lib/ai/ai-logger';

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
    const { projectId, selectedPersonas } = body;

    if (!projectId || !selectedPersonas || selectedPersonas.length === 0) {
      return NextResponse.json(
        { success: false, error: 'معرف المشروع والشخصيات المختارة مطلوبة' },
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
      rawIdea: project.rawIdea || '',
      selectedPersonas,
    };

    const userPrompt = buildProblemStatementPrompt(projectData);
    const systemPrompt = getSystemPrompt('define');

    const aiResponse = await generateCompletion(userPrompt, {
      systemPrompt,
      temperature: 0.7,
      maxTokens: 1500,
    });

    const parsedData = parseAIJSON<{
      refinedStatements: Array<{ id: string; statement: string; reasoning: string }>;
      recommended: string;
      insights: string;
    }>(aiResponse.content);

    const latencyMs = Date.now() - startTime;
    await logAIGeneration({
      userId: session.user.id,
      projectId,
      step: 'DEFINE_PROBLEM',
      prompt: userPrompt,
      response: aiResponse.content,
      status: 'SUCCESS',
      tokensUsed: aiResponse.tokensUsed,
      latencyMs,
      modelVersion: aiResponse.model,
    });

    return NextResponse.json({
      success: true,
      data: parsedData,
      message: 'تم توليد بيان المشكلة بنجاح',
    });

  } catch (error: any) {
    console.error('AI Problem Statement Generation Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'حدث خطأ أثناء توليد بيان المشكلة',
      },
      { status: 500 }
    );
  }
}
