/**
 * Next.js Middleware
 * Protects routes and enforces authentication/authorization
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UserRole, UserStatus } from '@prisma/client';

// Routes that require authentication
const PROTECTED_ROUTES = ['/projects', '/wizard', '/dashboard', '/admin'];

// Routes that require admin role
const ADMIN_ROUTES = ['/admin'];

// Public routes (accessible without authentication)
const PUBLIC_ROUTES = ['/', '/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route);
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && token) {
    const redirectUrl = token.role === UserRole.ADMIN ? '/admin' : '/projects';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Require authentication for protected routes
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check if user account is active
  if (token && token.status !== UserStatus.ACTIVE) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    // Clear session cookie
    response.cookies.delete('next-auth.session-token');
    response.cookies.delete('__Secure-next-auth.session-token');
    return response;
  }

  // Require admin role for admin routes
  if (isAdminRoute && token?.role !== UserRole.ADMIN) {
    return NextResponse.redirect(new URL('/projects', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/auth/* (NextAuth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
