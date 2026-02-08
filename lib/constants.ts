/**
 * Application Constants
 */

export const APP_NAME = 'IdeaFlow AI';
export const APP_DESCRIPTION = 'Design Thinking MVP Generator';

// Design Thinking Steps
export const WIZARD_STEPS = [
  { id: 'empathize', name: 'تعاطف', nameEn: 'Empathize', order: 1 },
  { id: 'define', name: 'حدد', nameEn: 'Define', order: 2 },
  { id: 'ideate', name: 'ابتكر', nameEn: 'Ideate', order: 3 },
  { id: 'prototype', name: 'نموذج', nameEn: 'Prototype', order: 4 },
  { id: 'validate', name: 'تحقق', nameEn: 'Validate', order: 5 },
] as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

// Project Status
export const PROJECT_STATUS = {
  DRAFT: 'DRAFT',
  EMPATHIZE: 'EMPATHIZE',
  DEFINE: 'DEFINE',
  IDEATE: 'IDEATE',
  PROTOTYPE: 'PROTOTYPE',
  VALIDATE: 'VALIDATE',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
} as const;

// AI Configuration
export const AI_CONFIG = {
  MAX_TOKENS: 4000,
  TEMPERATURE: 0.7,
  RATE_LIMIT_PER_USER: parseInt(process.env.AI_RATE_LIMIT_PER_USER || '50', 10),
  RATE_LIMIT_WINDOW: parseInt(process.env.AI_RATE_LIMIT_WINDOW || '86400', 10),
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  ISO: "yyyy-MM-dd'T'HH:mm:ss",
} as const;
