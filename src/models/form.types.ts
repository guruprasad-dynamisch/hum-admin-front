import { z } from 'zod';
import { loginSchema, forgotPasswordSchema, resetPasswordSchema } from '@validations/login-validations';
import { phoneSchema, otpSchema, registerSchema } from '@validations/register-validations';
import { profileSchema, personalInfoSchema } from '@validations/profile-validations';
import { userSchema } from '@validations/user-validations';
import { templateSchema } from '@validations/template-validations';

// Login and Password Related Forms
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Registration Forms
export type PhoneFormData = z.infer<typeof phoneSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// Profile Forms
export type ProfileFormData = z.infer<typeof profileSchema>;
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

// User Management Forms
export type UserFormData = z.infer<typeof userSchema>;

// Template Forms
export type TemplateFormData = z.infer<typeof templateSchema>;

// Common form types
export type FormErrors = Record<string, string>;
export type FormValues = Record<string, any>;
export type FormChangeHandler = (name: string, value: any) => void;
export type FormSubmitHandler<T = any> = (data: T) => void | Promise<void>;