/**
 * Landing Page
 * Public homepage with links to login/register
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Target, Rocket, CheckCircle, ArrowLeft } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900" dir="rtl">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">IdeaFlow AI</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">تسجيل الدخول</Link>
            </Button>
            <Button asChild>
              <Link href="/register">إنشاء حساب</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Rocket className="w-4 h-4" />
            <span>مدعوم بالذكاء الاصطناعي</span>
          </div>
          <h2 className="text-5xl font-bold leading-tight">
            حوّل أفكارك إلى
            <br />
            <span className="text-primary">مواصفات MVP احترافية</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            باستخدام منهجية التفكير التصميمي والذكاء الاصطناعي، نساعدك على تحويل الأفكار
            الخام إلى مواصفات تقنية شاملة لمنتجك الأولي
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/register">
                ابدأ مجاناً
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">تسجيل الدخول</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Design Thinking Steps */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">رحلة التفكير التصميمي</h3>
          <p className="text-lg text-muted-foreground">
            خمس خطوات منظمة لتحويل فكرتك إلى مشروع قابل للتنفيذ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {[
            {
              number: 1,
              title: 'تعاطف',
              titleEn: 'Empathize',
              description: 'فهم المستخدمين ونقاط الألم',
              icon: Target,
            },
            {
              number: 2,
              title: 'حدد',
              titleEn: 'Define',
              description: 'صياغة بيان المشكلة',
              icon: CheckCircle,
            },
            {
              number: 3,
              title: 'ابتكر',
              titleEn: 'Ideate',
              description: 'توليد الحلول الإبداعية',
              icon: Lightbulb,
            },
            {
              number: 4,
              title: 'نموذج',
              titleEn: 'Prototype',
              description: 'نموذج الأعمال والميزات',
              icon: Rocket,
            },
            {
              number: 5,
              title: 'تحقق',
              titleEn: 'Validate',
              description: 'مواصفات MVP الشاملة',
              icon: CheckCircle,
            },
          ].map((step) => (
            <Card key={step.number} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  الخطوة {step.number}
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {step.titleEn}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50 dark:bg-slate-900/50 rounded-3xl my-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">لماذا IdeaFlow AI؟</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                ذكاء سياقي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                الذكاء الاصطناعي يتعلم من كل خطوة لتقديم اقتراحات أكثر دقة
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                منهجية مثبتة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                مبنية على التفكير التصميمي المعتمد من Stanford d.school
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                مواصفات جاهزة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                احصل على مواصفات تقنية شاملة جاهزة للتنفيذ
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-4xl font-bold">جاهز للبدء؟</h3>
          <p className="text-xl text-muted-foreground">
            أنشئ حسابك الآن وابدأ رحلتك في تحويل الأفكار إلى مشاريع ناجحة
          </p>
          <Button size="lg" asChild>
            <Link href="/register">
              إنشاء حساب مجاني
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2026 IdeaFlow AI. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
