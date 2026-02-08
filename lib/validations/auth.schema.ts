/**
 * Authentication Validation Schemas
 * Using Zod for runtime validation
 */

import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'البريد الإلكتروني مطلوب' })
    .email({ message: 'البريد الإلكتروني غير صالح' }),
  password: z
    .string()
    .min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' }),
});

// Register Schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
    .max(50, { message: 'الاسم طويل جداً' }),
  email: z
    .string()
    .min(1, { message: 'البريد الإلكتروني مطلوب' })
    .email({ message: 'البريد الإلكتروني غير صالح' }),
  password: z
    .string()
    .min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' })
    .max(100, { message: 'كلمة المرور طويلة جداً' })
    .regex(/[A-Za-z]/, { message: 'كلمة المرور يجب أن تحتوي على حرف واحد على الأقل' })
    .regex(/[0-9]/, { message: 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

// Update Profile Schema
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
    .max(50, { message: 'الاسم طويل جداً' })
    .optional(),
  avatar: z.string().url({ message: 'رابط الصورة غير صالح' }).optional(),
});

// Change Password Schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'كلمة المرور الحالية مطلوبة' }),
  newPassword: z
    .string()
    .min(6, { message: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل' })
    .max(100, { message: 'كلمة المرور طويلة جداً' })
    .regex(/[A-Za-z]/, { message: 'كلمة المرور يجب أن تحتوي على حرف واحد على الأقل' })
    .regex(/[0-9]/, { message: 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل' }),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmNewPassword'],
});

// Register API Schema (server-side only; confirmPassword is validated client-side)
export const registerApiSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
    .max(50, { message: 'الاسم طويل جداً' }),
  email: z
    .string()
    .min(1, { message: 'البريد الإلكتروني مطلوب' })
    .email({ message: 'البريد الإلكتروني غير صالح' }),
  password: z
    .string()
    .min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' })
    .max(100, { message: 'كلمة المرور طويلة جداً' })
    .regex(/[A-Za-z]/, { message: 'كلمة المرور يجب أن تحتوي على حرف واحد على الأقل' })
    .regex(/[0-9]/, { message: 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل' }),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterApiInput = z.infer<typeof registerApiSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
