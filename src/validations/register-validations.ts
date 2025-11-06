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
    firstName: stringValidations.required('First name')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must not exceed 50 characters')
        .regex(/^[\p{L}\s'-\.]+$/u, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
    
    lastName: stringValidations.required('Last name')
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must not exceed 50 characters')
        .regex(/^[\p{L}\s'-\.]+$/u, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
    
    email: stringValidations.email('Email'),
    
    phone: stringValidations.phone('Phone number'),
    
    organization: stringValidations.organizationName('Organization'),
    
    role: z.string().optional(),
    
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions to continue",
    }),
});

// Type inference for TypeScript
export type PhoneFormData = z.infer<typeof phoneSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
