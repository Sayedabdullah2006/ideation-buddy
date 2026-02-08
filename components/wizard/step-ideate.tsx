'use client';

/**
 * Step 3: Ideate
 * Generate and evaluate solutions
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Sparkles, TrendingUp, CheckCircle2, Loader2, Star, ArrowRight } from 'lucide-react';
import { useGenerateSolutions } from '@/hooks/use-ai-generation';
import { useState } from 'react';
import { SolutionData } from '@/types';

interface StepIdeateProps {
  initialData?: any;
  projectId?: string;
  solutions?: SolutionData[];
  onSubmit: (data: any) => void;
  onBack?: () => void;
}

export default function StepIdeate({
  initialData,
  projectId,
  solutions = [],
  onSubmit,
  onBack,
}: StepIdeateProps) {
  const [selectedSolution, setSelectedSolution] = useState<string | null>(
    initialData?.selectedSolution?.id || null
  );
  const generateSolutionsMutation = useGenerateSolutions();

  const handleGenerateSolutions = () => {
    if (projectId) {
      generateSolutionsMutation.mutate(projectId);
    }
  };

  const handleSubmit = () => {
    const selected = solutions.find((s) => s.id === selectedSolution) || null;
    onSubmit({
      solutions,
      selectedSolution: selected,
    });
  };

  const hasSolutions = solutions && solutions.length > 0;
  const canSubmit = hasSolutions && selectedSolution;

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getScoreWidth = (score: number) => `${(score / 10) * 100}%`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Lightbulb className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">الخطوة 3: ابتكر</h2>
        <p className="text-muted-foreground text-lg">
          توليد وتقييم الحلول الممكنة
        </p>
      </div>

      <div className="space-y-6">
        {/* AI Solution Generation */}
        <Card className={hasSolutions ? "border-primary/50" : "bg-muted/50 border-dashed"}>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">توليد الحلول بالذكاء الاصطناعي</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  سيتم توليد 5-7 حلول مبتكرة مع تقييم الأثر والجدوى
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateSolutions}
                disabled={!projectId || generateSolutionsMutation.isPending}
              >
                {generateSolutionsMutation.isPending ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري التوليد...
                  </>
                ) : (
                  <>
                    <Sparkles className="ml-2 h-4 w-4" />
                    {hasSolutions ? 'إعادة التوليد' : 'توليد الحلول'}
                  </>
                )}
              </Button>
            </div>

            {/* Display Generated Solutions */}
            {hasSolutions && (
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold text-center">الحلول المقترحة (اختر حلاً للمتابعة):</h4>
                <div className="space-y-3">
                  {solutions.map((solution) => {
                    const totalScore = solution.impactScore + solution.feasibilityScore;
                    const isSelected = selectedSolution === solution.id;
                    return (
                      <Card
                        key={solution.id}
                        className={`cursor-pointer transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                            : 'bg-background hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedSolution(solution.id)}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-2 mb-2">
                                {totalScore >= 16 && (
                                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                                )}
                                <h4 className="font-semibold text-lg">{solution.title}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-4">
                                {solution.description}
                              </p>

                              {/* AI Scores with Progress Bars */}
                              <div className="space-y-3">
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <TrendingUp className="w-4 h-4 text-green-600" />
                                      <span className="text-sm">الأثر</span>
                                    </div>
                                    <span className={`text-sm font-semibold ${getScoreColor(solution.impactScore)}`}>
                                      {solution.impactScore}/10
                                    </span>
                                  </div>
                                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-green-600 transition-all"
                                      style={{ width: getScoreWidth(solution.impactScore) }}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                      <span className="text-sm">الجدوى</span>
                                    </div>
                                    <span className={`text-sm font-semibold ${getScoreColor(solution.feasibilityScore)}`}>
                                      {solution.feasibilityScore}/10
                                    </span>
                                  </div>
                                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-blue-600 transition-all"
                                      style={{ width: getScoreWidth(solution.feasibilityScore) }}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* AI Reasoning */}
                              {solution.aiReasoning && (
                                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                                  <p className="text-xs text-muted-foreground">{solution.aiReasoning}</p>
                                </div>
                              )}
                            </div>

                            {/* Select Indicator */}
                            {isSelected && (
                              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Brainstorming Tips */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              نصائح للابتكار
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <p>• فكر في حلول غير تقليدية</p>
            <p>• ركز على قيمة المستخدم</p>
            <p>• لا تستبعد أي فكرة في البداية</p>
            <p>• ضع في اعتبارك الموارد المتاحة</p>
            <p>• فكر في الحلول قصيرة وطويلة المدى</p>
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
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              حفظ والمتابعة
              <Lightbulb className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
