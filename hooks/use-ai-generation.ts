/**
 * Custom React Hooks for AI Generation
 *
 * React Query hooks for all AI generation endpoints with loading states and error handling.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { PersonaData, SolutionData, BusinessModelCanvas, MVPFeatures, MVPSpecification, MockupData, IdeaValidationResult, SystemArchitecture } from '@/types';

// ============================================
// API CALL FUNCTIONS
// ============================================

async function generatePersonas(projectId: string): Promise<{ personas: PersonaData[] }> {
  const response = await fetch('/api/ai/generate-personas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'فشل إنشاء الشخصيات');
  }

  return data.data;
}

async function refineProblem(projectId: string, problemStatement: string): Promise<any> {
  const response = await fetch('/api/ai/refine-problem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, problemStatement }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'فشل تحسين بيان المشكلة');
  }

  return data.data;
}

async function generateSolutions(projectId: string): Promise<{ solutions: SolutionData[] }> {
  const response = await fetch('/api/ai/generate-solutions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'فشل إنشاء الحلول');
  }

  return data.data;
}

async function generateBusinessModel(projectId: string): Promise<{
  businessModel: BusinessModelCanvas;
  mvpFeatures: MVPFeatures;
}> {
  const response = await fetch('/api/ai/generate-business-model', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'فشل إنشاء نموذج العمل');
  }

  return data.data;
}

async function generateMVPSpec(projectId: string): Promise<MVPSpecification> {
  const response = await fetch('/api/ai/generate-mvp-spec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'فشل إنشاء مواصفات MVP');
  }

  return data.data;
}

async function generateMockups(projectId: string): Promise<MockupData> {
  const response = await fetch('/api/ai/generate-mockups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'فشل إنشاء تصميمات الشاشات');
  }

  return data.data;
}

async function validateIdea(projectId: string): Promise<IdeaValidationResult> {
  const response = await fetch('/api/ai/validate-idea', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'فشل التحقق من الفكرة');
  }

  return data.data;
}

async function generateArchitecture(projectId: string): Promise<SystemArchitecture> {
  const response = await fetch('/api/ai/generate-architecture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'فشل توليد معمارية النظام');
  }

  return data.data;
}

// ============================================
// REACT QUERY HOOKS
// ============================================

/**
 * Hook: Generate User Personas (Step 1)
 */
export function useGeneratePersonas() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: generatePersonas,
    onSuccess: (data, projectId) => {
      toast({
        title: 'تم إنشاء الشخصيات',
        description: `تم إنشاء ${data.personas.length} شخصيات بنجاح`,
      });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطأ في إنشاء الشخصيات',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook: Refine Problem Statement (Step 2)
 */
export function useRefineProblem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ projectId, problemStatement }: { projectId: string; problemStatement: string }) =>
      refineProblem(projectId, problemStatement),
    onSuccess: (_data, { projectId }) => {
      toast({
        title: 'تم تحسين بيان المشكلة',
        description: 'تم إنشاء بدائل محسنة لبيان المشكلة',
      });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطأ في تحسين بيان المشكلة',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook: Generate Solutions (Step 3)
 */
export function useGenerateSolutions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: generateSolutions,
    onSuccess: (data, projectId) => {
      toast({
        title: 'تم إنشاء الحلول',
        description: `تم إنشاء ${data.solutions.length} حلول بنجاح`,
      });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطأ في إنشاء الحلول',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook: Generate Business Model Canvas (Step 4)
 */
export function useGenerateBusinessModel() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: generateBusinessModel,
    onSuccess: (_data, projectId) => {
      toast({
        title: 'تم إنشاء نموذج العمل',
        description: 'تم إنشاء Business Model Canvas وميزات MVP',
      });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطأ في إنشاء نموذج العمل',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook: Generate MVP Specification (Step 5)
 */
export function useGenerateMVPSpec() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: generateMVPSpec,
    onSuccess: (_data, projectId) => {
      toast({
        title: 'تم إنشاء مواصفات MVP',
        description: 'تم إنشاء المواصفات الفنية الكاملة للمشروع',
      });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطأ في إنشاء مواصفات MVP',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook: Generate Screen Mockups (Step 6)
 */
export function useGenerateMockups() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: generateMockups,
    onSuccess: (_data, projectId) => {
      toast({
        title: 'تم إنشاء تصميمات الشاشات',
        description: 'تم إنشاء النماذج الأولية وتدفق المستخدم',
      });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطأ في إنشاء تصميمات الشاشات',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook: Validate Idea (Comprehensive AI Validation)
 */
export function useValidateIdea() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: validateIdea,
    onSuccess: (_data, projectId) => {
      toast({
        title: 'تم التحقق من الفكرة',
        description: 'تم إنشاء تقرير التحقق الشامل',
      });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطأ في التحقق من الفكرة',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Hook: Generate System Architecture (Step 7)
 */
export function useGenerateArchitecture() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: generateArchitecture,
    onSuccess: (_data, projectId) => {
      toast({
        title: 'تم توليد معمارية النظام',
        description: 'تم إنشاء التصميم المعماري الشامل',
      });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطأ في توليد المعمارية',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// ============================================
// EXPORTS
// ============================================

export default {
  useGeneratePersonas,
  useRefineProblem,
  useGenerateSolutions,
  useGenerateBusinessModel,
  useGenerateMVPSpec,
  useGenerateMockups,
  useValidateIdea,
  useGenerateArchitecture,
};
