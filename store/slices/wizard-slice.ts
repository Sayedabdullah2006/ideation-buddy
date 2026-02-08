/**
 * Wizard State Slice (Zustand)
 * Manages wizard navigation and current step
 */

import { StateCreator } from 'zustand';

export type WizardStep = 'empathize' | 'personas' | 'define' | 'ideate' | 'prototype' | 'validate' | 'architecture' | 'mockup';

export interface WizardSlice {
  // Current state
  currentStep: WizardStep;
  completedSteps: WizardStep[];
  isNavigating: boolean;

  // Navigation actions
  setCurrentStep: (step: WizardStep) => void;
  markStepCompleted: (step: WizardStep) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  canNavigateToStep: (step: WizardStep) => boolean;
  resetWizard: () => void;
}

const STEP_ORDER: WizardStep[] = ['empathize', 'personas', 'define', 'ideate', 'prototype', 'validate', 'architecture', 'mockup'];

export const createWizardSlice: StateCreator<WizardSlice> = (set, get) => ({
  // Initial state
  currentStep: 'empathize',
  completedSteps: [],
  isNavigating: false,

  // Set current step
  setCurrentStep: (step) => {
    set({ currentStep: step });
  },

  // Mark step as completed
  markStepCompleted: (step) => {
    set((state) => {
      if (state.completedSteps.includes(step)) {
        return state;
      }
      return {
        completedSteps: [...state.completedSteps, step],
      };
    });
  },

  // Navigate to next step
  goToNextStep: () => {
    const { currentStep, completedSteps } = get();
    const currentIndex = STEP_ORDER.indexOf(currentStep);

    if (currentIndex < STEP_ORDER.length - 1) {
      const nextStep = STEP_ORDER[currentIndex + 1];
      set({
        currentStep: nextStep,
        completedSteps: completedSteps.includes(currentStep)
          ? completedSteps
          : [...completedSteps, currentStep],
      });
    }
  },

  // Navigate to previous step
  goToPreviousStep: () => {
    const { currentStep } = get();
    const currentIndex = STEP_ORDER.indexOf(currentStep);

    if (currentIndex > 0) {
      const previousStep = STEP_ORDER[currentIndex - 1];
      set({ currentStep: previousStep });
    }
  },

  // Check if can navigate to step
  canNavigateToStep: (step) => {
    const { completedSteps } = get();
    const stepIndex = STEP_ORDER.indexOf(step);

    // Can always go to first step
    if (stepIndex === 0) return true;

    // Can navigate if previous step is completed
    const previousStep = STEP_ORDER[stepIndex - 1];
    return completedSteps.includes(previousStep);
  },

  // Reset wizard to initial state
  resetWizard: () => {
    set({
      currentStep: 'empathize',
      completedSteps: [],
      isNavigating: false,
    });
  },
});
