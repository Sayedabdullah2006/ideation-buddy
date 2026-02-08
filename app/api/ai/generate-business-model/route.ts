/**
 * API Route: Generate Business Model Canvas
 *
 * POST /api/ai/generate-business-model
 * Generates business model and MVP features using KIMI AI
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';
import { generateCompletion, parseAIJSON } from '@/lib/api/kimi-client';
import { buildBusinessModelPrompt, getSystemPrompt } from '@/lib/ai/prompts';
import { enforceRateLimit } from '@/lib/api/rate-limiter';
import { logAIGeneration } from '@/lib/ai/ai-logger';
import { BusinessModelCanvas, MVPFeatures } from '@/types';

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
      selectedSolution: project.selectedSolution as any,
    };

    const userPrompt = buildBusinessModelPrompt(projectData);
    const systemPrompt = getSystemPrompt('prototype');

    const aiResponse = await generateCompletion(userPrompt, {
      systemPrompt,
      temperature: 0.7,
      maxTokens: 3000,
    });

    const parsedData = parseAIJSON<{
      businessModel: BusinessModelCanvas;
      mvpFeatures: MVPFeatures;
    }>(aiResponse.content);

    await prisma.project.update({
      where: { id: projectId },
      data: {
        businessModel: parsedData.businessModel,
        mvpFeatures: parsedData.mvpFeatures,
        status: 'PROTOTYPE',
      },
    });

    const latencyMs = Date.now() - startTime;
    await logAIGeneration({
      projectId,
      step: 'PROTOTYPE',
      promptTokens: Math.floor(aiResponse.tokensUsed * 0.3),
      completionTokens: Math.floor(aiResponse.tokensUsed * 0.7),
      totalTokens: aiResponse.tokensUsed,
      model: aiResponse.model,
      latencyMs,
      success: true,
    });

    return NextResponse.json({
      success: true,
      data: parsedData,
      message: 'تم إنشاء نموذج العمل بنجاح',
    });

  } catch (error: any) {
    console.error('AI Business Model Generation Error:', error);

    const body = await request.json().catch(() => ({ projectId: 'unknown' }));
    await logAIGeneration({
      projectId: body.projectId,
      step: 'PROTOTYPE',
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
        error: error.message || 'حدث خطأ أثناء إنشاء نموذج العمل',
      },
      { status: 500 }
    );
  }
}
