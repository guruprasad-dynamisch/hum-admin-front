import { z } from "zod";
import { stringValidations, passwordConfirmation } from "./common-validations";

export const phoneSchema = z.object({
    phone: stringValidations.phone()
});

export const otpSchema = z.object({
    code: stringValidations.code()
});

export const registerSchema = z.object({
    fullName: stringValidations.fullName(),
    phone: stringValidations.phone(),
    email: stringValidations.email(),
    organizationName: stringValidations.organizationName(),
}).and(passwordConfirmation());

// Type inference for TypeScript
export type PhoneFormData = z.infer<typeof phoneSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
