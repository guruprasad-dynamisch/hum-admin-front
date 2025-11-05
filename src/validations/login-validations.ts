import { z } from "zod";
import { stringValidations } from "./common-validations";
import { VALIDATION_MESSAGE } from "@constants/message-constants";

export const loginSchema = z.object({
  identifier: z.string()
    .min(1, VALIDATION_MESSAGE.required("Email or phone number"))
    .refine(
      (value) => {
        // Check if it's a valid email or phone number
        const emailResult = z.string().email().safeParse(value);
        if (emailResult.success) return true;

        // Check if it's a valid phone number
        try {
          const phoneResult = stringValidations.phone().safeParse(value);
          return phoneResult.success;
        } catch {
          return false;
        }
      },
      {
        message: "Please enter a valid email or phone number",
      }
    ),
  password: z.string().min(1, VALIDATION_MESSAGE.required("Password")),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: stringValidations.email(),
});

export const resetPasswordSchema = z.object({
  password: stringValidations.password(),
  confirmPassword: z.string().min(1, VALIDATION_MESSAGE.required('Confirm password'))
}).refine((data) => data.password === data.confirmPassword, {
  message: VALIDATION_MESSAGE.passwordMatch,
  path: ['confirmPassword']
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
