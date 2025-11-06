import { z } from "zod";
import { stringValidations } from "./common-validations";

/**
 * Phone verification schema
 */
export const phoneSchema = z.object({
    phone: stringValidations.phone()
});

/**
 * OTP verification schema
 */
export const otpSchema = z.object({
    code: stringValidations.code()
});

/**
 * Registration form schema with production-level validations
 */
export const registerSchema = z.object({
    fullName: stringValidations.fullName('Full name'),
    
    email: stringValidations.email('Email'),
    
    phone: stringValidations.phone('Phone number'),
    
    organization: stringValidations.organizationName('Organization'),
    
    role: z.string().optional(),
    
    password: stringValidations.password('Password'),
    
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions to continue",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Type inference for TypeScript
export type PhoneFormData = z.infer<typeof phoneSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
