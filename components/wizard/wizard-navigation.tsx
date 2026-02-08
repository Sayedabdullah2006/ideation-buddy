'use client';

/**
 * Wizard Navigation Controls
 * Previous/Next buttons for wizard steps
 */

import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Save } from 'lucide-react';
import { WizardStep } from '@/store/slices/wizard-slice';

interface WizardNavigationProps {
  currentStep: WizardStep;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSave?: () => void;
  isSaving?: boolean;
  isLastStep?: boolean;
}

export default function WizardNavigation({
  currentStep,
  canGoNext,
  canGoPrevious,
  onPrevious,
  onNext,
  onSave,
  isSaving = false,
  isLastStep = false,
}: WizardNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-4 pt-6 border-t">
      {/* Previous Button */}
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={onPrevious}
        disabled={!canGoPrevious || isSaving}
      >
        <ArrowRight className="ml-2 h-5 w-5" />
        السابق
      </Button>

      <div className="flex items-center gap-3">
        {/* Save Button (optional) */}
        {onSave && (
          <Button
            type="button"
            variant="outline"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Save className="ml-2 h-4 w-4 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="ml-2 h-4 w-4" />
                حفظ
              </>
            )}
          </Button>
        )}

        {/* Next Button */}
        <Button
          type="submit"
          size="lg"
          disabled={!canGoNext || isSaving}
        >
          {isLastStep ? 'إنهاء' : 'التالي'}
          <ArrowLeft className="mr-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
