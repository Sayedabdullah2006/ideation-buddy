'use client';

/**
 * Step 1: Empathize
 * Capture raw idea - the starting point
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Lightbulb, Users } from 'lucide-react';
import { empathizeSchema, EmpathizeInput } from '@/lib/validations/project.schema';

interface StepEmpathizeProps {
  initialData?: Partial<EmpathizeInput>;
  projectId?: string;
  onSubmit: (data: EmpathizeInput) => void;
  onBack?: () => void;
}

export default function StepEmpathize({
  initialData,
  projectId,
  onSubmit,
  onBack,
}: StepEmpathizeProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmpathizeInput>({
    resolver: zodResolver(empathizeSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Lightbulb className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">الخطوة 1: تعاطف</h2>
        <p className="text-muted-foreground text-lg">
          ابدأ بمشاركة فكرتك الأولية
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Project Title */}
        <Card>
          <CardHeader>
            <CardTitle>عنوان المشروع</CardTitle>
            <CardDescription>
              اسم مختصر وواضح لمشروعك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="title">العنوان *</Label>
              <Input
                id="title"
                placeholder="مثال: تطبيق توصيل الطعام السريع"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Project Description */}
        <Card>
          <CardHeader>
            <CardTitle>وصف مختصر</CardTitle>
            <CardDescription>
              وصف موجز لما يقوم به مشروعك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="description">الوصف *</Label>
              <Textarea
                id="description"
                placeholder="مثال: منصة لربط المطاعم المحلية بالعملاء للتوصيل السريع"
                rows={3}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Raw Idea */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              فكرتك الأولية
            </CardTitle>
            <CardDescription>
              اشرح فكرتك بالتفصيل. من هم المستخدمون المستهدفون؟ ما المشكلة التي تحلها؟
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="rawIdea">الفكرة التفصيلية *</Label>
              <Textarea
                id="rawIdea"
                placeholder="اكتب فكرتك هنا بالتفصيل...&#10;&#10;مثال:&#10;لاحظت أن الكثير من المطاعم الصغيرة لا تملك خدمة توصيل خاصة، والعملاء يجدون صعوبة في الوصول إلى خيارات متنوعة من الطعام المحلي. الفكرة هي إنشاء منصة تربط هذه المطاعم بسائقين مستقلين لتقديم خدمة توصيل سريعة وموثوقة."
                rows={8}
                {...register('rawIdea')}
              />
              {errors.rawIdea && (
                <p className="text-sm text-destructive">{errors.rawIdea.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="text-amber-900 dark:text-amber-100 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              نصائح لكتابة فكرة جيدة
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
            <p>• وضح المشكلة التي تحاول حلها</p>
            <p>• اذكر من هم المستخدمون المستهدفون</p>
            <p>• اشرح كيف سيستفيد المستخدمون من حلك</p>
            <p>• لا تقلق من الكمال - ستتحسن الفكرة في الخطوات التالية</p>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={!isValid}>
            حفظ والمتابعة
            <Lightbulb className="mr-2 h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
