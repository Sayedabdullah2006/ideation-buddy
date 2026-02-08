'use client';

/**
 * Wizard Progress Component
 * Shows Design Thinking steps with progress indicator
 */

import { cn } from '@/lib/utils/cn';
import { CheckCircle2, Circle } from 'lucide-react';
import { WizardStep } from '@/store/slices/wizard-slice';

interface Step {
  id: WizardStep;
  name: string;
  nameEn: string;
  order: number;
}

const STEPS: Step[] = [
  { id: 'empathize', name: 'تعاطف', nameEn: 'Empathize', order: 1 },
  { id: 'personas', name: 'شخصيات', nameEn: 'Personas', order: 2 },
  { id: 'define', name: 'حدد', nameEn: 'Define', order: 3 },
  { id: 'ideate', name: 'ابتكر', nameEn: 'Ideate', order: 4 },
  { id: 'prototype', name: 'نموذج', nameEn: 'Prototype', order: 5 },
  { id: 'validate', name: 'تحقق', nameEn: 'Validate', order: 6 },
  { id: 'architecture', name: 'معمارية', nameEn: 'Architecture', order: 7 },
  { id: 'mockup', name: 'شاشات', nameEn: 'Mockup', order: 8 },
];

interface WizardProgressProps {
  currentStep: WizardStep;
  completedSteps: WizardStep[];
  onStepClick?: (step: WizardStep) => void;
  canNavigateToStep?: (step: WizardStep) => boolean;
}

export default function WizardProgress({
  currentStep,
  completedSteps,
  onStepClick,
  canNavigateToStep,
}: WizardProgressProps) {
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="w-full">
      {/* Desktop Progress Bar */}
      <div className="hidden md:flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const canNavigate = canNavigateToStep ? canNavigateToStep(step.id) : true;
          const isClickable = canNavigate && onStepClick && !isCurrent;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    'relative flex items-center justify-center w-12 h-12 rounded-full transition-all',
                    isCurrent &&
                      'bg-primary text-primary-foreground shadow-lg scale-110',
                    isCompleted &&
                      !isCurrent &&
                      'bg-primary/20 text-primary',
                    !isCurrent &&
                      !isCompleted &&
                      'bg-muted text-muted-foreground',
                    isClickable && 'hover:scale-105 cursor-pointer',
                    !isClickable && !isCurrent && 'cursor-not-allowed opacity-50'
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Circle
                      className={cn(
                        'w-6 h-6',
                        isCurrent && 'fill-current'
                      )}
                    />
                  )}
                  {isCurrent && (
                    <span className="absolute -top-1 -left-1 w-14 h-14 border-4 border-primary rounded-full animate-pulse opacity-30" />
                  )}
                </button>

                {/* Step Labels */}
                <div className="mt-3 text-center">
                  <p
                    className={cn(
                      'text-sm font-semibold',
                      isCurrent && 'text-primary',
                      !isCurrent && 'text-muted-foreground'
                    )}
                  >
                    {step.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {step.nameEn}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-4 rounded-full transition-colors',
                    index < currentStepIndex
                      ? 'bg-primary'
                      : 'bg-muted'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-lg font-bold">
              {STEPS[currentStepIndex].name}
            </p>
            <p className="text-sm text-muted-foreground">
              {STEPS[currentStepIndex].nameEn}
            </p>
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            {currentStepIndex + 1} / {STEPS.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="absolute top-0 right-0 h-full bg-primary transition-all duration-300"
            style={{
              width: `${((currentStepIndex + 1) / STEPS.length) * 100}%`,
            }}
          />
        </div>

        {/* Step Dots */}
        <div className="flex justify-between mt-2">
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() =>
                canNavigateToStep &&
                canNavigateToStep(step.id) &&
                onStepClick &&
                onStepClick(step.id)
              }
              disabled={
                !canNavigateToStep ||
                !canNavigateToStep(step.id) ||
                step.id === currentStep
              }
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index <= currentStepIndex
                  ? 'bg-primary'
                  : 'bg-muted',
                canNavigateToStep &&
                  canNavigateToStep(step.id) &&
                  step.id !== currentStep &&
                  'hover:scale-150 cursor-pointer'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
