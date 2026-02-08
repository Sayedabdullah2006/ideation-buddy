/**
 * Get Current User Profile API Route
 */

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'غير مصرح',
        },
        { status: 401 }
      );
    }

    // Get full user details
    const userDetails = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
        lastLogin: true,
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });

    if (!userDetails) {
      return NextResponse.json(
        {
          success: false,
          error: 'المستخدم غير موجود',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: userDetails,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'حدث خطأ أثناء جلب بيانات المستخدم',
      },
      { status: 500 }
    );
  }
}
