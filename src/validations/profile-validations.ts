import { z } from "zod";
import { stringValidations } from "./common-validations";

export const profileSchema = z.object({
  fullName: stringValidations.fullName(),
  email: stringValidations.email(),
  phoneNumber: stringValidations.phone(),
  organizationName: stringValidations.organizationName(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
