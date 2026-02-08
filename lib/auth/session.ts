/**
 * Session Helper Functions
 * Server-side utilities for getting current user session
 */

import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth-options';
import { AuthUser } from '@/types';

/**
 * Get current authenticated user (server-side)
 * Returns null if not authenticated
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
    status: session.user.status,
  };
}

/**
 * Get current session (server-side)
 * Returns null if not authenticated
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session?.user;
}

/**
 * Require authentication - throws error if not authenticated
 * Use in API routes or Server Components
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

/**
 * Require admin role - throws error if not admin
 * Use in API routes or Server Components
 */
export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth();

  if (user.role !== 'ADMIN') {
    throw new Error('Forbidden - Admin access required');
  }

  return user;
}
