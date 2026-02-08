'use client';

/**
 * Design Thinking Wizard - Full Implementation
 * Integrated wizard with all 5 steps, auto-save, and state management
 */

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Store
import { useWizardState, useWizardActions, useProjectState, useProjectActions } from '@/store';

// Components
import WizardProgress from '@/components/wizard/wizard-progress';
import StepEmpathize from '@/components/wizard/step-empathize';
import StepPersonas from '@/components/wizard/step-personas';
import StepDefine from '@/components/wizard/step-define';
import StepIdeate from '@/components/wizard/step-ideate';
import StepPrototype from '@/components/wizard/step-prototype';
import StepValidate from '@/components/wizard/step-validate';
import StepArchitecture from '@/components/wizard/step-architecture';
import StepMockup from '@/components/wizard/step-mockup';

// Hooks
import { useProject, useCreateProject, useUpdateProject } from '@/hooks/use-projects';
import { useAutoSave } from '@/hooks/use-auto-save';
import { useToast } from '@/hooks/use-toast';

export default function WizardPageNew() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const { toast } = useToast();

  // Wizard state
  const { currentStep, completedSteps } = useWizardState();
  const {
    setCurrentStep,
    markStepCompleted,
    goToNextStep,
    goToPreviousStep,
    canNavigateToStep,
    resetWizard,
  } = useWizardActions();

  // Project state
  const { project } = useProjectState();
  const { setProject, updateProject, clearProject } = useProjectActions();

  // API hooks
  const { data: projectData, isLoading } = useProject(projectId);
  const createProject = useCreateProject();
  const updateProjectMutation = useUpdateProject(projectId || '');

  // Auto-save
  const { manualSave, isSaving } = useAutoSave({
    projectId,
    enabled: !!projectId,
  });

  // Auto-create draft project when wizard loads without projectId
  const isCreatingRef = useRef(false);
  useEffect(() => {
    if (!projectId && !isCreatingRef.current) {
      isCreatingRef.current = true;
      createProject
        .mutateAsync({
          title: 'مشروع جديد',
          description: 'مشروع جديد قيد الإنشاء',
        })
        .then((result) => {
          if (result?.data) {
            router.replace(`/wizard?projectId=${result.data.id}`);
          }
        })
        .catch((error) => {
          console.error('Auto-create draft error:', error);
          isCreatingRef.current = false;
        });
    }
  }, [projectId]);

  // Load project data
  useEffect(() => {
    if (projectData) {
      setProject(projectData);

      // Set wizard step based on project status
      const statusToStep: Record<string, any> = {
        DRAFT: 'empathize',
        EMPATHIZE: 'empathize',
        PERSONAS: 'personas',
        DEFINE: 'define',
        IDEATE: 'ideate',
        PROTOTYPE: 'prototype',
        VALIDATE: 'validate',
        ARCHITECTURE: 'architecture',
        MOCKUP: 'mockup',
        COMPLETED: 'mockup',
      };

      const step = statusToStep[projectData.status] || 'empathize';
      setCurrentStep(step);
    }
  }, [projectData, setProject, setCurrentStep]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (!projectId) {
        clearProject();
        resetWizard();
      }
    };
  }, [projectId, clearProject, resetWizard]);

  // Step 1: Empathize - Submit handler
  const handleEmpathizeSubmit = async (data: any) => {
    if (!projectId) return;

    try {
      await updateProjectMutation.mutateAsync({
        ...data,
        status: 'PERSONAS',
      });

      // Mark step complete and go next
      markStepCompleted('empathize');
      goToNextStep();

      toast({
        title: 'تم الحفظ',
        description: 'تم حفظ بيانات المرحلة بنجاح',
      });
    } catch (error) {
      console.error('Empathize submit error:', error);
    }
  };

  // Step 2: Personas - Submit handler
  const handlePersonasSubmit = async () => {
    if (!projectId) return;

    try {
      await updateProjectMutation.mutateAsync({
        status: 'DEFINE',
      });

      markStepCompleted('personas');
      goToNextStep();

      toast({
        title: 'تم الحفظ',
        description: 'تم حفظ الشخصيات بنجاح',
      });
    } catch (error) {
      console.error('Personas submit error:', error);
    }
  };

  // Back handler with save - Personas step
  const handlePersonasBack = async () => {
    goToPreviousStep();
  };

  // Step 3: Define - Submit handler
  const handleDefineSubmit = async (data: any) => {
    if (!projectId) return;

    try {
      await updateProjectMutation.mutateAsync({
        ...data,
        status: 'IDEATE',
      });

      markStepCompleted('define');
      goToNextStep();

      toast({
        title: 'تم الحفظ',
        description: 'تم حفظ بيان المشكلة بنجاح',
      });
    } catch (error) {
      console.error('Define submit error:', error);
    }
  };

  // Back handler with save - Define step
  const handleDefineBack = async () => {
    if (!projectId || !project) {
      goToPreviousStep();
      return;
    }

    try {
      // Save current data without changing status
      await updateProjectMutation.mutateAsync({
        problemStatement: project.problemStatement,
        selectedPersona: project.selectedPersona,
      });
      goToPreviousStep();
    } catch (error) {
      console.error('Define back save error:', error);
      goToPreviousStep();
    }
  };

  // Step 3: Ideate - Submit handler
  const handleIdeateSubmit = async (data: any) => {
    if (!projectId) return;

    try {
      await updateProjectMutation.mutateAsync({
        ...data,
        status: 'PROTOTYPE',
      });

      markStepCompleted('ideate');
      goToNextStep();

      toast({
        title: 'تم الحفظ',
        description: 'تم حفظ الحلول بنجاح',
      });
    } catch (error) {
      console.error('Ideate submit error:', error);
    }
  };

  // Back handler with save - Ideate step
  const handleIdeateBack = async () => {
    if (!projectId || !project) {
      goToPreviousStep();
      return;
    }

    try {
      // Save current data without changing status
      await updateProjectMutation.mutateAsync({
        solutions: project.solutions,
        selectedSolution: project.selectedSolution,
      });
      goToPreviousStep();
    } catch (error) {
      console.error('Ideate back save error:', error);
      goToPreviousStep();
    }
  };

  // Step 4: Prototype - Submit handler
  const handlePrototypeSubmit = async (data: any) => {
    if (!projectId) return;

    try {
      await updateProjectMutation.mutateAsync({
        ...data,
        status: 'VALIDATE',
      });

      markStepCompleted('prototype');
      goToNextStep();

      toast({
        title: 'تم الحفظ',
        description: 'تم حفظ نموذج الأعمال بنجاح',
      });
    } catch (error) {
      console.error('Prototype submit error:', error);
    }
  };

  // Back handler with save - Prototype step
  const handlePrototypeBack = async () => {
    if (!projectId || !project) {
      goToPreviousStep();
      return;
    }

    try {
      // Save current data without changing status
      await updateProjectMutation.mutateAsync({
        businessModel: project.businessModel,
        mvpFeatures: project.mvpFeatures,
      });
      goToPreviousStep();
    } catch (error) {
      console.error('Prototype back save error:', error);
      goToPreviousStep();
    }
  };

  // Step 5: Validate - Submit handler
  const handleValidateSubmit = async (data: any) => {
    if (!projectId) return;

    try {
      await updateProjectMutation.mutateAsync({
        ...data,
        status: 'ARCHITECTURE',
      });

      markStepCompleted('validate');
      goToNextStep();

      toast({
        title: 'تم الحفظ',
        description: 'تم حفظ مواصفات MVP بنجاح',
      });
    } catch (error) {
      console.error('Validate submit error:', error);
    }
  };

  // Back handler with save - Validate step
  const handleValidateBack = async () => {
    if (!projectId || !project) {
      goToPreviousStep();
      return;
    }

    try {
      // Save current data without changing status
      await updateProjectMutation.mutateAsync({
        mvpSpec: project.mvpSpec,
      });
      goToPreviousStep();
    } catch (error) {
      console.error('Validate back save error:', error);
      goToPreviousStep();
    }
  };

  // Step 6: Architecture - Submit handler
  const handleArchitectureSubmit = async (data: any) => {
    if (!projectId) return;

    try {
      await updateProjectMutation.mutateAsync({
        ...data,
        status: 'MOCKUP',
      });

      markStepCompleted('architecture');
      goToNextStep();

      toast({
        title: 'تم الحفظ',
        description: 'تم حفظ معمارية النظام بنجاح',
      });
    } catch (error) {
      console.error('Architecture submit error:', error);
    }
  };

  // Back handler with save - Architecture step
  const handleArchitectureBack = async () => {
    if (!projectId || !project) {
      goToPreviousStep();
      return;
    }

    try {
      // Save current data without changing status
      await updateProjectMutation.mutateAsync({
        architectureData: project.architectureData,
      });
      goToPreviousStep();
    } catch (error) {
      console.error('Architecture back save error:', error);
      goToPreviousStep();
    }
  };

  // Step 7: Mockup - Submit handler
  const handleMockupSubmit = async (data: any) => {
    if (!projectId) return;

    try {
      await updateProjectMutation.mutateAsync({
        ...data,
        status: 'COMPLETED',
      });

      markStepCompleted('mockup');

      toast({
        title: 'تهانينا! 🎉',
        description: 'تم إكمال المشروع بنجاح',
      });

      // Redirect to projects
      router.push('/projects');
    } catch (error) {
      console.error('Mockup submit error:', error);
    }
  };

  // Back handler with save - Mockup step
  const handleMockupBack = async () => {
    if (!projectId || !project) {
      goToPreviousStep();
      return;
    }

    try {
      // Save current data without changing status
      await updateProjectMutation.mutateAsync({
        mockupData: project.mockupData,
      });
      goToPreviousStep();
    } catch (error) {
      console.error('Mockup back save error:', error);
      goToPreviousStep();
    }
  };

  // Export handler
  const handleExport = (format: 'markdown' | 'json') => {
    toast({
      title: 'قريباً',
      description: `سيتم إضافة ميزة التصدير إلى ${format} في المرحلة 4`,
    });
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 'empathize':
        return (
          <StepEmpathize
            initialData={project || undefined}
            projectId={projectId || undefined}
            onSubmit={handleEmpathizeSubmit}
          />
        );

      case 'personas':
        return (
          <StepPersonas
            projectId={projectId || undefined}
            personas={project?.personas}
            onSubmit={handlePersonasSubmit}
            onBack={handlePersonasBack}
          />
        );

      case 'define':
        return (
          <StepDefine
            initialData={project || undefined}
            projectId={projectId || undefined}
            personas={project?.personas}
            onSubmit={handleDefineSubmit}
            onBack={handleDefineBack}
          />
        );

      case 'ideate':
        return (
          <StepIdeate
            initialData={project || undefined}
            projectId={projectId || undefined}
            solutions={project?.solutions}
            onSubmit={handleIdeateSubmit}
            onBack={handleIdeateBack}
          />
        );

      case 'prototype':
        return (
          <StepPrototype
            initialData={project || undefined}
            projectId={projectId || undefined}
            businessModel={project?.businessModel}
            mvpFeatures={project?.mvpFeatures}
            onSubmit={handlePrototypeSubmit}
            onBack={handlePrototypeBack}
          />
        );

      case 'validate':
        return (
          <StepValidate
            initialData={project || undefined}
            projectId={projectId || undefined}
            projectTitle={project?.title}
            mvpSpec={project?.mvpSpec}
            onSubmit={handleValidateSubmit}
            onBack={handleValidateBack}
          />
        );

      case 'architecture':
        return (
          <StepArchitecture
            projectId={projectId || undefined}
            projectTitle={project?.title}
            architectureData={project?.architectureData}
            onSubmit={handleArchitectureSubmit}
            onBack={handleArchitectureBack}
          />
        );

      case 'mockup':
        return (
          <StepMockup
            initialData={project || undefined}
            projectId={projectId || undefined}
            projectTitle={project?.title}
            mockupData={project?.mockupData}
            onSubmit={handleMockupSubmit}
            onBack={handleMockupBack}
          />
        );

      default:
        return null;
    }
  };

  if (isLoading || !projectId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة إلى المشاريع
          </Link>
        </Button>

        {/* Save Indicator */}
        {isSaving && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>جاري الحفظ...</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <Card className="p-6">
        <WizardProgress
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={setCurrentStep}
          canNavigateToStep={canNavigateToStep}
        />
      </Card>

      {/* Current Step Content */}
      <div className="pb-8">{renderStep()}</div>
    </div>
  );
}
