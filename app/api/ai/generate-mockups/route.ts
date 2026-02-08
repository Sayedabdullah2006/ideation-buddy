/**
 * API Route: Generate Screen Mockups
 *
 * POST /api/ai/generate-mockups
 * Generates screen mockups and user flow using AI based on all project data
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { prisma } from '@/lib/prisma';
import { generateWithContext, parseAIJSON } from '@/lib/api/gemini-client';
import { getSystemPrompt, SYSTEM_PROMPTS } from '@/lib/ai/prompts';
import { enforceRateLimit } from '@/lib/api/rate-limiter';
import { logAIGeneration } from '@/lib/ai/ai-logger';
import { MockupData } from '@/types';

/**
 * Build comprehensive mockup prompt with ALL project context
 */
function buildComprehensiveMockupPrompt(project: any): string {
  // Extract all project data
  const personas = project.personas as any[] || [];
  const selectedSolution = project.selectedSolution as any;
  const businessModel = project.businessModel as any;
  const mvpFeatures = project.mvpFeatures as any;
  const mvpSpec = project.mvpSpec as any;
  const validationData = project.validationData as any;
  const architectureData = project.architectureData as any;

  // Build personas context
  const personasContext = personas.length > 0 ? `
**TARGET USER PERSONAS:**
${personas.map((p, i) => `
Persona ${i + 1}: ${p.name}
- العمر: ${p.age} - المهنة: ${p.occupation}
- السيرة: ${p.bio}
- نقاط الألم: ${p.painPoints?.join('، ') || 'غير محدد'}
- الأهداف: ${p.goals?.join('، ') || 'غير محدد'}
- الإحباطات: ${p.frustrations?.join('، ') || 'غير محدد'}`).join('\n')}` : '';

  // Build solution context
  const solutionContext = selectedSolution ? `
**SELECTED SOLUTION:**
- العنوان: ${selectedSolution.title}
- الوصف: ${selectedSolution.description}
- درجة التأثير: ${selectedSolution.impactScore}/10
- درجة الجدوى: ${selectedSolution.feasibilityScore}/10` : '';

  // Build business model context
  const businessModelContext = businessModel ? `
**BUSINESS MODEL (نموذج العمل):**
- القيمة المقدمة: ${businessModel.valuePropositions?.join('، ') || 'غير محدد'}
- شرائح العملاء: ${businessModel.customerSegments?.join('، ') || 'غير محدد'}
- مصادر الإيرادات: ${businessModel.revenueStreams?.join('، ') || 'غير محدد'}
- الأنشطة الرئيسية: ${businessModel.keyActivities?.join('، ') || 'غير محدد'}
- القنوات: ${businessModel.channels?.join('، ') || 'غير محدد'}
- علاقات العملاء: ${businessModel.customerRelationships?.join('، ') || 'غير محدد'}` : '';

  // Build MVP features context
  const mvpFeaturesContext = mvpFeatures ? `
**MVP FEATURES (ميزات المنتج الأولي):**
الميزات الأساسية:
${mvpFeatures.core?.map((f: any) => `- ${f.title}: ${f.description}`).join('\n') || 'غير محدد'}

الميزات الإضافية:
${mvpFeatures.niceToHave?.map((f: any) => `- ${f.title}: ${f.description}`).join('\n') || 'غير محدد'}` : '';

  // Build MVP spec context
  const mvpSpecContext = mvpSpec ? `
**MVP SPECIFICATION (مواصفات المنتج):**
- نوع المشروع: ${mvpSpec.projectType || 'تطبيق ويب'}
- نظرة عامة: ${mvpSpec.overview || ''}

تدفق المستخدم:
${mvpSpec.userFlow?.join('\n') || 'غير محدد'}

التقنيات المقترحة:
- الواجهة: ${mvpSpec.techStackRecommendation?.frontend?.join('، ') || 'غير محدد'}
- الخادم: ${mvpSpec.techStackRecommendation?.backend?.join('، ') || 'غير محدد'}
- قاعدة البيانات: ${mvpSpec.techStackRecommendation?.database || 'غير محدد'}` : '';

  // Build validation context
  const validationContext = validationData ? `
**VALIDATION RESULTS (نتائج التحقق):**
- الدرجة الإجمالية: ${validationData.overallScore}/100
- مستوى الجاهزية: ${validationData.readinessLevel}
- ملخص تنفيذي: ${validationData.executiveSummary}

ملاءمة المشكلة والحل:
- الدرجة: ${validationData.problemSolutionFit?.score}/10
- نقاط القوة: ${validationData.problemSolutionFit?.strengths?.join('، ') || 'غير محدد'}

القرار النهائي:
- المضي قدماً: ${validationData.finalVerdict?.proceed ? 'نعم' : 'لا'}
- الثقة: ${validationData.finalVerdict?.confidence}%
- التبرير: ${validationData.finalVerdict?.reasoning}` : '';

  // Build architecture context
  const architectureContext = architectureData ? `
**SYSTEM ARCHITECTURE (معمارية النظام):**
- اسم النظام: ${architectureData.overview?.systemName || 'غير محدد'}
- النمط المعماري: ${architectureData.overview?.architecturePattern || 'غير محدد'}
- الوصف: ${architectureData.overview?.description || ''}

المكونات الرئيسية:
${architectureData.components?.map((c: any) => `- ${c.name} (${c.type}): ${c.description}`).join('\n') || 'غير محدد'}

قاعدة البيانات:
- النوع: ${architectureData.database?.type || 'غير محدد'}
- الكيانات: ${architectureData.database?.entities?.map((e: any) => e.name).join('، ') || 'غير محدد'}

واجهات البرمجة:
${architectureData.apis?.[0]?.endpoints?.slice(0, 5).map((e: any) => `- ${e.method} ${e.path}: ${e.description}`).join('\n') || 'غير محدد'}` : '';

  return `**TASK:** Create detailed, functional screen mockups that reflect the ACTUAL business model and project data.

**CRITICAL REQUIREMENT:** The mockups MUST:
1. Reflect the REAL business model - use actual value propositions, features, and user segments
2. Address the REAL user personas - their pain points, goals, and needs
3. Implement the ACTUAL MVP features - not generic placeholders
4. Follow the validated solution approach
5. Be consistent with the system architecture

**PROJECT INFORMATION:**
- العنوان: ${project.title}
- الوصف: ${project.description || ''}
- بيان المشكلة: ${project.problemStatement || 'غير محدد'}
${personasContext}
${solutionContext}
${businessModelContext}
${mvpFeaturesContext}
${mvpSpecContext}
${validationContext}
${architectureContext}

**MANDATORY DESIGN SYSTEM - DGA Platforms Code (كود المنصات):**

You MUST use the official Saudi Government DGA design system specifications:

**Color Palette:**
- Primary (Green): #25935F - Main CTAs, interactive elements, links
- Neutral: #6C737F - Body text, borders, disabled states
- Error: #F04438 - Error messages, destructive actions
- Warning: #F79009 - Warning notifications
- Gold: #F5BD02 - Highlights, badges
- Lavender: #80519F - Accent elements, secondary actions

**Typography:**
- Font: IBM Plex Sans Arabic
- Headings: 700 weight (Bold)
- Subheadings: 600 weight (Semibold)
- Body: 16px, 400 weight (Regular)

**Component Classes:**
- Buttons: dga-btn dga-primary, dga-btn dga-secondary-outline, dga-btn dga-danger
- Cards: card default, card-body, card-title, card-text
- Forms: form-check check-md check-primary

**Layout:**
- RTL (Right-to-Left) layout for Arabic
- Bootstrap 5.3.3 RTL grid system
- Mobile-first responsive design

**INSTRUCTIONS FOR DYNAMIC CONTENT:**

1. **Homepage/Landing Screen:**
   - Use ACTUAL value propositions from the business model
   - Highlight REAL features from MVP features list
   - Target the ACTUAL customer segments
   - Use messaging that addresses REAL pain points from personas

2. **Dashboard/Main Screen:**
   - Implement ACTUAL core features from MVP features
   - Show statistics relevant to the REAL business model
   - Provide actions based on REAL user goals

3. **Feature Screens:**
   - Create screens for EACH core MVP feature
   - Use REAL terminology from the business model
   - Address REAL user pain points

4. **User Management:**
   - Based on ACTUAL customer segments
   - Registration fields relevant to the business model
   - Profile data relevant to the service

5. **Forms and Data Entry:**
   - Fields based on ACTUAL database entities from architecture
   - Validation based on REAL business rules

**SCREENS TO CREATE (6-10 screens):**
Based on the MVP features, create screens that implement the ACTUAL functionality described.
Each screen should have REAL content, not placeholders.

**OUTPUT FORMAT (Valid JSON):**
\`\`\`json
{
  "screens": [
    {
      "id": "home",
      "name": "الصفحة الرئيسية",
      "nameEn": "Home",
      "description": "وصف يعكس القيمة الفعلية للمنتج",
      "elements": [
        "شريط التنقل مع شعار [اسم المشروع الفعلي]",
        "قسم Hero يعرض: [القيمة المقدمة الفعلية من نموذج العمل]",
        "ميزات المنتج: [الميزات الأساسية الفعلية من MVP]",
        "شهادات من [شرائح العملاء الفعلية]",
        "CTA للتسجيل يستهدف [الشريحة المستهدفة]"
      ],
      "interactions": [
        "التفاعلات المبنية على تدفق المستخدم الفعلي"
      ],
      "notes": "ملاحظات خاصة بالمشروع"
    }
  ],
  "userFlow": [
    {
      "id": "flow-1",
      "step": 1,
      "title": "عنوان مبني على تدفق المستخدم الفعلي",
      "description": "وصف يعكس رحلة المستخدم الحقيقية",
      "screenId": "home",
      "actions": ["إجراءات فعلية"],
      "nextSteps": ["flow-2"]
    }
  ],
  "navigationStructure": {
    "mainNav": ["روابط مبنية على ميزات MVP الفعلية"],
    "footerNav": ["سياسة الخصوصية", "الشروط والأحكام", "الدعم"],
    "userMenu": ["خيارات المستخدم المبنية على نموذج العمل"]
  },
  "designGuidelines": {
    "colorScheme": ["#25935F (الأساسي)", "#6C737F (النص)", "#F04438 (الخطأ)"],
    "typography": "خط IBM Plex Sans Arabic",
    "spacing": "نظام Bootstrap RTL grid",
    "components": ["dga-btn dga-primary", "card default"]
  },
  "businessContext": {
    "valueProposition": "القيمة المقدمة الرئيسية",
    "targetAudience": "الجمهور المستهدف",
    "coreFeatures": ["الميزة 1", "الميزة 2"],
    "keyActions": ["الإجراء الرئيسي للمستخدم"]
  }
}
\`\`\`

Generate mockups that are SPECIFIC to this project's business model. Do NOT use generic placeholder content.`;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { projectId } = body;

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'معرف المشروع مطلوب' },
        { status: 400 }
      );
    }

    await enforceRateLimit(session.user.id);

    // Fetch ALL project data for comprehensive mockup generation
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'المشروع غير موجود أو غير مصرح' },
        { status: 404 }
      );
    }

    // Build comprehensive prompt with ALL project context
    const userPrompt = buildComprehensiveMockupPrompt(project);
    const systemPrompt = SYSTEM_PROMPTS.MOCKUP_GENERATION;

    // Use Gemini for generation
    const aiResponse = await generateWithContext(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      { temperature: 0.7, maxTokens: 8000 }
    );

    const parsedData = parseAIJSON<MockupData>(aiResponse.content);

    // Add project context to mockup data for HTML generation
    const enrichedMockupData = {
      ...parsedData,
      projectContext: {
        title: project.title,
        description: project.description,
        personas: project.personas,
        selectedSolution: project.selectedSolution,
        businessModel: project.businessModel,
        mvpFeatures: project.mvpFeatures,
        problemStatement: project.problemStatement,
      },
    };

    await prisma.project.update({
      where: { id: projectId },
      data: {
        mockupData: enrichedMockupData,
        status: 'COMPLETED',
      },
    });

    const latencyMs = Date.now() - startTime;
    await logAIGeneration({
      userId: session.user.id,
      projectId,
      step: 'MOCKUP_SCREENS',
      prompt: userPrompt.substring(0, 500),
      response: aiResponse.content.substring(0, 1000),
      status: 'SUCCESS',
      tokensUsed: aiResponse.tokensUsed,
      latencyMs,
      modelVersion: aiResponse.model,
    });

    return NextResponse.json({
      success: true,
      data: enrichedMockupData,
      message: 'تم إنشاء تصميمات الشاشات بنجاح',
    });

  } catch (error: any) {
    console.error('AI Mockup Generation Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'حدث خطأ أثناء إنشاء تصميمات الشاشات',
      },
      { status: 500 }
    );
  }
}
