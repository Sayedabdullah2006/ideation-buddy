'use client';

/**
 * Step 4: Prototype
 * Business Model Canvas and MVP Features
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Rocket, Sparkles, Package, Star, Loader2, TrendingUp, Users, DollarSign, Edit2, Save, X, ArrowRight } from 'lucide-react';
import { prototypeSchema, PrototypeInput } from '@/lib/validations/project.schema';
import { useGenerateBusinessModel } from '@/hooks/use-ai-generation';
import { AIProgress } from '@/components/ui/ai-progress';
import { BusinessModelCanvas, MVPFeatures } from '@/types';
import { useUpdateProject } from '@/hooks/use-projects';

interface StepPrototypeProps {
  initialData?: Partial<PrototypeInput>;
  projectId?: string;
  businessModel?: BusinessModelCanvas;
  mvpFeatures?: MVPFeatures;
  onSubmit: (data: PrototypeInput) => void;
  onBack?: () => void;
}

export default function StepPrototype({
  initialData,
  projectId,
  businessModel,
  mvpFeatures,
  onSubmit,
  onBack,
}: StepPrototypeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBusinessModel, setEditedBusinessModel] = useState<BusinessModelCanvas | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const {
    handleSubmit,
    formState: { isValid },
  } = useForm<PrototypeInput>({
    resolver: zodResolver(prototypeSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const generateBusinessModelMutation = useGenerateBusinessModel();
  const updateProjectMutation = useUpdateProject(projectId || '');

  // Initialize edited business model when businessModel changes
  useEffect(() => {
    if (businessModel) {
      setEditedBusinessModel({ ...businessModel });
    }
  }, [businessModel]);

  // Handler for editing a specific field
  const handleFieldChange = (field: keyof BusinessModelCanvas, value: string) => {
    if (!editedBusinessModel) return;

    // Convert textarea value (newline-separated) to array
    const items = value.split('\n').filter(item => item.trim() !== '');
    setEditedBusinessModel({
      ...editedBusinessModel,
      [field]: items,
    });
  };

  // Get field value as string for textarea
  const getFieldValue = (field: keyof BusinessModelCanvas): string => {
    if (!editedBusinessModel) return '';
    const items = editedBusinessModel[field];
    return Array.isArray(items) ? items.join('\n') : '';
  };

  // Save edited business model
  const handleSaveEdit = async () => {
    if (!projectId || !editedBusinessModel) return;

    setIsSavingEdit(true);
    try {
      await updateProjectMutation.mutateAsync({
        businessModel: editedBusinessModel,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving business model:', error);
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    if (businessModel) {
      setEditedBusinessModel({ ...businessModel });
    }
    setIsEditing(false);
  };

  // Handle back with save
  const handleBack = async () => {
    if (projectId && editedBusinessModel && isEditing) {
      // Save current edits before going back
      await updateProjectMutation.mutateAsync({
        businessModel: editedBusinessModel,
      });
    }
    onBack?.();
  };

  const handleGenerateBusinessModel = () => {
    if (projectId) {
      generateBusinessModelMutation.mutate(projectId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Rocket className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">الخطوة 4: نموذج</h2>
        <p className="text-muted-foreground text-lg">
          نموذج الأعمال وميزات MVP
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Business Model Canvas Generation */}
        <Card className={businessModel ? "border-primary/50" : "bg-muted/50 border-dashed"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              نموذج الأعمال التجارية (Business Model Canvas)
            </CardTitle>
            <CardDescription>
              البنية الأساسية لنموذج عملك - 9 عناصر أساسية
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!businessModel ? (
              <div className="text-center py-8 space-y-3">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    سيتم توليد نموذج الأعمال التجارية الكامل مع ميزات MVP
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGenerateBusinessModel}
                  disabled={!projectId || generateBusinessModelMutation.isPending}
                >
                  {generateBusinessModelMutation.isPending ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري التوليد...
                    </>
                  ) : (
                    <>
                      <Sparkles className="ml-2 h-4 w-4" />
                      توليد نموذج الأعمال
                    </>
                  )}
                </Button>

                <AIProgress
                  isActive={generateBusinessModelMutation.isPending}
                  estimatedDuration={25}
                  label="جاري توليد نموذج الأعمال"
                  steps={[
                    'تحليل الحل المختار...',
                    'بناء نموذج الأعمال التجارية...',
                    'تحديد شرائح العملاء والقنوات...',
                    'تحديد ميزات MVP...',
                    'مراجعة النتائج...',
                  ]}
                />
              </div>
            ) : (
              <>
                {/* Business Model Canvas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Key Partners */}
                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        الشركاء الرئيسيون
                      </h4>
                      {isEditing ? (
                        <Textarea
                          value={getFieldValue('keyPartners')}
                          onChange={(e) => handleFieldChange('keyPartners', e.target.value)}
                          placeholder="أدخل كل شريك في سطر منفصل"
                          className="min-h-[80px] text-xs"
                          dir="rtl"
                        />
                      ) : (
                        <ul className="space-y-1">
                          {businessModel.keyPartners.map((item, i) => (
                            <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>

                  {/* Key Activities */}
                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-sm mb-2">الأنشطة الرئيسية</h4>
                      {isEditing ? (
                        <Textarea
                          value={getFieldValue('keyActivities')}
                          onChange={(e) => handleFieldChange('keyActivities', e.target.value)}
                          placeholder="أدخل كل نشاط في سطر منفصل"
                          className="min-h-[80px] text-xs"
                          dir="rtl"
                        />
                      ) : (
                        <ul className="space-y-1">
                          {businessModel.keyActivities.map((item, i) => (
                            <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>

                  {/* Key Resources */}
                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-sm mb-2">الموارد الرئيسية</h4>
                      {isEditing ? (
                        <Textarea
                          value={getFieldValue('keyResources')}
                          onChange={(e) => handleFieldChange('keyResources', e.target.value)}
                          placeholder="أدخل كل مورد في سطر منفصل"
                          className="min-h-[80px] text-xs"
                          dir="rtl"
                        />
                      ) : (
                        <ul className="space-y-1">
                          {businessModel.keyResources.map((item, i) => (
                            <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>

                  {/* Value Propositions */}
                  <Card className="md:col-span-2 bg-primary/5 border-primary/20">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        القيمة المقدمة
                      </h4>
                      {isEditing ? (
                        <Textarea
                          value={getFieldValue('valuePropositions')}
                          onChange={(e) => handleFieldChange('valuePropositions', e.target.value)}
                          placeholder="أدخل كل قيمة في سطر منفصل"
                          className="min-h-[80px] text-xs"
                          dir="rtl"
                        />
                      ) : (
                        <ul className="space-y-1">
                          {businessModel.valuePropositions.map((item, i) => (
                            <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>

                  {/* Customer Relationships */}
                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-sm mb-2">علاقات العملاء</h4>
                      {isEditing ? (
                        <Textarea
                          value={getFieldValue('customerRelationships')}
                          onChange={(e) => handleFieldChange('customerRelationships', e.target.value)}
                          placeholder="أدخل كل علاقة في سطر منفصل"
                          className="min-h-[80px] text-xs"
                          dir="rtl"
                        />
                      ) : (
                        <ul className="space-y-1">
                          {businessModel.customerRelationships.map((item, i) => (
                            <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>

                  {/* Channels */}
                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-sm mb-2">القنوات</h4>
                      {isEditing ? (
                        <Textarea
                          value={getFieldValue('channels')}
                          onChange={(e) => handleFieldChange('channels', e.target.value)}
                          placeholder="أدخل كل قناة في سطر منفصل"
                          className="min-h-[80px] text-xs"
                          dir="rtl"
                        />
                      ) : (
                        <ul className="space-y-1">
                          {businessModel.channels.map((item, i) => (
                            <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>

                  {/* Customer Segments */}
                  <Card>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        شرائح العملاء
                      </h4>
                      {isEditing ? (
                        <Textarea
                          value={getFieldValue('customerSegments')}
                          onChange={(e) => handleFieldChange('customerSegments', e.target.value)}
                          placeholder="أدخل كل شريحة في سطر منفصل"
                          className="min-h-[80px] text-xs"
                          dir="rtl"
                        />
                      ) : (
                        <ul className="space-y-1">
                          {businessModel.customerSegments.map((item, i) => (
                            <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>

                  {/* Cost Structure */}
                  <Card className="md:col-span-2 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-red-600" />
                        هيكل التكاليف
                      </h4>
                      {isEditing ? (
                        <Textarea
                          value={getFieldValue('costStructure')}
                          onChange={(e) => handleFieldChange('costStructure', e.target.value)}
                          placeholder="أدخل كل تكلفة في سطر منفصل"
                          className="min-h-[80px] text-xs"
                          dir="rtl"
                        />
                      ) : (
                        <ul className="space-y-1">
                          {businessModel.costStructure.map((item, i) => (
                            <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>

                  {/* Revenue Streams */}
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        مصادر الإيرادات
                      </h4>
                      {isEditing ? (
                        <Textarea
                          value={getFieldValue('revenueStreams')}
                          onChange={(e) => handleFieldChange('revenueStreams', e.target.value)}
                          placeholder="أدخل كل مصدر إيراد في سطر منفصل"
                          className="min-h-[80px] text-xs"
                          dir="rtl"
                        />
                      ) : (
                        <ul className="space-y-1">
                          {businessModel.revenueStreams.map((item, i) => (
                            <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        onClick={handleSaveEdit}
                        disabled={isSavingEdit}
                      >
                        {isSavingEdit ? (
                          <>
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                            جاري الحفظ...
                          </>
                        ) : (
                          <>
                            <Save className="ml-2 h-4 w-4" />
                            حفظ التعديلات
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                        disabled={isSavingEdit}
                      >
                        <X className="ml-2 h-4 w-4" />
                        إلغاء
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 className="ml-2 h-4 w-4" />
                        تعديل نموذج الأعمال
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleGenerateBusinessModel}
                        disabled={generateBusinessModelMutation.isPending}
                      >
                        <Sparkles className="ml-2 h-4 w-4" />
                        إعادة التوليد
                      </Button>
                    </>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* MVP Features: Core vs Nice-to-Have */}
        {mvpFeatures && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                ميزات MVP
              </CardTitle>
              <CardDescription>
                الميزات الأساسية مقابل الميزات الإضافية (تم توليدها مع نموذج الأعمال)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Core Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    الميزات الأساسية ({mvpFeatures.core?.length || 0})
                  </h4>
                  <div className="space-y-2">
                    {mvpFeatures.core?.map((feature: any, index: number) => (
                      <div
                        key={feature.id || index}
                        className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                      >
                        <p className="font-medium text-sm">{feature.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nice-to-Have Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4 text-muted-foreground" />
                    الميزات الإضافية ({mvpFeatures.niceToHave?.length || 0})
                  </h4>
                  <div className="space-y-2">
                    {mvpFeatures.niceToHave?.map((feature: any, index: number) => (
                      <div
                        key={feature.id || index}
                        className="p-3 bg-muted rounded-lg"
                      >
                        <p className="font-medium text-sm">{feature.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Prototyping Tips */}
        <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-purple-900 dark:text-purple-100 flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              نصائح لتحديد MVP
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-purple-800 dark:text-purple-200 space-y-2">
            <p>✓ ركز على الميزات التي تحل المشكلة الأساسية فقط</p>
            <p>✓ ابدأ صغيراً واختبر الفرضيات الرئيسية</p>
            <p>✓ تجنب الميزات المعقدة في النسخة الأولى</p>
            <p>✓ حدد أولويات الميزات بناءً على قيمة المستخدم</p>
            <p>✓ اجعل المنتج قابلاً للتطوير لاحقاً</p>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-between">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleBack}
              disabled={isSavingEdit}
            >
              <ArrowRight className="ml-2 h-5 w-5" />
              السابق
            </Button>
          )}
          <div className={!onBack ? 'mr-auto' : ''}>
            <Button type="submit" size="lg" disabled={!isValid || isEditing}>
              حفظ والمتابعة
              <Rocket className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
