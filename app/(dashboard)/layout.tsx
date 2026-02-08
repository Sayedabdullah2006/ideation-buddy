/**
 * Dashboard Layout
 * Protected layout for authenticated users
 */

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import DashboardNav from '@/components/layout/dashboard-nav';

export const metadata: Metadata = {
  title: 'لوحة التحكم - IdeaFlow AI',
  description: 'إدارة مشاريعك',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950" dir="rtl">
      <DashboardNav user={user} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
