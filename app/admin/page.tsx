/**
 * Admin Dashboard
 * Admin-only page with system statistics
 */

import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FolderKanban, Bot, DollarSign } from 'lucide-react';

export default async function AdminPage() {
  const user = await getCurrentUser();

  // Require admin role
  if (!user || user.role !== 'ADMIN') {
    redirect('/projects');
  }

  // Fetch statistics
  const [totalUsers, activeUsers, totalProjects, completedProjects, totalAILogs] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'ACTIVE' } }),
      prisma.project.count(),
      prisma.project.count({ where: { status: 'COMPLETED' } }),
      prisma.aIGenerationLog.count(),
    ]);

  // Calculate total AI tokens used
  const aiUsage = await prisma.aIGenerationLog.aggregate({
    _sum: {
      tokensUsed: true,
    },
  });

  const totalTokens = aiUsage._sum.tokensUsed || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">لوحة الإدارة</h1>
        <p className="text-muted-foreground mt-2">
          مرحباً، {user.name}. نظرة عامة على النظام
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeUsers} نشط
            </p>
          </CardContent>
        </Card>

        {/* Total Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المشاريع</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {completedProjects} مكتمل
            </p>
          </CardContent>
        </Card>

        {/* AI Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">طلبات الذكاء الاصطناعي</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAILogs}</div>
            <p className="text-xs text-muted-foreground mt-1">
              إجمالي الطلبات
            </p>
          </CardContent>
        </Card>

        {/* AI Tokens Used */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">استهلاك Tokens</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTokens.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              إجمالي Tokens
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              إدارة المستخدمين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              عرض وإدارة حسابات المستخدمين
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              سجلات الذكاء الاصطناعي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              مراقبة أداء الذكاء الاصطناعي
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              التحليلات والتقارير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              تقارير الاستخدام والتكاليف
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Notice */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">قريباً</h3>
            <p className="text-sm text-muted-foreground">
              المزيد من ميزات الإدارة ستكون متاحة في المراحل القادمة
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
