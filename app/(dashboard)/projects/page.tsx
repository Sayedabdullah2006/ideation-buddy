/**
 * Projects Page
 * List and manage user projects
 */

import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FolderKanban, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default async function ProjectsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  // Fetch user projects
  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
    take: 10,
  });

  const projectCount = await prisma.project.count({
    where: { userId: user.id },
  });

  const completedCount = await prisma.project.count({
    where: {
      userId: user.id,
      status: 'COMPLETED',
    },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">مشاريعي</h1>
          <p className="text-muted-foreground mt-2">
            إدارة مشاريعك وتتبع تقدمها
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/wizard">
            <Plus className="ml-2 h-5 w-5" />
            مشروع جديد
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المشاريع</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              جميع مشاريعك
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">المشاريع المكتملة</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              تم إنشاء MVP
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">قيد التنفيذ</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount - completedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              مشاريع نشطة
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">المشاريع الأخيرة</h2>

        {projects.length === 0 ? (
          <Card className="p-12">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <FolderKanban className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">لا توجد مشاريع بعد</h3>
                <p className="text-muted-foreground mt-2">
                  ابدأ بإنشاء مشروعك الأول لتحويل أفكارك إلى واقع
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/wizard">
                  <Plus className="ml-2 h-5 w-5" />
                  إنشاء مشروع جديد
                </Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-2">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        project.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}
                    >
                      {getStatusLabel(project.status)}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="text-xs text-muted-foreground">
                    آخر تحديث:{' '}
                    {format(new Date(project.updatedAt), 'dd MMM yyyy', {
                      locale: ar,
                    })}
                  </div>

                  {/* Actions */}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/wizard?projectId=${project.id}`}>
                      متابعة العمل
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    DRAFT: 'مسودة',
    EMPATHIZE: 'تعاطف',
    DEFINE: 'تحديد',
    IDEATE: 'ابتكار',
    PROTOTYPE: 'نموذج',
    VALIDATE: 'تحقق',
    COMPLETED: 'مكتمل',
    ARCHIVED: 'مؤرشف',
  };
  return labels[status] || status;
}
