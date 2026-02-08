/**
 * Rate Limiter for AI API Requests
 *
 * Tracks and enforces rate limits per user to prevent API abuse.
 */

import { prisma } from '@/lib/prisma';

// ============================================
// CONFIGURATION
// ============================================

const RATE_LIMIT_PER_USER = parseInt(process.env.AI_RATE_LIMIT_PER_USER || '50');
const RATE_LIMIT_WINDOW = parseInt(process.env.AI_RATE_LIMIT_WINDOW || '86400'); // 24 hours in seconds

// ============================================
// RATE LIMITER
// ============================================

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

/**
 * Check if user has exceeded rate limit
 */
export async function checkRateLimit(userId: string): Promise<RateLimitResult> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW * 1000);

  // Count AI requests in the current window
  const requestCount = await prisma.aIGenerationLog.count({
    where: {
      project: {
        userId,
      },
      createdAt: {
        gte: windowStart,
      },
    },
  });

  const remaining = Math.max(0, RATE_LIMIT_PER_USER - requestCount);
  const allowed = remaining > 0;
  const resetAt = new Date(Date.now() + RATE_LIMIT_WINDOW * 1000);

  return {
    allowed,
    remaining,
    resetAt,
  };
}

/**
 * Enforce rate limit (throws error if exceeded)
 */
export async function enforceRateLimit(userId: string): Promise<void> {
  const result = await checkRateLimit(userId);

  if (!result.allowed) {
    throw new Error(
      `تم تجاوز حد الطلبات اليومية (${RATE_LIMIT_PER_USER} طلب). ` +
      `سيتم إعادة التعيين في ${result.resetAt.toLocaleString('ar-EG')}`
    );
  }
}

/**
 * Get remaining requests for user
 */
export async function getRemainingRequests(userId: string): Promise<number> {
  const result = await checkRateLimit(userId);
  return result.remaining;
}

export default {
  checkRateLimit,
  enforceRateLimit,
  getRemainingRequests,
};
