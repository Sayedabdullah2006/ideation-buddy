/**
 * Design Thinking Wizard
 * Step-by-step project creation flow
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function WizardPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
          <Lightbulb className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold">معالج التفكير التصميمي</h1>
        <p className="text-muted-foreground text-lg">
          رحلة منظمة لتحويل فكرتك إلى مواصفات MVP احترافية
        </p>
      </div>

      {/* Coming Soon Card */}
      <Card className="p-12">
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-3">قريباً</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              المعالج التفاعلي لخطوات التفكير التصميمي الخمس سيكون متاحاً في
              <strong className="text-primary"> Phase 3: Design Thinking Wizard</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-3xl mx-auto pt-6">
            {[
              { step: 1, name: 'تعاطف', nameEn: 'Empathize' },
              { step: 2, name: 'حدد', nameEn: 'Define' },
              { step: 3, name: 'ابتكر', nameEn: 'Ideate' },
              { step: 4, name: 'نموذج', nameEn: 'Prototype' },
              { step: 5, name: 'تحقق', nameEn: 'Validate' },
            ].map((item) => (
              <div
                key={item.step}
                className="p-4 bg-muted/50 rounded-lg text-center"
              >
                <div className="text-2xl font-bold text-primary mb-2">
                  {item.step}
                </div>
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-xs text-muted-foreground">
                  {item.nameEn}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">
                العودة إلى المشاريع
                <ArrowRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>

      {/* Features Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ما سيتضمنه المعالج</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>✓ توليد 3 شخصيات مستخدمين بالذكاء الاصطناعي</p>
            <p>✓ تحديد بيان المشكلة</p>
            <p>✓ توليد 5-10 حلول مع تقييم AI</p>
            <p>✓ نموذج الأعمال التجارية</p>
            <p>✓ مواصفات MVP شاملة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الميزات الذكية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>✓ ذكاء سياقي متراكم</p>
            <p>✓ حفظ تلقائي للتقدم</p>
            <p>✓ تصدير بصيغة Markdown/JSON</p>
            <p>✓ تقييم الجدوى والأثر</p>
            <p>✓ توصيات التقنيات</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
