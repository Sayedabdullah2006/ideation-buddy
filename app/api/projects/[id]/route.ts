/**
 * Individual Project API Routes
 * GET - Get project by ID
 * PATCH - Update project
 * DELETE - Delete project
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { updateProjectSchema } from '@/lib/validations/project.schema';
import { canEditProject, canDeleteProject } from '@/lib/auth/rbac';

// GET /api/projects/[id] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // Check authorization
    if (!canEditProject(user, project.userId)) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح بالوصول إلى هذا المشروع' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء جلب المشروع' },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/[id] - Update project
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // Check authorization
    if (!canEditProject(user, existingProject.userId)) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح بتعديل هذا المشروع' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = updateProjectSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'بيانات غير صالحة',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Update project
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...validationResult.data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'تم تحديث المشروع بنجاح',
      data: project,
    });
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء تحديث المشروع' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // Check authorization
    if (!canDeleteProject(user, existingProject.userId)) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح بحذف هذا المشروع' },
        { status: 403 }
      );
    }

    // Delete project (cascade will delete related AI logs)
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'تم حذف المشروع بنجاح',
    });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء حذف المشروع' },
      { status: 500 }
    );
  }
}
