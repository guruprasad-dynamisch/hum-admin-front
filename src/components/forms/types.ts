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
  [K in T[number]['name']]: any;
};

/**
 * Utility type for field change handler
 */
export type FieldChangeHandler = (name: string, value: any) => void;

/**
 * Utility type for form submit handler
 */
export type FormSubmitHandler<T = any> = (data: T) => void | Promise<void>;

/**
 * Utility type for form errors
 */
export type FormErrors = Record<string, string>;

/**
 * Utility type for form values
 */
export type FormValues = Record<string, any>;
