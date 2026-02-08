'use client';

/**
 * Step 2: Define
 * Refine problem statement and select persona
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Target, Users, Sparkles, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { defineSchema, DefineInput } from '@/lib/validations/project.schema';
import { useRefineProblem } from '@/hooks/use-ai-generation';
import { useState } from 'react';

interface StepDefineProps {
  initialData?: Partial<DefineInput>;
  projectId?: string;
  personas?: any[];
  problemStatementRefined?: any;
  onSubmit: (data: DefineInput) => void;
  onBack?: () => void;
}

export default function StepDefine({
  initialData,
  projectId,
  personas = [],
  problemStatementRefined,
  onSubmit,
  onBack,
}: StepDefineProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<DefineInput>({
    resolver: zodResolver(defineSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const [selectedRefinement, setSelectedRefinement] = useState<string | null>(null);
  const [selectedPersonaIndex, setSelectedPersonaIndex] = useState<number | null>(
    initialData?.selectedPersona ? personas?.findIndex(p => p.id === initialData.selectedPersona?.id) ?? null : null
  );
  const refineProblemMutation = useRefineProblem();
  const problemStatement = watch('problemStatement');

  const handlePersonaSelect = (index: number) => {
    setSelectedPersonaIndex(index);
  };

  const handleFormSubmit = (data: DefineInput) => {
    const selectedPersona = selectedPersonaIndex !== null ? personas[selectedPersonaIndex] : null;
    onSubmit({
      ...data,
      selectedPersona,
    });
  };

  const handleRefineProblem = () => {
    if (projectId && problemStatement) {
      refineProblemMutation.mutate({ projectId, problemStatement });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Target className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">الخطوة 2: حدد</h2>
        <p className="text-muted-foreground text-lg">
          صياغة بيان المشكلة بوضوح
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Personas Section (AI Generated in Phase 4) */}
        {personas && personas.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                شخصيات المستخدمين
              </CardTitle>
              <CardDescription>
                اختر الشخصية التي تريد التركيز عليها
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {personas.map((persona, index) => (
                <Card
                  key={persona.id || index}
                  className={`cursor-pointer transition-all ${
                    selectedPersonaIndex === index
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handlePersonaSelect(index)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      {selectedPersonaIndex === index && (
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold">{persona.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {persona.age} سنة - {persona.occupation}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {persona.bio}
                        </p>
                        {persona.painPoints && persona.painPoints.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs font-medium text-destructive">نقاط الألم:</p>
                            <ul className="text-xs text-muted-foreground mt-1 list-disc list-inside">
                              {persona.painPoints.slice(0, 2).map((point: string, i: number) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">شخصيات المستخدمين</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    في المرحلة 4، ستظهر هنا 3 شخصيات مستخدمين تم توليدها بالذكاء الاصطناعي
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Problem Statement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              بيان المشكلة
            </CardTitle>
            <CardDescription>
              صف المشكلة التي يواجهها المستخدمون بوضوح
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="problemStatement">بيان المشكلة *</Label>
              <Textarea
                id="problemStatement"
                placeholder="مثال: أصحاب المطاعم الصغيرة يواجهون صعوبة في الوصول إلى قاعدة عملاء أوسع بسبب عدم وجود خدمة توصيل موثوقة ومنخفضة التكلفة، مما يحد من نموهم ويقلل إيراداتهم."
                rows={6}
                {...register('problemStatement')}
              />
              {errors.problemStatement && (
                <p className="text-sm text-destructive">
                  {errors.problemStatement.message}
                </p>
              )}

              {/* Tips */}
              <div className="flex gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg mt-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900 dark:text-blue-100">
                  <p className="font-medium mb-1">نصائح لبيان مشكلة جيد:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-200">
                    <li>ركز على المستخدم وليس الحل</li>
                    <li>كن محددًا وقابلاً للقياس</li>
                    <li>اشرح تأثير المشكلة</li>
                    <li>استخدم لغة واضحة ومباشرة</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Problem Refinement */}
        <Card className={problemStatementRefined ? "border-primary/50" : "bg-muted/50 border-dashed"}>
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">تحسين بيان المشكلة بالذكاء الاصطناعي</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  سيتم تحسين وصياغة بيان المشكلة بشكل أفضل باستخدام إطار "كيف يمكننا"
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleRefineProblem}
                disabled={!projectId || !problemStatement || problemStatement.length < 20 || refineProblemMutation.isPending}
              >
                {refineProblemMutation.isPending ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري التحسين...
                  </>
                ) : (
                  <>
                    <Sparkles className="ml-2 h-4 w-4" />
                    {problemStatementRefined ? 'إعادة التحسين' : 'تحسين البيان'}
                  </>
                )}
              </Button>
            </div>

            {/* Display Refined Statements */}
            {problemStatementRefined?.refinedStatements && (
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold text-center">البدائل المحسنة (How Might We):</h4>
                <div className="space-y-3">
                  {problemStatementRefined.refinedStatements.map((item: any) => (
                    <Card
                      key={item.id}
                      className={`cursor-pointer transition-all ${
                        selectedRefinement === item.id
                          ? 'border-primary bg-primary/5'
                          : item.id === problemStatementRefined.recommended
                          ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                          : 'bg-background hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedRefinement(item.id)}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          {item.id === problemStatementRefined.recommended && (
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-sm mb-2">{item.statement}</p>
                            <p className="text-xs text-muted-foreground">{item.reasoning}</p>
                            {item.id === problemStatementRefined.recommended && (
                              <span className="inline-block mt-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                                موصى به
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {problemStatementRefined.insights && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">رؤى إضافية:</h5>
                    <p className="text-sm text-muted-foreground">{problemStatementRefined.insights}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={!isValid}>
            حفظ والمتابعة
            <Target className="mr-2 h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
