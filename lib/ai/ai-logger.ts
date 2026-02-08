/**
 * AI Generation Logger
 *
 * Logs all AI requests and responses to the database for monitoring and analytics.
 */

import { prisma } from '@/lib/prisma';
import { AILogStep, AILogStatus } from '@prisma/client';

export interface AILogData {
  userId: string;
  projectId: string;
  step: AILogStep;
  prompt: string;
  response?: string;
  status: AILogStatus;
  tokensUsed?: number;
  latencyMs?: number;
  errorMessage?: string;
  modelVersion?: string;
}

/**
 * Log AI generation to database
 */
export async function logAIGeneration(data: AILogData): Promise<void> {
  try {
    await prisma.aIGenerationLog.create({
      data: {
        userId: data.userId,
        projectId: data.projectId,
        step: data.step,
        prompt: data.prompt,
        response: data.response,
        status: data.status,
        tokensUsed: data.tokensUsed,
        latencyMs: data.latencyMs,
        errorMessage: data.errorMessage,
        modelVersion: data.modelVersion,
      },
    });
  } catch (error) {
    console.error('Failed to log AI generation:', error);
    // Don't throw - logging failure shouldn't break the API
  }
}

export default {
  logAIGeneration,
};
