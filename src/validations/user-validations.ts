import { z } from 'zod'
import { stringValidations } from './common-validations'
import { VALIDATION_MESSAGE } from '@constants/message-constants'

/**
 * User form validation schema
 */
export const userSchema = z.object({
  firstName: z.string()
    .min(1, VALIDATION_MESSAGE.required('First name'))
    .min(2, VALIDATION_MESSAGE.minLength('First name', 2))
    .max(50, VALIDATION_MESSAGE.maxLength('First name', 50))
    .regex(/^[\p{L}\s'-\.]+$/u, VALIDATION_MESSAGE.lettersOnly('First name')),
  
  lastName: z.string()
    .min(1, VALIDATION_MESSAGE.required('Last name'))
    .min(2, VALIDATION_MESSAGE.minLength('Last name', 2))
    .max(50, VALIDATION_MESSAGE.maxLength('Last name', 50))
    .regex(/^[\p{L}\s'-\.]+$/u, VALIDATION_MESSAGE.lettersOnly('Last name')),
  
  email: stringValidations.email('Email'),
  
  phone: stringValidations.phone('Phone number'),
  
  role: z.enum(['admin', 'user'], {
    required_error: VALIDATION_MESSAGE.required('Role'),
    invalid_type_error: 'Please select a valid role'
  }),
  
  organization: z.string()
    .min(1, VALIDATION_MESSAGE.required('Organization'))
    .min(2, VALIDATION_MESSAGE.minLength('Organization', 2))
    .max(100, VALIDATION_MESSAGE.maxLength('Organization', 100)),
  
  status: z.enum(['active', 'inactive'])
})

export type UserFormData = z.infer<typeof userSchema>

/**
 * Default values for user form
 */
export const userDefaultValues: Partial<UserFormData> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'user',
  organization: '',
  status: 'active'
}
