'use client';

/**
 * Step 6: Mockup
 * Generate screen mockups and user flow
 */

import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layout, Sparkles, Download, FileText, Code, Loader2, Monitor, ArrowRight, Palette, FileCode, FolderDown, Eye, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Play } from 'lucide-react';
import { useGenerateMockups } from '@/hooks/use-ai-generation';
import { AIProgress } from '@/components/ui/ai-progress';
import { MockupData, ScreenMockup } from '@/types';
import { generateScreenHTML, generateAllMockupHTML, generateFullMVPHTML } from '@/lib/mockup-html-generator';
import JSZip from 'jszip';

const mockupSchema = z.object({});

type MockupInput = z.infer<typeof mockupSchema>;

interface StepMockupProps {
  initialData?: Partial<MockupInput>;
  projectId?: string;
  projectTitle?: string;
  mockupData?: MockupData;
  onSubmit: (data: MockupInput) => void;
  onBack?: () => void;
}

export default function StepMockup({
  initialData,
  projectId,
  projectTitle = 'مشروع',
  mockupData,
  onSubmit,
  onBack,
}: StepMockupProps) {
  const {
    handleSubmit,
    formState: { isValid },
  } = useForm<MockupInput>({
    resolver: zodResolver(mockupSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const generateMockupsMutation = useGenerateMockups();

  const handleGenerateMockups = () => {
    if (projectId) {
      generateMockupsMutation.mutate(projectId);
    }
  };

  const handleExportMarkdown = () => {
    if (!mockupData) return;

    const markdown = `# ${projectTitle} - تصميمات الشاشات

## الشاشات الرئيسية

${mockupData.screens?.map((screen, i) => `
### ${i + 1}. ${screen.name} (${screen.nameEn})

**الوصف:** ${screen.description}

**العناصر:**
${screen.elements?.map(el => `- ${el}`).join('\n')}

**التفاعلات:**
${screen.interactions?.map(int => `- ${int}`).join('\n')}

**ملاحظات:** ${screen.notes}
`).join('\n---\n')}

## تدفق المستخدم

${mockupData.userFlow?.map(flow => `
### الخطوة ${flow.step}: ${flow.title}

${flow.description}

**الإجراءات:**
${flow.actions?.map(a => `- ${a}`).join('\n')}

**الخطوات التالية:** ${flow.nextSteps?.join(', ')}
`).join('\n')}

## هيكل التنقل

### القائمة الرئيسية
${mockupData.navigationStructure?.mainNav?.map(n => `- ${n}`).join('\n')}

### قائمة التذييل
${mockupData.navigationStructure?.footerNav?.map(n => `- ${n}`).join('\n')}

### قائمة المستخدم
${mockupData.navigationStructure?.userMenu?.map(n => `- ${n}`).join('\n')}

## إرشادات التصميم

### الألوان
${mockupData.designGuidelines?.colorScheme?.map(c => `- ${c}`).join('\n')}

### الخطوط
${mockupData.designGuidelines?.typography}

### المسافات
${mockupData.designGuidelines?.spacing}

### المكونات
${mockupData.designGuidelines?.components?.map(c => `- ${c}`).join('\n')}

---
*تم التوليد بواسطة IdeaFlow AI*
`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle}-Mockups.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    if (!mockupData) return;

    const json = JSON.stringify(mockupData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle}-Mockups.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download single screen as HTML
  const handleDownloadScreenHTML = (screen: ScreenMockup) => {
    if (!mockupData) return;

    const html = generateScreenHTML(screen, projectTitle, mockupData.navigationStructure);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${screen.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download all screens as ZIP
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  // Preview state
  const [previewScreenIndex, setPreviewScreenIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // SPA interactive preview state
  const [isSPAPreviewOpen, setIsSPAPreviewOpen] = useState(false);
  const [spaHTML, setSpaHTML] = useState<string>('');
  const [currentSPAPage, setCurrentSPAPage] = useState<string>('home');

  const isPreviewOpen = previewScreenIndex !== null;
  const currentPreviewScreen = isPreviewOpen && mockupData?.screens ? mockupData.screens[previewScreenIndex] : null;

  const openPreview = (index: number) => {
    setPreviewScreenIndex(index);
  };

  const closePreview = () => {
    setPreviewScreenIndex(null);
    setIsFullscreen(false);
  };

  const goToNextScreen = () => {
    if (mockupData?.screens && previewScreenIndex !== null) {
      setPreviewScreenIndex((previewScreenIndex + 1) % mockupData.screens.length);
    }
  };

  const goToPrevScreen = () => {
    if (mockupData?.screens && previewScreenIndex !== null) {
      setPreviewScreenIndex((previewScreenIndex - 1 + mockupData.screens.length) % mockupData.screens.length);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle keyboard navigation in preview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPreviewOpen) return;

      switch (e.key) {
        case 'Escape':
          closePreview();
          break;
        case 'ArrowLeft':
          goToNextScreen(); // RTL: left arrow goes to next
          break;
        case 'ArrowRight':
          goToPrevScreen(); // RTL: right arrow goes to prev
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewOpen, previewScreenIndex]);

  // Launch SPA interactive preview
  const handleLaunchSPA = useCallback(() => {
    if (!mockupData) return;
    const html = generateFullMVPHTML(mockupData, projectTitle);
    setSpaHTML(html);
    setCurrentSPAPage('home');
    setIsSPAPreviewOpen(true);
  }, [mockupData, projectTitle]);

  // Listen for postMessage from SPA iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'pageChanged') {
        setCurrentSPAPage(e.data.page);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Close SPA preview on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSPAPreviewOpen) {
        setIsSPAPreviewOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSPAPreviewOpen]);

  // Generate HTML for preview
  const getPreviewHTML = useCallback((screen: ScreenMockup) => {
    if (!mockupData) return '';
    return generateScreenHTML(screen, projectTitle, mockupData.navigationStructure);
  }, [mockupData, projectTitle]);

  const handleDownloadAllHTML = async () => {
    if (!mockupData) return;

    setIsDownloadingZip(true);
    try {
      const zip = new JSZip();
      const htmlFiles = generateAllMockupHTML(mockupData, projectTitle);

      // Add all HTML files to ZIP
      Object.entries(htmlFiles).forEach(([filename, content]) => {
        zip.file(filename, content);
      });

      // Add a README file
      const readme = `# ${projectTitle} - النماذج الأولية

## DGA Design System Mockups

تم توليد هذه الملفات بواسطة IdeaFlow AI باستخدام نظام التصميم الموحد DGA (كود المنصات).

### الملفات المضمنة:
- index.html - الصفحة الرئيسية مع روابط لجميع الشاشات
${mockupData.screens?.map(s => `- ${s.id}.html - ${s.name} (${s.nameEn})`).join('\n') || ''}

### كيفية الاستخدام:
1. افتح ملف index.html في المتصفح
2. تصفح الشاشات المختلفة عبر الروابط
3. الملفات تعمل بشكل مستقل ولا تحتاج خادم

### نظام التصميم:
- الألوان: DGA Platforms Code
- الخط: IBM Plex Sans Arabic
- الإطار: Bootstrap 5.3.3 RTL
- الاتجاه: RTL (من اليمين لليسار)

---
تم التوليد: ${new Date().toLocaleDateString('ar-SA')}
`;
      zip.file('README.md', readme);

      // Generate ZIP and download
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectTitle}-DGA-Mockups.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error creating ZIP:', error);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Modal */}
      {isPreviewOpen && currentPreviewScreen && (
        <div className={`fixed inset-0 z-50 bg-black/80 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4 md:p-8'}`}>
          {/* Close button */}
          <button
            onClick={closePreview}
            className="absolute top-4 left-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 left-16 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
          </button>

          {/* Screen info */}
          <div className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
            <span className="font-semibold">{currentPreviewScreen.name}</span>
            <span className="mx-2 text-white/60">|</span>
            <span className="text-white/80">{(previewScreenIndex || 0) + 1} / {mockupData?.screens?.length || 0}</span>
          </div>

          {/* Navigation - Previous (appears on right for RTL) */}
          <button
            onClick={goToPrevScreen}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Navigation - Next (appears on left for RTL) */}
          <button
            onClick={goToNextScreen}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors ml-20"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Preview iframe container */}
          <div className={`bg-white rounded-lg overflow-hidden shadow-2xl ${isFullscreen ? 'w-full h-full' : 'w-full max-w-5xl h-[80vh]'}`}>
            <iframe
              srcDoc={getPreviewHTML(currentPreviewScreen)}
              className="w-full h-full border-0"
              title={`معاينة ${currentPreviewScreen.name}`}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>

          {/* Screen thumbnails navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            {mockupData?.screens?.map((screen, index) => (
              <button
                key={screen.id}
                onClick={() => setPreviewScreenIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === previewScreenIndex
                    ? 'bg-white'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                title={screen.name}
              />
            ))}
          </div>

          {/* Keyboard hints */}
          <div className="absolute bottom-4 right-4 z-10 text-white/60 text-xs">
            <span>استخدم ← → للتنقل</span>
            <span className="mx-2">|</span>
            <span>ESC للإغلاق</span>
          </div>
        </div>
      )}

      {/* SPA Interactive Preview Modal */}
      {isSPAPreviewOpen && spaHTML && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-black/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSPAPreviewOpen(false)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-white">
                <span className="font-semibold">{projectTitle}</span>
                <span className="mx-2 text-white/60">|</span>
                <span className="text-white/80 text-sm">النموذج التفاعلي الكامل</span>
              </div>
            </div>
            <div className="text-white/60 text-xs">
              <span>ESC للإغلاق</span>
              <span className="mx-2">|</span>
              <span>الصفحة الحالية: {currentSPAPage}</span>
            </div>
          </div>

          {/* Iframe */}
          <div className="flex-1 bg-white">
            <iframe
              srcDoc={spaHTML}
              className="w-full h-full border-0"
              title={`${projectTitle} - النموذج التفاعلي`}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>

          {/* Bottom navigation bar */}
          <div className="flex items-center justify-center gap-1 px-4 py-2 bg-black/50 backdrop-blur-sm overflow-x-auto">
            {mockupData?.screens?.map((screen) => (
              <button
                key={screen.id}
                onClick={() => {
                  const iframe = document.querySelector('iframe') as HTMLIFrameElement;
                  iframe?.contentWindow?.postMessage({ type: 'navigate', page: screen.id }, '*');
                }}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors whitespace-nowrap ${
                  currentSPAPage === screen.id
                    ? 'bg-white text-black'
                    : 'text-white/80 hover:text-white hover:bg-white/20'
                }`}
                title={screen.name}
              >
                {screen.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Monitor className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">الخطوة 6: النماذج الأولية</h2>
        <p className="text-muted-foreground text-lg">
          تصميمات الشاشات وتدفق المستخدم
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Mockup Generation */}
        <Card className={mockupData ? "border-primary/50" : "bg-muted/50 border-dashed"}>
          <CardContent className="pt-6">
            {!mockupData ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">توليد النماذج الأولية للشاشات</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
                    سيتم توليد تصميمات تفصيلية للشاشات تتضمن:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-right">
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">✓ الشاشات الرئيسية</h4>
                    <p className="text-xs text-muted-foreground">
                      6-10 شاشات تغطي جميع الميزات
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">✓ تدفق المستخدم</h4>
                    <p className="text-xs text-muted-foreground">
                      خطوات التنقل بين الشاشات
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">✓ هيكل التنقل</h4>
                    <p className="text-xs text-muted-foreground">
                      القوائم والروابط الرئيسية
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">✓ إرشادات التصميم</h4>
                    <p className="text-xs text-muted-foreground">
                      الألوان والخطوط والمكونات
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  size="lg"
                  onClick={handleGenerateMockups}
                  disabled={!projectId || generateMockupsMutation.isPending}
                >
                  {generateMockupsMutation.isPending ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جاري التوليد...
                    </>
                  ) : (
                    <>
                      <Sparkles className="ml-2 h-5 w-5" />
                      توليد النماذج الأولية
                    </>
                  )}
                </Button>

                <AIProgress
                  isActive={generateMockupsMutation.isPending}
                  estimatedDuration={30}
                  label="جاري توليد النماذج الأولية"
                  steps={[
                    'تحليل مواصفات MVP...',
                    'تصميم الشاشات الرئيسية...',
                    'بناء تدفق المستخدم...',
                    'إنشاء هيكل التنقل...',
                    'تطبيق إرشادات التصميم...',
                    'مراجعة النماذج...',
                  ]}
                />
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {/* Screens */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <CardTitle className="flex items-center gap-2">
                          <Monitor className="w-5 h-5" />
                          الشاشات الرئيسية ({mockupData.screens?.length || 0})
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={handleLaunchSPA}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Play className="ml-2 h-4 w-4" />
                            تشغيل النموذج التفاعلي
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => openPreview(0)}
                          >
                            <Eye className="ml-2 h-4 w-4" />
                            معاينة الشاشات
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        انقر على "معاينة" لعرض الشاشة في وضع المعاينة التفاعلية
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockupData.screens?.map((screen, index) => (
                          <Card key={screen.id} className="bg-muted/30">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-semibold text-primary">
                                  {index + 1}
                                </span>
                                {screen.name}
                              </CardTitle>
                              <CardDescription className="text-xs">
                                {screen.nameEn}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <p className="text-sm text-muted-foreground">
                                {screen.description}
                              </p>
                              <div>
                                <h5 className="text-xs font-semibold mb-1">العناصر:</h5>
                                <ul className="text-xs text-muted-foreground space-y-1">
                                  {screen.elements?.slice(0, 4).map((el, i) => (
                                    <li key={i}>• {el}</li>
                                  ))}
                                  {screen.elements?.length > 4 && (
                                    <li className="text-primary">+ {screen.elements.length - 4} عناصر أخرى</li>
                                  )}
                                </ul>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Button
                                  type="button"
                                  variant="default"
                                  size="sm"
                                  onClick={() => openPreview(index)}
                                  className="flex-1"
                                >
                                  <Eye className="ml-2 h-3 w-3" />
                                  معاينة
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDownloadScreenHTML(screen)}
                                  className="flex-1"
                                >
                                  <FileCode className="ml-2 h-3 w-3" />
                                  تحميل
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* User Flow */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ArrowRight className="w-5 h-5" />
                        تدفق المستخدم
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockupData.userFlow?.map((flow, index) => (
                          <div key={flow.id} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">
                              {flow.step}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{flow.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {flow.description}
                              </p>
                              <div className="flex gap-2 mt-2">
                                {flow.actions?.map((action, i) => (
                                  <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                    {action}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Navigation Structure */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Layout className="w-5 h-5" />
                        هيكل التنقل
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">القائمة الرئيسية</h4>
                          <ul className="space-y-1">
                            {mockupData.navigationStructure?.mainNav?.map((item, i) => (
                              <li key={i} className="text-sm text-muted-foreground">• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">قائمة التذييل</h4>
                          <ul className="space-y-1">
                            {mockupData.navigationStructure?.footerNav?.map((item, i) => (
                              <li key={i} className="text-sm text-muted-foreground">• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">قائمة المستخدم</h4>
                          <ul className="space-y-1">
                            {mockupData.navigationStructure?.userMenu?.map((item, i) => (
                              <li key={i} className="text-sm text-muted-foreground">• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Design Guidelines */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        إرشادات التصميم
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">الألوان</h4>
                          <div className="flex flex-wrap gap-2">
                            {mockupData.designGuidelines?.colorScheme?.map((color, i) => (
                              <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">الخطوط</h4>
                          <p className="text-sm text-muted-foreground">
                            {mockupData.designGuidelines?.typography}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">المسافات</h4>
                          <p className="text-sm text-muted-foreground">
                            {mockupData.designGuidelines?.spacing}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">المكونات</h4>
                          <ul className="space-y-1">
                            {mockupData.designGuidelines?.components?.map((comp, i) => (
                              <li key={i} className="text-sm text-muted-foreground">• {comp}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Export Options */}
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="text-green-900 dark:text-green-100 flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        تصدير النماذج الأولية
                      </CardTitle>
                      <CardDescription className="text-green-800 dark:text-green-200">
                        قم بتصدير تصميمات الشاشات بصيغ مختلفة
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* HTML Export - Primary */}
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-green-300 dark:border-green-700">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                            <FolderDown className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-green-900 dark:text-green-100">تحميل ملفات HTML</h4>
                            <p className="text-xs text-green-700 dark:text-green-300">
                              ملفات HTML جاهزة للعرض بنظام DGA Design System
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          onClick={handleDownloadAllHTML}
                          disabled={isDownloadingZip}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          {isDownloadingZip ? (
                            <>
                              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                              جاري التحميل...
                            </>
                          ) : (
                            <>
                              <FolderDown className="ml-2 h-4 w-4" />
                              تحميل جميع الشاشات (ZIP)
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-center text-green-600 dark:text-green-400 mt-2">
                          يتضمن {mockupData.screens?.length || 0} شاشة + صفحة فهرس + README
                        </p>
                      </div>

                      {/* Other Export Options */}
                      <div className="flex gap-3">
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
                      </div>
                    </CardContent>
                  </Card>

                  {/* Regenerate Option */}
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateMockups}
                      disabled={generateMockupsMutation.isPending}
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

        {/* Navigation */}
        <div className="flex justify-between">
          {onBack && (
            <Button type="button" variant="outline" onClick={() => onBack?.()}>
              السابق
            </Button>
          )}
          <Button type="submit" size="lg" className="mr-auto">
            إنهاء المشروع
            <Layout className="mr-2 h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
