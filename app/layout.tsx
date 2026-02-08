/**
 * Root Layout
 * Provides authentication session and theme providers
 */

import type { Metadata } from 'next';
import { Cairo, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'IdeaFlow AI - مولد مواصفات MVP',
  description: 'تحويل الأفكار إلى مواصفات MVP باستخدام التفكير التصميمي والذكاء الاصطناعي',
  keywords: ['Design Thinking', 'MVP', 'AI', 'Gemini', 'Product Development'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cairo.variable} font-arabic antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
