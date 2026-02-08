/**
 * Idea Validation API Route
 * POST - Validate idea using AI agent
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { generateWithContext, parseAIJSON } from '@/lib/api/gemini-client';
import { buildIdeaValidationPrompt, SYSTEM_PROMPTS } from '@/lib/ai/prompts';
import { IdeaValidationResult } from '@/types';

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const { projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'معرف المشروع مطلوب' },
        { status: 400 }
      );
    }

    // Get project data
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // Check ownership
    if (project.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح بالوصول لهذا المشروع' },
        { status: 403 }
      );
    }

    // Build the validation prompt
    const prompt = buildIdeaValidationPrompt({
      title: project.title,
      description: project.description,
      rawIdea: project.rawIdea || project.description,
      personas: (project.personas as any[]) || [],
      problemStatement: project.problemStatement || undefined,
      selectedSolution: project.selectedSolution as any,
      businessModel: project.businessModel as any,
      mvpFeatures: project.mvpFeatures as any,
    });

    // Call Gemini API
    const aiResponse = await generateWithContext(
      [
        { role: 'system', content: SYSTEM_PROMPTS.IDEA_VALIDATION },
        { role: 'user', content: prompt },
      ],
      { temperature: 0.7, maxTokens: 8000 }
    );

    const latencyMs = Date.now() - startTime;

    // Parse response
    const validationResult: IdeaValidationResult = parseAIJSON(aiResponse.content);

    // Update project with token usage
    await prisma.project.update({
      where: { id: projectId },
      data: {
        aiTokensUsed: {
          increment: aiResponse.tokensUsed || 0,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: validationResult,
      tokensUsed: aiResponse.tokensUsed,
      latencyMs,
    });

  } catch (error) {
    console.error('Idea validation error:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء التحقق من الفكرة' },
      { status: 500 }
    );
  }
}
