/**
 * Zustand Store
 * Combines wizard and project slices
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { WizardSlice, createWizardSlice } from './slices/wizard-slice';
import { ProjectSlice, createProjectSlice } from './slices/project-slice';

// Combined store type
type StoreState = WizardSlice & ProjectSlice;

// Create store with persistence for wizard state only
export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createWizardSlice(...a),
        ...createProjectSlice(...a),
      }),
      {
        name: 'ideaflow-store',
        // Only persist wizard navigation state
        partialize: (state) => ({
          currentStep: state.currentStep,
          completedSteps: state.completedSteps,
        }),
        // Skip hydration on server to prevent SSR mismatch
        skipHydration: true,
      }
    ),
    { name: 'IdeaFlow Store' }
  )
);

// Selector hooks for better performance (using useShallow for SSR compatibility)
export const useWizardState = () =>
  useStore(
    useShallow((state) => ({
      currentStep: state.currentStep,
      completedSteps: state.completedSteps,
      isNavigating: state.isNavigating,
    }))
  );

export const useWizardActions = () =>
  useStore(
    useShallow((state) => ({
      setCurrentStep: state.setCurrentStep,
      markStepCompleted: state.markStepCompleted,
      goToNextStep: state.goToNextStep,
      goToPreviousStep: state.goToPreviousStep,
      canNavigateToStep: state.canNavigateToStep,
      resetWizard: state.resetWizard,
    }))
  );

export const useProjectState = () =>
  useStore(
    useShallow((state) => ({
      project: state.project,
      isDirty: state.isDirty,
      isSaving: state.isSaving,
      lastSaved: state.lastSaved,
    }))
  );

export const useProjectActions = () =>
  useStore(
    useShallow((state) => ({
      setProject: state.setProject,
      updateProject: state.updateProject,
      clearProject: state.clearProject,
      setIsSaving: state.setIsSaving,
      markSaved: state.markSaved,
      markDirty: state.markDirty,
      updateField: state.updateField,
    }))
  );
