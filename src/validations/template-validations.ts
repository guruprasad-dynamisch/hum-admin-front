import { z } from 'zod'
import { VALIDATION_MESSAGE } from '@constants/message-constants'

/**
 * Template form validation schema
 */
export const templateSchema = z.object({
  name: z.string()
    .min(1, VALIDATION_MESSAGE.required('Template name'))
    .min(3, VALIDATION_MESSAGE.minLength('Template name', 3))
    .max(100, VALIDATION_MESSAGE.maxLength('Template name', 100)),
  
  description: z.string()
    .min(1, VALIDATION_MESSAGE.required('Description'))
    .min(10, VALIDATION_MESSAGE.minLength('Description', 10))
    .max(500, VALIDATION_MESSAGE.maxLength('Description', 500)),
  
  department: z.enum(['Sales', 'Marketing', 'Support', 'Product', 'Engineering'], {
    required_error: VALIDATION_MESSAGE.required('Department'),
    invalid_type_error: 'Please select a valid department'
  }),
  
  tags: z.string()
    .min(1, VALIDATION_MESSAGE.required('Tags'))
    .refine(
      (val) => val.split(',').filter(t => t.trim()).length > 0,
      'Please enter at least one tag'
    ),
  
  content: z.string()
    .min(1, VALIDATION_MESSAGE.required('Template content'))
    .min(20, VALIDATION_MESSAGE.minLength('Template content', 20))
})

export type TemplateFormData = z.infer<typeof templateSchema>

/**
 * Default values for template form
 */
export const templateDefaultValues: Partial<TemplateFormData> = {
  name: '',
  description: '',
  department: 'Sales',
  tags: '',
  content: ''
}
