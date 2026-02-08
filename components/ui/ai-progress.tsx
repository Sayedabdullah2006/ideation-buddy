'use client';

/**
 * AI Generation Progress Indicator
 * Shows a simulated progress bar with percentage and step descriptions
 * during AI generation processes.
 */

import { useEffect, useState, useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

interface AIProgressProps {
  /** Whether the generation is currently in progress */
  isActive: boolean;
  /** Estimated duration in seconds (used to pace the simulation) */
  estimatedDuration?: number;
  /** Step descriptions to cycle through during generation */
  steps?: string[];
  /** Label shown above the progress bar */
  label?: string;
}

const DEFAULT_STEPS = [
  'تحليل البيانات...',
  'توليد المحتوى بالذكاء الاصطناعي...',
  'معالجة النتائج...',
  'التحقق من الجودة...',
  'إنهاء العملية...',
];

export function AIProgress({
  isActive,
  estimatedDuration = 15,
  steps = DEFAULT_STEPS,
  label = 'جاري التوليد',
}: AIProgressProps) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isActive) {
      setProgress(0);
      setCurrentStepIndex(0);
      startTimeRef.current = Date.now();

      // Progress simulation: fast at start, slows down approaching 90%
      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const estimatedProgress = Math.min(
          // Use an easing curve: fast start, slow near end, cap at 92%
          92,
          (1 - Math.exp(-2.5 * elapsed / estimatedDuration)) * 95
        );

        setProgress(Math.round(estimatedProgress));

        // Update step description based on progress
        const stepIndex = Math.min(
          steps.length - 1,
          Math.floor((estimatedProgress / 92) * steps.length)
        );
        setCurrentStepIndex(stepIndex);
      }, 200);
    } else {
      // When generation completes, animate to 100%
      if (progress > 0 && progress < 100) {
        setProgress(100);
        setCurrentStepIndex(steps.length - 1);
        // Reset after showing 100% briefly
        const timeout = setTimeout(() => {
          setProgress(0);
          setCurrentStepIndex(0);
        }, 800);
        return () => clearTimeout(timeout);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, estimatedDuration, steps.length]);

  if (!isActive && progress === 0) return null;

  return (
    <div className="w-full space-y-2 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span>{label}</span>
        </div>
        <span className="font-semibold text-primary tabular-nums">
          {progress}%
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground text-center">
        {steps[currentStepIndex]}
      </p>
    </div>
  );
}
