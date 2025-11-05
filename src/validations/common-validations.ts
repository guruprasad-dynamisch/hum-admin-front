import { z } from "zod";
import { VALIDATION_MESSAGE } from "@constants/message-constants";
import { isValidPhoneNumber } from 'libphonenumber-js/core';
import metadata from 'libphonenumber-js/metadata.min.json';

export const stringValidations = {
    required: (fieldName: string) =>
        z.string().min(1, VALIDATION_MESSAGE.required(fieldName)),

    minLength: (min: number, message?: string) =>
        z.string().min(min, message || `Must be at least ${min} characters`),

    maxLength: (max: number, message?: string) =>
        z.string().max(max, message || `Must be at most ${max} characters`),

    length: (exact: number, message?: string) =>
        z.string().length(exact, message || `Must be exactly ${exact} characters`),

    email: (fieldName: string = 'Email') =>
        z.string()
            .min(1, VALIDATION_MESSAGE.required(fieldName))
            .email(VALIDATION_MESSAGE.invalid(fieldName.toLowerCase())),

    phone: (fieldName: string = 'Phone number') =>
        z.string()
            .min(1, VALIDATION_MESSAGE.required(fieldName))
            .refine(
                (value) => {
                    if (!value) return false;
                    try {
                        return isValidPhoneNumber(value, metadata);
                    } catch {
                        return false;
                    }
                },
                { message: VALIDATION_MESSAGE.invalid(fieldName.toLowerCase()) }
            ),

    code: (fieldName: string = 'Code') =>
        z.string()
            .min(1, VALIDATION_MESSAGE.required(fieldName))
            .length(6, VALIDATION_MESSAGE.otpLength(6))
            .regex(/^\d{6}$/, VALIDATION_MESSAGE.otpNumbersOnly),

    fullName: (fieldName: string = 'Full name') =>
        z.string()
            .min(1, VALIDATION_MESSAGE.required(fieldName))
            .min(2, VALIDATION_MESSAGE.minLength('Name', 2))
            .max(50, VALIDATION_MESSAGE.maxLength('Name', 50))
            .regex(/^[\p{L}\s'-\.]+$/u, VALIDATION_MESSAGE.lettersOnly('Name')),

    organizationName: (fieldName: string = 'Organization name') =>
        z.string()
            .min(1, VALIDATION_MESSAGE.required(fieldName))
            .min(2, VALIDATION_MESSAGE.minLength('Organization name', 2))
            .max(100, VALIDATION_MESSAGE.maxLength('Organization name', 100)),

    password: (fieldName: string = 'Password') =>
        z.string()
            .min(1, VALIDATION_MESSAGE.required(fieldName))
            .min(8, VALIDATION_MESSAGE.passwordMinLength(8))
            .regex(/[A-Z]/, VALIDATION_MESSAGE.passwordUppercase)
            .regex(/[a-z]/, VALIDATION_MESSAGE.passwordLowercase)
            .regex(/[0-9]/, VALIDATION_MESSAGE.passwordNumber)
            .regex(/[^A-Za-z0-9]/, VALIDATION_MESSAGE.passwordSpecialChar),
};

// Password confirmation validation
export const passwordConfirmation = (passwordField: string = 'password') =>
    z.object({
        [passwordField]: stringValidations.password(),
        confirmPassword: z.string().min(1, VALIDATION_MESSAGE.required('Confirm password'))
    }).refine((data) => data[passwordField] === data.confirmPassword, {
        message: VALIDATION_MESSAGE.passwordMatch,
        path: ['confirmPassword']
    });