import { z } from "zod";
import { stringValidations } from "./common-validations";

/**
 * Forgot password schema - for requesting password reset
 */
export const forgotPasswordSchema = z.object({
    email: stringValidations.email('Email'),
});

/**
 * Reset password schema - for setting new password
 */
export const resetPasswordSchema = z.object({
    password: stringValidations.password('Password'),
    
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Type inference for TypeScript
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
