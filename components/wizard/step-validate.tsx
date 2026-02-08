'use client';

/**
 * Step 6: Validate
 * AI Idea Validation + Generate comprehensive MVP specification
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2, Sparkles, Download, FileText, Code, Layout, Loader2, Clock, DollarSign,
  ShieldCheck, AlertTriangle, XCircle, Target, Users, TrendingUp, Lightbulb, ArrowRight,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { validateSchema, ValidateInput } from '@/lib/validations/project.schema';
import { useGenerateMVPSpec, useValidateIdea } from '@/hooks/use-ai-generation';
import { MVPSpecification, IdeaValidationResult } from '@/types';
import { cn } from '@/lib/utils/cn';

interface StepValidateProps {
  initialData?: Partial<ValidateInput>;
  projectId?: string;
  projectTitle?: string;
  mvpSpec?: MVPSpecification;
  onSubmit: (data: ValidateInput) => void;
  onBack?: () => void;
}

export default function StepValidate({
  initialData,
  projectId,
  projectTitle = 'مشروع',
  mvpSpec,
  onSubmit,
  onBack,
}: StepValidateProps) {
  const [validationResult, setValidationResult] = useState<IdeaValidationResult | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    userReactions: true,
    problemFit: true,
    market: false,
    technical: false,
    business: false,
    improvements: true,
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = useForm<ValidateInput>({
    resolver: zodResolver(validateSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const generateMVPSpecMutation = useGenerateMVPSpec();
  const validateIdeaMutation = useValidateIdea();

  const handleValidateIdea = async () => {
    if (projectId) {
      const result = await validateIdeaMutation.mutateAsync(projectId);
      setValidationResult(result);
    }
  };

  const handleGenerateMVPSpec = () => {
    if (projectId) {
      generateMVPSpecMutation.mutate(projectId);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getReadinessColor = (level: string) => {
    switch (level) {
      case 'ready': return 'text-green-600 bg-green-100';
      case 'promising': return 'text-blue-600 bg-blue-100';
      case 'needs_work': return 'text-yellow-600 bg-yellow-100';
      case 'not_ready': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getReadinessLabel = (level: string) => {
    switch (level) {
      case 'ready': return 'جاهز للتنفيذ';
      case 'promising': return 'واعد';
      case 'needs_work': return 'يحتاج تحسين';
      case 'not_ready': return 'غير جاهز';
      default: return level;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleExportMarkdown = () => {
    if (!mvpSpec) return;

    const markdown = `# ${projectTitle} - MVP Specification

## Project Type
${mvpSpec.projectType}

## Overview
${mvpSpec.overview}

## User Flow
${mvpSpec.userFlow?.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## Tech Stack Recommendation

### Frontend
${mvpSpec.techStackRecommendation?.frontend?.map(t => `- ${t}`).join('\n')}

### Backend
${mvpSpec.techStackRecommendation?.backend?.map(t => `- ${t}`).join('\n')}

### Database
${mvpSpec.techStackRecommendation?.database}

### Deployment
${mvpSpec.techStackRecommendation?.deployment?.map(t => `- ${t}`).join('\n')}

## Wireframes
${mvpSpec.wireframes}

## Timeline
${mvpSpec.timeline}

## Estimated Cost
${mvpSpec.estimatedCost}

---
*تم التوليد بواسطة IdeaFlow AI*
`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle}-MVP-Spec.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    if (!mvpSpec) return;

    const json = JSON.stringify(mvpSpec, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle}-MVP-Spec.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">الخطوة 6: تحقق</h2>
        <p className="text-muted-foreground text-lg">
          التحقق من صحة الفكرة ومواصفات MVP
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Idea Validation Section */}
        <Card className={validationResult ? "border-primary/50" : "bg-muted/50 border-dashed"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              التحقق من صحة الفكرة
            </CardTitle>
            <CardDescription>
              تحليل شامل للفكرة من خلال محاكاة ردود فعل المستخدمين وتقييم جدوى السوق
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!validationResult ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">تحليل الفكرة بالذكاء الاصطناعي</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
                    سيتم تحليل فكرتك بشكل شامل من خلال:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-right">
                  <div className="p-4 bg-background rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      محاكاة ردود المستخدمين
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      ردود فعل واقعية من الشخصيات المستهدفة
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-green-500" />
                      تحليل المشكلة والحل
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      تقييم مدى توافق الحل مع المشكلة
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      جدوى السوق
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      تحليل المنافسين والفرص والمخاطر
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      توصيات التحسين
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      اقتراحات محددة لتحسين الفكرة
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  size="lg"
                  onClick={handleValidateIdea}
                  disabled={!projectId || validateIdeaMutation.isPending}
                >
                  {validateIdeaMutation.isPending ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جاري التحليل...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="ml-2 h-5 w-5" />
                      تحليل الفكرة
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overall Score & Readiness */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">
                          {validationResult.overallScore}
                          <span className="text-lg text-muted-foreground">/100</span>
                        </div>
                        <p className="text-sm text-muted-foreground">النتيجة الإجمالية</p>
                        <Progress value={validationResult.overallScore} className="mt-3" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-3">
                        <div className={cn(
                          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold",
                          getReadinessColor(validationResult.readinessLevel)
                        )}>
                          {validationResult.readinessLevel === 'ready' && <CheckCircle2 className="w-5 h-5" />}
                          {validationResult.readinessLevel === 'promising' && <TrendingUp className="w-5 h-5" />}
                          {validationResult.readinessLevel === 'needs_work' && <AlertTriangle className="w-5 h-5" />}
                          {validationResult.readinessLevel === 'not_ready' && <XCircle className="w-5 h-5" />}
                          {getReadinessLabel(validationResult.readinessLevel)}
                        </div>
                        <p className="text-sm text-muted-foreground">مستوى الجاهزية</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Executive Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>الملخص التنفيذي</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                      {validationResult.executiveSummary}
                    </p>
                  </CardContent>
                </Card>

                {/* User Reactions */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('userReactions')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        ردود فعل المستخدمين
                      </span>
                      {expandedSections.userReactions ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.userReactions && (
                    <CardContent className="space-y-4">
                      {validationResult.userReactions.map((reaction, index) => (
                        <Card key={index} className="bg-muted/50">
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-semibold">{reaction.persona}</h4>
                              <span className={cn(
                                "text-xs px-2 py-1 rounded",
                                reaction.wouldUse ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              )}>
                                {reaction.wouldUse ? "سيستخدم" : "لن يستخدم"}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{reaction.initialReaction}</p>
                            {reaction.concerns.length > 0 && (
                              <div className="mb-3">
                                <span className="text-xs font-medium">المخاوف:</span>
                                <ul className="mt-1 space-y-1">
                                  {reaction.concerns.map((concern, i) => (
                                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                      <AlertTriangle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                      {concern}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <p className="text-xs">
                              <span className="font-medium">الاستعداد للدفع: </span>
                              <span className="text-muted-foreground">{reaction.willingnessToPay}</span>
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </CardContent>
                  )}
                </Card>

                {/* Problem-Solution Fit */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('problemFit')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-500" />
                        توافق المشكلة والحل
                        <span className={cn("text-lg font-bold", getScoreColor(validationResult.problemSolutionFit.score))}>
                          {validationResult.problemSolutionFit.score}/10
                        </span>
                      </span>
                      {expandedSections.problemFit ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.problemFit && (
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{validationResult.problemSolutionFit.analysis}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold text-green-600 mb-2">نقاط القوة</h4>
                          <ul className="space-y-1">
                            {validationResult.problemSolutionFit.strengths.map((s, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-red-600 mb-2">الفجوات</h4>
                          <ul className="space-y-1">
                            {validationResult.problemSolutionFit.gaps.map((g, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <XCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                                {g}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Market Viability */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('market')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-500" />
                        جدوى السوق
                        <span className={cn("text-lg font-bold", getScoreColor(validationResult.marketViability.score))}>
                          {validationResult.marketViability.score}/10
                        </span>
                      </span>
                      {expandedSections.market ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.market && (
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{validationResult.marketViability.analysis}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">المنافسون</h4>
                          <ul className="space-y-1">
                            {validationResult.marketViability.competitors.map((c, i) => (
                              <li key={i} className="text-xs text-muted-foreground">• {c}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-green-600 mb-2">المميزات</h4>
                          <ul className="space-y-1">
                            {validationResult.marketViability.differentiators.map((d, i) => (
                              <li key={i} className="text-xs text-muted-foreground">• {d}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-red-600 mb-2">المخاطر</h4>
                          <ul className="space-y-1">
                            {validationResult.marketViability.risks.map((r, i) => (
                              <li key={i} className="text-xs text-muted-foreground">• {r}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Critical Questions */}
                <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                      <AlertTriangle className="w-5 h-5" />
                      أسئلة حرجة يجب الإجابة عليها
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {validationResult.criticalQuestions.map((q, i) => (
                        <li key={i} className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start gap-2">
                          <span className="font-bold">{i + 1}.</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Improvement Suggestions */}
                <Card>
                  <CardHeader
                    className="cursor-pointer"
                    onClick={() => toggleSection('improvements')}
                  >
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        توصيات التحسين
                      </span>
                      {expandedSections.improvements ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  {expandedSections.improvements && (
                    <CardContent className="space-y-3">
                      {validationResult.improvementSuggestions.map((suggestion, i) => (
                        <Card key={i} className={cn("border", getPriorityColor(suggestion.priority))}>
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-sm">{suggestion.area}</h4>
                              <span className={cn(
                                "text-xs px-2 py-1 rounded",
                                getPriorityColor(suggestion.priority)
                              )}>
                                {suggestion.priority === 'high' ? 'أولوية عالية' : suggestion.priority === 'medium' ? 'أولوية متوسطة' : 'أولوية منخفضة'}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{suggestion.suggestion}</p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">الأثر: </span>{suggestion.impact}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </CardContent>
                  )}
                </Card>

                {/* Final Verdict */}
                <Card className={cn(
                  "border-2",
                  validationResult.finalVerdict.proceed
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : "border-red-500 bg-red-50 dark:bg-red-950/20"
                )}>
                  <CardHeader>
                    <CardTitle className={cn(
                      "flex items-center gap-2",
                      validationResult.finalVerdict.proceed ? "text-green-700" : "text-red-700"
                    )}>
                      {validationResult.finalVerdict.proceed ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <XCircle className="w-6 h-6" />
                      )}
                      الحكم النهائي
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "text-2xl font-bold",
                        validationResult.finalVerdict.proceed ? "text-green-600" : "text-red-600"
                      )}>
                        {validationResult.finalVerdict.proceed ? "المضي قدماً" : "إعادة النظر"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        نسبة الثقة: {validationResult.finalVerdict.confidence}%
                      </div>
                    </div>
                    <p className="text-sm">{validationResult.finalVerdict.reasoning}</p>
                    {validationResult.finalVerdict.conditions.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">الشروط المطلوبة:</h4>
                        <ul className="space-y-1">
                          {validationResult.finalVerdict.conditions.map((c, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Regenerate Option */}
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleValidateIdea}
                    disabled={validateIdeaMutation.isPending}
                  >
                    <Sparkles className="ml-2 h-4 w-4" />
                    إعادة التحليل
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* MVP Specification Generation */}
        <Card className={mvpSpec ? "border-primary/50" : "bg-muted/50 border-dashed"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              مواصفات MVP التقنية
            </CardTitle>
            <CardDescription>
              مواصفات تقنية شاملة للمنتج الأولي
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!mvpSpec ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">توليد مواصفات MVP الشاملة</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
                    سيتم توليد مواصفات تقنية شاملة تتضمن:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-right">
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">✓ تدفق المستخدم</h4>
                    <p className="text-xs text-muted-foreground">
                      خطوات التنقل التفصيلية
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">✓ التقنيات الموصى بها</h4>
                    <p className="text-xs text-muted-foreground">
                      Frontend, Backend, Database
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">✓ وصف الواجهات</h4>
                    <p className="text-xs text-muted-foreground">
                      Wireframes بصيغة Markdown
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">✓ الجدول الزمني والتكلفة</h4>
                    <p className="text-xs text-muted-foreground">
                      تقدير المدة والتكلفة
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  size="lg"
                  onClick={handleGenerateMVPSpec}
                  disabled={!projectId || generateMVPSpecMutation.isPending}
                >
                  {generateMVPSpecMutation.isPending ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جاري التوليد...
                    </>
                  ) : (
                    <>
                      <Sparkles className="ml-2 h-5 w-5" />
                      توليد المواصفات الكاملة
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {/* Project Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        نظرة عامة على المشروع
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">نوع المشروع</h4>
                        <p className="text-sm text-muted-foreground">
                          {mvpSpec.projectType}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">الوصف</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {mvpSpec.overview}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* User Flow */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Layout className="w-5 h-5" />
                        تدفق المستخدم
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3">
                        {mvpSpec.userFlow?.map((step: string, index: number) => (
                          <li key={index} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">
                              {index + 1}
                            </span>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>

                  {/* Tech Stack */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        التقنيات الموصى بها
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Frontend</h4>
                          <ul className="space-y-1">
                            {mvpSpec.techStackRecommendation?.frontend?.map(
                              (tech: string, index: number) => (
                                <li key={index} className="text-sm text-muted-foreground">
                                  • {tech}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Backend</h4>
                          <ul className="space-y-1">
                            {mvpSpec.techStackRecommendation?.backend?.map(
                              (tech: string, index: number) => (
                                <li key={index} className="text-sm text-muted-foreground">
                                  • {tech}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Database</h4>
                          <p className="text-sm text-muted-foreground">
                            {mvpSpec.techStackRecommendation?.database}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Deployment</h4>
                          <ul className="space-y-1">
                            {mvpSpec.techStackRecommendation?.deployment?.map(
                              (tech: string, index: number) => (
                                <li key={index} className="text-sm text-muted-foreground">
                                  • {tech}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wireframes */}
                  {mvpSpec.wireframes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Layout className="w-5 h-5" />
                          وصف الواجهات
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                          {mvpSpec.wireframes}
                        </pre>
                      </CardContent>
                    </Card>
                  )}

                  {/* Timeline & Cost */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mvpSpec.timeline && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Clock className="w-5 h-5" />
                            الجدول الزمني
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                            {mvpSpec.timeline}
                          </pre>
                        </CardContent>
                      </Card>
                    )}

                    {mvpSpec.estimatedCost && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <DollarSign className="w-5 h-5" />
                            التكلفة المقدرة
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                            {mvpSpec.estimatedCost}
                          </pre>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Export Options */}
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="text-green-900 dark:text-green-100 flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        تصدير المواصفات
                      </CardTitle>
                      <CardDescription className="text-green-800 dark:text-green-200">
                        قم بتصدير المواصفات الكاملة كملف Markdown أو JSON
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleExportMarkdown}
                        className="flex-1"
                      >
                        <FileText className="ml-2 h-4 w-4" />
                        تصدير Markdown
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleExportJSON}
                        className="flex-1"
                      >
                        <Code className="ml-2 h-4 w-4" />
                        تصدير JSON
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Regenerate Option */}
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateMVPSpec}
                      disabled={generateMVPSpecMutation.isPending}
                    >
                      <Sparkles className="ml-2 h-4 w-4" />
                      إعادة التوليد
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Ready for Next Step */}
        {(validationResult || mvpSpec) && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                <h3 className="font-semibold">جاهز للخطوة التالية</h3>
                <p className="text-sm text-muted-foreground">
                  انتقل لتصميم شاشات المنتج الأولي
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit */}
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
            <Button type="submit" size="lg" disabled={!isValid}>
              المتابعة للشاشات
              <Layout className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
