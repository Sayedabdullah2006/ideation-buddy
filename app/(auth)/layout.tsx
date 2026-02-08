/**
 * Authentication Layout
 * RTL layout for login and register pages
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تسجيل الدخول - IdeaFlow AI',
  description: 'Design Thinking MVP Generator',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900" dir="rtl">
      <div className="w-full max-w-md p-6">
        {children}
      </div>
    </div>
  );
}
