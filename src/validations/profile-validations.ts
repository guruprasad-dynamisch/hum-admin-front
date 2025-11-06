import { z } from "zod";
import { stringValidations } from "./common-validations";

export const profileSchema = z.object({
  fullName: stringValidations.fullName(),
  email: stringValidations.email(),
  phoneNumber: stringValidations.phone(),
  organizationName: stringValidations.organizationName(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// Personal Information Schema for Settings
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: stringValidations.phone(),
  organization: z.string().min(1, 'Organization is required'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().optional()
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
