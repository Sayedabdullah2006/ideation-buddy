/**
 * Project State Slice (Zustand)
 * Manages current project data and form state
 */

import { StateCreator } from 'zustand';
import { ProjectStatus } from '@prisma/client';

export interface ProjectData {
  id?: string;
  title: string;
  description: string;
  status: ProjectStatus;
  rawIdea?: string;
  personas?: any;
  selectedPersona?: any;
  problemStatement?: string;
  solutions?: any;
  selectedSolution?: any;
  businessModel?: any;
  mvpFeatures?: any;
  mvpSpec?: any;
  mvpMarkdown?: string;
  mockupData?: any;
  architectureData?: any;
}

export interface ProjectSlice {
  // Current project
  project: ProjectData | null;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;

  // Project actions
  setProject: (project: ProjectData) => void;
  updateProject: (updates: Partial<ProjectData>) => void;
  clearProject: () => void;

  // Save state
  setIsSaving: (isSaving: boolean) => void;
  markSaved: () => void;
  markDirty: () => void;

  // Field updates (for auto-save)
  updateField: (field: keyof ProjectData, value: any) => void;
}

const initialProject: ProjectData = {
  title: '',
  description: '',
  status: 'DRAFT',
};

export const createProjectSlice: StateCreator<ProjectSlice> = (set) => ({
  // Initial state
  project: null,
  isDirty: false,
  isSaving: false,
  lastSaved: null,

  // Set entire project
  setProject: (project) => {
    set({
      project,
      isDirty: false,
      lastSaved: new Date(),
    });
  },

  // Update project fields
  updateProject: (updates) => {
    set((state) => ({
      project: state.project
        ? { ...state.project, ...updates }
        : { ...initialProject, ...updates },
      isDirty: true,
    }));
  },

  // Clear project (reset to initial)
  clearProject: () => {
    set({
      project: null,
      isDirty: false,
      isSaving: false,
      lastSaved: null,
    });
  },

  // Set saving state
  setIsSaving: (isSaving) => {
    set({ isSaving });
  },

  // Mark as saved
  markSaved: () => {
    set({
      isDirty: false,
      lastSaved: new Date(),
    });
  },

  // Mark as dirty (unsaved changes)
  markDirty: () => {
    set({ isDirty: true });
  },

  // Update single field
  updateField: (field, value) => {
    set((state) => ({
      project: state.project
        ? { ...state.project, [field]: value }
        : { ...initialProject, [field]: value },
      isDirty: true,
    }));
  },
});
