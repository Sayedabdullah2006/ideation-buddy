'use client';

/**
 * Step 2: Personas
 * Generate and view user personas using AI
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Sparkles, Loader2, ArrowRight, Target, Heart, Frown } from 'lucide-react';
import { useGeneratePersonas } from '@/hooks/use-ai-generation';
import { PersonaData } from '@/types';

interface StepPersonasProps {
  projectId?: string;
  personas?: PersonaData[];
  onSubmit: () => void;
  onBack?: () => void;
}

export default function StepPersonas({
  projectId,
  personas,
  onSubmit,
  onBack,
}: StepPersonasProps) {
  const generatePersonasMutation = useGeneratePersonas();

  const handleGeneratePersonas = () => {
    if (projectId) {
      generatePersonasMutation.mutate(projectId);
    }
  };

  const hasPersonas = personas && personas.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">الخطوة 2: الشخصيات</h2>
        <p className="text-muted-foreground text-lg">
          توليد شخصيات المستخدمين المحتملين باستخدام الذكاء الاصطناعي
        </p>
      </div>

      <div className="space-y-6">
        {/* AI Persona Generation */}
        <Card className={hasPersonas ? "border-primary/50" : "bg-muted/50 border-dashed"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              توليد الشخصيات بالذكاء الاصطناعي
            </CardTitle>
            <CardDescription>
              سيتم توليد 3 شخصيات مستخدمين تلقائياً بناءً على فكرتك، مع نقاط الألم والأهداف لكل شخصية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <Button
                type="button"
                variant={hasPersonas ? "outline" : "default"}
                size="lg"
                onClick={handleGeneratePersonas}
                disabled={!projectId || generatePersonasMutation.isPending}
              >
                {generatePersonasMutation.isPending ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    جاري التوليد...
                  </>
                ) : (
                  <>
                    <Sparkles className="ml-2 h-5 w-5" />
                    {hasPersonas ? 'إعادة التوليد' : 'توليد الشخصيات'}
                  </>
                )}
              </Button>

              {!hasPersonas && !generatePersonasMutation.isPending && (
                <p className="text-sm text-muted-foreground">
                  اضغط على الزر لتوليد شخصيات المستخدمين بناءً على فكرة مشروعك
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Display Generated Personas */}
        {hasPersonas && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">الشخصيات المولدة ({personas.length})</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {personas.map((persona) => (
                <Card key={persona.id} className="bg-background hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{persona.name}</CardTitle>
                        <CardDescription>
                          {persona.age} سنة - {persona.occupation}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{persona.bio}</p>

                    {/* Pain Points */}
                    <div>
                      <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                        <Frown className="w-4 h-4 text-red-500" />
                        نقاط الألم
                      </h4>
                      <ul className="space-y-1">
                        {persona.painPoints.map((point, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-red-500 mt-0.5">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Goals */}
                    <div>
                      <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-green-500" />
                        الأهداف
                      </h4>
                      <ul className="space-y-1">
                        {persona.goals.map((goal, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Frustrations */}
                    {persona.frustrations && persona.frustrations.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                          <Heart className="w-4 h-4 text-orange-500" />
                          الإحباطات
                        </h4>
                        <ul className="space-y-1">
                          {persona.frustrations.map((frustration, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-orange-500 mt-0.5">•</span>
                              {frustration}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <Users className="w-5 h-5" />
              نصائح لفهم الشخصيات
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <p>• الشخصيات تمثل أنواع المستخدمين المحتملين لمنتجك</p>
            <p>• نقاط الألم تساعدك على فهم المشاكل التي يواجهونها</p>
            <p>• الأهداف توضح ما يريدون تحقيقه</p>
            <p>• استخدم هذه المعلومات لتوجيه تصميم الحل في الخطوات التالية</p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => onBack?.()}
            >
              <ArrowRight className="ml-2 h-5 w-5" />
              السابق
            </Button>
          )}
          <div className={!onBack ? 'mr-auto' : ''}>
            <Button
              type="button"
              size="lg"
              onClick={() => onSubmit()}
              disabled={!hasPersonas}
            >
              حفظ والمتابعة
              <Users className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
