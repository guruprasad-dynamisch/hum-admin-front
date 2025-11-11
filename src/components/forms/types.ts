/**
 * Type definitions for DynamicForm component
 * 
 * This file re-exports all types from DynamicForm for easier imports
 * and provides additional utility types.
 */

export type {
  FieldType,
  BaseFieldConfig,
  TextFieldConfig,
  PhoneFieldConfig,
  TextAreaFieldConfig,
  CheckboxFieldConfig,
  SelectFieldConfig,
  DateFieldConfig,
  GroupFieldConfig,
  FieldConfig,
  DynamicFormProps,
  DynamicFormPropsWithHookForm,
  DynamicFormPropsStandalone,
} from './DynamicForm';

/**
 * Utility type to extract form data type from field config
 */
export type FormDataFromFields<T extends readonly { name: string; type: string }[]> = {
  [K in T[number]['name']]: unknown;
};

/**
 * Utility type for field change handler
 */
export type FieldChangeHandler = (name: string, value: unknown) => void;

/**
 * Utility type for form submit handler
 */
export type FormSubmitHandler<T = Record<string, unknown>> = (data: T) => void | Promise<void>;

/**
 * Utility type for form errors
 */
export type FormErrors = Record<string, string>;

/**
 * Utility type for form values
 */
export type FormValues = Record<string, unknown>;
