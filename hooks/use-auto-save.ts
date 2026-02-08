/**
 * Auto-Save Hook
 * Debounced auto-save for wizard forms
 */

import { useEffect, useRef, useCallback } from 'react';
import { useUpdateProject } from './use-projects';
import { useProjectState, useProjectActions } from '@/store';

interface UseAutoSaveOptions {
  projectId: string | null;
  debounceMs?: number;
  enabled?: boolean;
}

export function useAutoSave({
  projectId,
  debounceMs = 2000,
  enabled = true,
}: UseAutoSaveOptions) {
  const { project, isDirty } = useProjectState();
  const { markSaved, setIsSaving } = useProjectActions();
  const updateProject = useUpdateProject(projectId || '');

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const saveProject = useCallback(async () => {
    if (!projectId || !project || !isDirty) return;

    try {
      setIsSaving(true);

      await updateProject.mutateAsync({
        title: project.title,
        description: project.description,
        status: project.status,
        rawIdea: project.rawIdea,
        personas: project.personas,
        selectedPersona: project.selectedPersona,
        problemStatement: project.problemStatement,
        solutions: project.solutions,
        selectedSolution: project.selectedSolution,
        businessModel: project.businessModel,
        mvpFeatures: project.mvpFeatures,
        mvpSpec: project.mvpSpec,
      });

      markSaved();
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  }, [projectId, project, isDirty, updateProject, markSaved, setIsSaving]);

  // Debounced auto-save effect
  useEffect(() => {
    if (!enabled || !isDirty || !projectId) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      saveProject();
    }, debounceMs);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [project, isDirty, enabled, projectId, debounceMs, saveProject]);

  // Manual save function
  const manualSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    return saveProject();
  }, [saveProject]);

  return {
    manualSave,
    isSaving: updateProject.isPending,
    isDirty,
  };
}
