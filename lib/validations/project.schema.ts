/**
 * Project Validation Schemas
 * Zod schemas for project forms
 */

import { z } from 'zod';

// Step 1: Empathize - Raw Idea
export const empathizeSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'العنوان يجب أن يكون 3 أحرف على الأقل' })
    .max(100, { message: 'العنوان طويل جداً (100 حرف كحد أقصى)' }),
  description: z
    .string()
    .min(10, { message: 'الوصف يجب أن يكون 10 أحرف على الأقل' })
    .max(1000, { message: 'الوصف طويل جداً (1000 حرف كحد أقصى)' }),
  rawIdea: z
    .string()
    .min(20, { message: 'الفكرة يجب أن تكون 20 حرف على الأقل' })
    .max(2000, { message: 'الفكرة طويلة جداً (2000 حرف كحد أقصى)' }),
});

// Step 2: Define - Problem Statement
export const defineSchema = z.object({
  problemStatement: z
    .string()
    .min(20, { message: 'بيان المشكلة يجب أن يكون 20 حرف على الأقل' })
    .max(500, { message: 'بيان المشكلة طويل جداً' }),
  selectedPersona: z.any().optional(),
});

// Step 3: Ideate - Solutions
export const ideateSchema = z.object({
  solutions: z.array(z.any()).optional(),
  selectedSolution: z.any().optional(),
});

// Step 4: Prototype - Business Model
export const prototypeSchema = z.object({
  businessModel: z.any().optional(),
  mvpFeatures: z.any().optional(),
});

// Step 5: Validate - MVP Spec
export const validateSchema = z.object({
  mvpSpec: z.any().optional(),
});

// Create Project Schema
export const createProjectSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'العنوان يجب أن يكون 3 أحرف على الأقل' })
    .max(100, { message: 'العنوان طويل جداً' }),
  description: z
    .string()
    .min(10, { message: 'الوصف يجب أن يكون 10 أحرف على الأقل' })
    .max(1000, { message: 'الوصف طويل جداً' }),
});

// Update Project Schema
export const updateProjectSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().min(10).max(1000).optional(),
  status: z.enum([
    'DRAFT',
    'EMPATHIZE',
    'PERSONAS',
    'DEFINE',
    'IDEATE',
    'PROTOTYPE',
    'VALIDATE',
    'ARCHITECTURE',
    'MOCKUP',
    'COMPLETED',
    'ARCHIVED',
  ]).optional(),
  rawIdea: z.string().optional(),
  personas: z.any().optional(),
  selectedPersona: z.any().optional(),
  problemStatement: z.string().optional(),
  solutions: z.any().optional(),
  selectedSolution: z.any().optional(),
  businessModel: z.any().optional(),
  mvpFeatures: z.any().optional(),
  mvpSpec: z.any().optional(),
  mvpMarkdown: z.string().optional(),
  mockupData: z.any().optional(),
});

// Type exports
export type EmpathizeInput = z.infer<typeof empathizeSchema>;
export type DefineInput = z.infer<typeof defineSchema>;
export type IdeateInput = z.infer<typeof ideateSchema>;
export type PrototypeInput = z.infer<typeof prototypeSchema>;
export type ValidateInput = z.infer<typeof validateSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
