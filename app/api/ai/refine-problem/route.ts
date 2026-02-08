/**
 * API Route: Refine Problem Statement
 *
 * POST /api/ai/refine-problem
 * Refines problem statement using KIMI AI
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';
import { generateCompletion, parseAIJSON } from '@/lib/api/kimi-client';
import { buildProblemRefinementPrompt, getSystemPrompt } from '@/lib/ai/prompts';
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
    const { projectId, problemStatement } = body;

    if (!projectId || !problemStatement) {
      return NextResponse.json(
        { success: false, error: 'معرف المشروع وبيان المشكلة مطلوبان' },
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
      selectedPersona: project.selectedPersona as any,
      problemStatement,
    };

    const userPrompt = buildProblemRefinementPrompt(projectData);
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

    // Get the recommended statement to save
    const recommendedStatement = parsedData.refinedStatements.find(
      s => s.id === parsedData.recommended
    );

    // Update project with the recommended statement
    await prisma.project.update({
      where: { id: projectId },
      data: {
        problemStatement: recommendedStatement?.statement || problemStatement,
        status: 'DEFINE',
      },
    });

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
      message: 'تم تحسين بيان المشكلة بنجاح',
    });

  } catch (error: any) {
    console.error('AI Problem Refinement Error:', error);

    // Don't log if we don't have a valid session/project
    // The logger requires userId and projectId

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'حدث خطأ أثناء تحسين بيان المشكلة',
      },
      { status: 500 }
    );
  }
}
