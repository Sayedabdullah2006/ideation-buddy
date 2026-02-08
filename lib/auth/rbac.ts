/**
 * Role-Based Access Control (RBAC) Utilities
 */

import { UserRole, UserStatus } from '@prisma/client';
import { AuthUser } from '@/types';

// ============================================
// PERMISSION CHECKS
// ============================================

/**
 * Check if user has admin role
 */
export function isAdmin(user: AuthUser | null | undefined): boolean {
  return user?.role === UserRole.ADMIN;
}

/**
 * Check if user has regular user role
 */
export function isUser(user: AuthUser | null | undefined): boolean {
  return user?.role === UserRole.USER;
}

/**
 * Check if user account is active
 */
export function isActive(user: AuthUser | null | undefined): boolean {
  return user?.status === UserStatus.ACTIVE;
}

/**
 * Check if user can access admin dashboard
 */
export function canAccessAdmin(user: AuthUser | null | undefined): boolean {
  return isAdmin(user) && isActive(user);
}

/**
 * Check if user can access regular dashboard
 */
export function canAccessDashboard(user: AuthUser | null | undefined): boolean {
  return (isAdmin(user) || isUser(user)) && isActive(user);
}

/**
 * Check if user can manage other users
 */
export function canManageUsers(user: AuthUser | null | undefined): boolean {
  return isAdmin(user) && isActive(user);
}

/**
 * Check if user can view AI logs
 */
export function canViewAILogs(user: AuthUser | null | undefined): boolean {
  return isAdmin(user) && isActive(user);
}

/**
 * Check if user can create projects
 */
export function canCreateProjects(user: AuthUser | null | undefined): boolean {
  return (isAdmin(user) || isUser(user)) && isActive(user);
}

/**
 * Check if user owns a resource
 */
export function isOwner(userId: string, resourceUserId: string): boolean {
  return userId === resourceUserId;
}

/**
 * Check if user can edit a project (admin or owner)
 */
export function canEditProject(
  user: AuthUser | null | undefined,
  projectUserId: string
): boolean {
  if (!user || !isActive(user)) return false;
  return isAdmin(user) || isOwner(user.id, projectUserId);
}

/**
 * Check if user can delete a project (admin or owner)
 */
export function canDeleteProject(
  user: AuthUser | null | undefined,
  projectUserId: string
): boolean {
  if (!user || !isActive(user)) return false;
  return isAdmin(user) || isOwner(user.id, projectUserId);
}

// ============================================
// ROUTE PERMISSION MAPPING
// ============================================

export const PROTECTED_ROUTES = {
  // Admin-only routes
  ADMIN: ['/admin', '/admin/users', '/admin/analytics', '/admin/logs'],

  // Authenticated user routes (both ADMIN and USER)
  USER: ['/projects', '/wizard', '/dashboard'],

  // Public routes (no authentication required)
  PUBLIC: ['/', '/login', '/register'],
} as const;

/**
 * Check if route requires authentication
 */
export function isProtectedRoute(pathname: string): boolean {
  const allProtected = [
    ...PROTECTED_ROUTES.ADMIN,
    ...PROTECTED_ROUTES.USER,
  ];

  return allProtected.some((route) => pathname.startsWith(route));
}

/**
 * Check if route requires admin access
 */
export function isAdminRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.ADMIN.some((route) => pathname.startsWith(route));
}

/**
 * Check if route is public
 */
export function isPublicRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.PUBLIC.some((route) => pathname === route);
}

/**
 * Get redirect URL based on user role
 */
export function getDefaultRedirect(user: AuthUser | null | undefined): string {
  if (!user) return '/login';
  if (isAdmin(user)) return '/admin';
  return '/projects';
}
