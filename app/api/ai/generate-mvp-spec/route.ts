/**
 * API Route: Generate MVP Specification
 *
 * POST /api/ai/generate-mvp-spec
 * Generates comprehensive MVP technical specification using KIMI AI
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';
import { generateCompletion, parseAIJSON } from '@/lib/api/kimi-client';
import { buildMVPSpecificationPrompt, getSystemPrompt } from '@/lib/ai/prompts';
import { enforceRateLimit } from '@/lib/api/rate-limiter';
import { logAIGeneration } from '@/lib/ai/ai-logger';
import { MVPSpecification } from '@/types';

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
      businessModel: project.businessModel as any,
      mvpFeatures: project.mvpFeatures as any,
    };

    const userPrompt = buildMVPSpecificationPrompt(projectData);
    const systemPrompt = getSystemPrompt('validate');

    const aiResponse = await generateCompletion(userPrompt, {
      systemPrompt,
      temperature: 0.6, // Lower for technical accuracy
      maxTokens: 3500,
    });

    const parsedData = parseAIJSON<MVPSpecification>(aiResponse.content);

    await prisma.project.update({
      where: { id: projectId },
      data: {
        mvpSpec: parsedData,
        status: 'VALIDATE',
      },
    });

    const latencyMs = Date.now() - startTime;
    await logAIGeneration({
      userId: session.user.id,
      projectId,
      step: 'VALIDATE_MVP',
      prompt: userPrompt.substring(0, 500),
      response: aiResponse.content.substring(0, 1000),
      status: 'SUCCESS',
      tokensUsed: aiResponse.tokensUsed,
      latencyMs,
      modelVersion: aiResponse.model,
    });

    return NextResponse.json({
      success: true,
      data: parsedData,
      message: 'تم إنشاء مواصفات MVP بنجاح',
    });

  } catch (error: any) {
    console.error('AI MVP Spec Generation Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'حدث خطأ أثناء إنشاء مواصفات MVP',
      },
      { status: 500 }
    );
  }
}
