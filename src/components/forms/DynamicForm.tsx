import React from 'react'
import { useForm, Control, FieldValues, UseFormReturn, FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@utils/classNames'
import FieldRenderer from './FieldRenderer'
import FormActions from './FormActions'
import '@styles/components/dynamic-form.scss'

// Constants
const FIELD_SPACING_MULTIPLIER = 8; // Converts spacing units to pixels (8px per unit)

/**
 * Field configuration types
 */
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel' 
  | 'url' 
  | 'search'
  | 'phone'
  | 'textarea'
  | 'checkbox'
  | 'select'
  | 'dropdown'
  | 'date'
  | 'group';

/**
 * Base field configuration
 */
export interface BaseFieldConfig {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultValue?: any;
  helperText?: string;
  /** Grid column span (1-12). Can be a number or an object with breakpoint-specific values. Default: 12 (full width) */
  colSpan?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}

/**
 * Text-based field configuration
 */
export interface TextFieldConfig extends BaseFieldConfig {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
}

/**
 * Phone field configuration
 */
export interface PhoneFieldConfig extends BaseFieldConfig {
  type: 'phone';
  defaultCountry?: string;
}

/**
 * TextArea field configuration
 */
export interface TextAreaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
  rows?: number;
  maxLength?: number;
  helperText?: string;
}

/**
 * Checkbox field configuration (future)
 */
export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox';
  checkboxLabel?: string;
}

/**
 * Select/Dropdown field configuration (future)
 */
export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select' | 'dropdown';
  options: Array<{ label: string; value: any }>;
  multiple?: boolean;
}

/**
 * Date field configuration (future)
 */
export interface DateFieldConfig extends BaseFieldConfig {
  type: 'date';
  minDate?: Date;
  maxDate?: Date;
}

/**
 * Group field configuration (future) - for nested field groups
 */
export interface GroupFieldConfig extends BaseFieldConfig {
  type: 'group';
  fields: FieldConfig[];
}

/**
 * Union type for all field configurations
 */
export type FieldConfig = 
  | TextFieldConfig 
  | PhoneFieldConfig 
  | TextAreaFieldConfig
  | CheckboxFieldConfig 
  | SelectFieldConfig 
  | DateFieldConfig 
  | GroupFieldConfig;

/**
 * DynamicForm props for react-hook-form mode
 */
export interface DynamicFormPropsWithHookForm<T extends FieldValues = any> {
  mode: 'react-hook-form';
  fields: FieldConfig[];
  schema: z.ZodType<T>;
  onSubmit: (data: T) => void | Promise<void>;
  defaultValues?: Partial<T>;
  submitButtonText?: string;
  showSubmitButton?: boolean;
  submitButtonSize?: 'small' | 'medium' | 'large';
  cancelButtonText?: string;
  showCancelButton?: boolean;
  onCancel?: () => void;
  formClassName?: string;
  /** Custom class names for the form actions container */
  formActionsClassName?: string;
  /** Alignment of the form action buttons: 'start', 'center', 'end', 'between', 'around' */
  formActionsAlignment?: 'start' | 'center' | 'end' | 'between' | 'around';
  /** Spacing between form action buttons (in pixels) */
  buttonSpacing?: number;
  /** Custom class names for the submit button */
  submitButtonClassName?: string;
  /** Custom class names for the cancel button */
  cancelButtonClassName?: string;
  /** Whether to reverse the order of submit and cancel buttons */
  reverseButtonOrder?: boolean;
  /** Whether to stack buttons vertically on mobile */
  stackButtonsOnMobile?: boolean;
  /** Fixed width for both buttons (in pixels or CSS units) */
  buttonWidth?: string;
  fieldSpacing?: number;
  /** Layout mode: 'stack' (default) or 'grid' */
  layout?: 'stack' | 'grid';
  /** Number of columns for grid layout (default: 12) */
  gridColumns?: number;
  control?: never;
  formMethods?: (methods: UseFormReturn<T>) => void;
}

/**
 * DynamicForm props for standalone mode
 */
export interface DynamicFormPropsStandalone {
  mode: 'standalone';
  fields: FieldConfig[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  errors?: Record<string, string>;
  submitButtonText?: string;
  showSubmitButton?: boolean;
  submitButtonSize?: 'small' | 'medium' | 'large';
  cancelButtonText?: string;
  showCancelButton?: boolean;
  onCancel?: () => void;
  formClassName?: string;
  /** Custom class names for the form actions container */
  formActionsClassName?: string;
  /** Alignment of the form action buttons: 'start', 'center', 'end', 'between', 'around' */
  formActionsAlignment?: 'start' | 'center' | 'end' | 'between' | 'around';
  /** Spacing between form action buttons (in pixels) */
  buttonSpacing?: number;
  /** Custom class names for the submit button */
  submitButtonClassName?: string;
  /** Custom class names for the cancel button */
  cancelButtonClassName?: string;
  /** Whether to reverse the order of submit and cancel buttons */
  reverseButtonOrder?: boolean;
  /** Whether to stack buttons vertically on mobile */
  stackButtonsOnMobile?: boolean;
  /** Fixed width for both buttons (in pixels or CSS units) */
  buttonWidth?: string;
  fieldSpacing?: number;
  /** Layout mode: 'stack' (default) or 'grid' */
  layout?: 'stack' | 'grid';
  /** Number of columns for grid layout (default: 12) */
  gridColumns?: number;
  schema?: never;
  control?: never;
  formMethods?: never;
}

/**
 * Union type for all DynamicForm props
 */
export type DynamicFormProps<T extends FieldValues = any> = 
  | DynamicFormPropsWithHookForm<T> 
  | DynamicFormPropsStandalone;


/**
 * DynamicForm Component
 * 
 * A flexible form component that can work with or without react-hook-form.
 * Supports multiple field types and automatic form generation from configuration.
 * 
 * @example
 * // With react-hook-form
 * <DynamicForm
 *   mode="react-hook-form"
 *   fields={fieldConfig}
 *   schema={zodSchema}
 *   onSubmit={handleSubmit}
 * />
 * 
 * @example
 * // Standalone mode
 * <DynamicForm
 *   mode="standalone"
 *   fields={fieldConfig}
 *   values={formValues}
 *   onChange={handleChange}
 *   onSubmit={handleSubmit}
 * />
 */
function DynamicForm<T extends FieldValues = any>(props: DynamicFormProps<T>) {
  const {
    mode,
    fields,
    onSubmit,
    submitButtonText = 'Submit',
    showSubmitButton = true,
    submitButtonSize = 'medium',
    cancelButtonText = 'Cancel',
    showCancelButton = false,
    onCancel,
    formClassName = '',
    formActionsClassName = '',
    formActionsAlignment = 'between',
    buttonSpacing = 16,
    submitButtonClassName = '',
    cancelButtonClassName = '',
    reverseButtonOrder = false,
    stackButtonsOnMobile = true,
    buttonWidth,
    fieldSpacing = 2,
    layout = 'stack',
    gridColumns = 12,
  } = props;

  // Map DynamicForm alignment values to FormActions alignment values
  const getFormActionsAlignment = (): 'start' | 'center' | 'end' | 'space-between' => {
    switch (formActionsAlignment) {
      case 'between':
        return 'space-between';
      case 'around':
        return 'space-between'; // FormActions doesn't support 'around', fallback to 'space-between'
      case 'start':
      case 'center':
      case 'end':
        return formActionsAlignment;
      default:
        return 'space-between';
    }
  };

  // React Hook Form mode
  if (mode === 'react-hook-form') {
    const { schema, defaultValues, formMethods } = props;

    const methods = useForm<T>({
      resolver: zodResolver(schema as any),
      defaultValues: defaultValues as any,
      mode: 'onChange',
    });

    const { control, handleSubmit, formState: { isSubmitting } } = methods;

    // Expose form methods to parent if callback provided
    React.useEffect(() => {
      if (formMethods) {
        formMethods(methods);
      }
    }, [formMethods, methods]);

    const getButtonClassName = () => {
      if (submitButtonSize === 'small') return 'btn-small'
      if (submitButtonSize === 'large') return 'btn-large'
      return ''
    }

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('dynamic-form', formClassName)}
        noValidate
      >
        {layout === 'grid' ? (
          <div className="form-grid" style={{ '--grid-columns': gridColumns } as React.CSSProperties}>
            {fields.map((field) => {
              const colSpan = field.colSpan || 12
              const gridStyle = typeof colSpan === 'number'
                ? { gridColumn: `span ${colSpan}` }
                : {
                    gridColumn: `span ${colSpan.xs || 12}`,
                    '--sm-span': colSpan.sm || 12,
                    '--md-span': colSpan.md || colSpan.sm || 12,
                    '--lg-span': colSpan.lg || colSpan.md || colSpan.sm || 12,
                    '--xl-span': colSpan.xl || colSpan.lg || colSpan.md || colSpan.sm || 12,
                  } as React.CSSProperties
              
              return (
                <div key={field.name} className="form-grid-item" style={gridStyle}>
                  <FieldRenderer
                    field={field}
                    mode="react-hook-form"
                    control={control as Control<FieldValues>}
                  />
                </div>
              )
            })}
            {(showSubmitButton || showCancelButton) && (
              <div className="form-grid-item" style={{ gridColumn: 'span 12' }}>
                <FormActions
                  showSubmitButton={showSubmitButton}
                  showCancelButton={showCancelButton}
                  submitButtonText={submitButtonText}
                  cancelButtonText={cancelButtonText}
                  isSubmitting={isSubmitting}
                  onCancel={onCancel}
                  submitButtonSize={submitButtonSize}
                  alignment={getFormActionsAlignment()}
                  stackOnMobile={stackButtonsOnMobile}
                  reverseOrder={reverseButtonOrder}
                  spacing={`${buttonSpacing}px`}
                  buttonWidth={buttonWidth}
                  submitButtonClassName={submitButtonClassName}
                  cancelButtonClassName={cancelButtonClassName}
                  className={formActionsClassName}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="form-stack" style={{ '--field-spacing': `${fieldSpacing * FIELD_SPACING_MULTIPLIER}px` } as React.CSSProperties}>
            {fields.map((field) => (
              <div key={field.name} className="form-field">
                <FieldRenderer
                  field={field}
                  mode="react-hook-form"
                  control={control as Control<FieldValues>}
                />
              </div>
            ))}
            {(showSubmitButton || showCancelButton) && (
              <FormActions
                showSubmitButton={showSubmitButton}
                showCancelButton={showCancelButton}
                submitButtonText={submitButtonText}
                cancelButtonText={cancelButtonText}
                isSubmitting={isSubmitting}
                onCancel={onCancel}
                submitButtonSize={submitButtonSize}
                alignment={getFormActionsAlignment()}
                stackOnMobile={stackButtonsOnMobile}
                reverseOrder={reverseButtonOrder}
                spacing={`${buttonSpacing}px`}
                buttonWidth={buttonWidth}
                submitButtonClassName={submitButtonClassName}
                cancelButtonClassName={cancelButtonClassName}
                className={formActionsClassName}
              />
            )}
          </div>
        )}
      </form>
    );
  }

  // Standalone mode
  const { values, onChange, errors } = props;
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleStandaloneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getButtonClassName = () => {
    if (submitButtonSize === 'small') return 'btn-small'
    if (submitButtonSize === 'large') return 'btn-large'
    return ''
  }

  return (
    <form
      onSubmit={handleStandaloneSubmit}
      className={cn('dynamic-form', formClassName)}
      noValidate
    >
      {layout === 'grid' ? (
        <div className="form-grid" style={{ '--grid-columns': gridColumns } as React.CSSProperties}>
          {fields.map((field) => {
            const colSpan = field.colSpan || 12
            const gridStyle = typeof colSpan === 'number'
              ? { gridColumn: `span ${colSpan}` }
              : {
                  gridColumn: `span ${colSpan.xs || 12}`,
                  '--sm-span': colSpan.sm || 12,
                  '--md-span': colSpan.md || colSpan.sm || 12,
                  '--lg-span': colSpan.lg || colSpan.md || colSpan.sm || 12,
                  '--xl-span': colSpan.xl || colSpan.lg || colSpan.md || colSpan.sm || 12,
                } as React.CSSProperties
            
            return (
              <div key={field.name} className="form-grid-item" style={gridStyle}>
                <FieldRenderer
                  field={field}
                  mode="standalone"
                  value={values[field.name]}
                  onChange={(value) => onChange(field.name, value)}
                  error={errors?.[field.name]}
                />
                {errors?.[field.name] && (
                  <span className="field-error">
                    {errors[field.name]}
                  </span>
                )}
              </div>
            )
          })}
          {(showSubmitButton || showCancelButton) && (
            <div className="form-grid-item" style={{ gridColumn: 'span 12' }}>
              <FormActions
                showSubmitButton={showSubmitButton}
                showCancelButton={showCancelButton}
                submitButtonText={submitButtonText}
                cancelButtonText={cancelButtonText}
                isSubmitting={isSubmitting}
                onCancel={onCancel}
                submitButtonSize={submitButtonSize}
                alignment={getFormActionsAlignment()}
                stackOnMobile={stackButtonsOnMobile}
                reverseOrder={reverseButtonOrder}
                spacing={`${buttonSpacing}px`}
                buttonWidth={buttonWidth}
                submitButtonClassName={submitButtonClassName}
                cancelButtonClassName={cancelButtonClassName}
                className={formActionsClassName}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="form-stack" style={{ '--field-spacing': `${fieldSpacing * FIELD_SPACING_MULTIPLIER}px` } as React.CSSProperties}>
          {fields.map((field) => (
            <div key={field.name} className="form-field">
              <FieldRenderer
                field={field}
                mode="standalone"
                value={values[field.name]}
                onChange={(value) => onChange(field.name, value)}
                error={errors?.[field.name]}
              />
              {errors?.[field.name] && (
                <span className="field-error">
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}
          {(showSubmitButton || showCancelButton) && (
            <FormActions
              showSubmitButton={showSubmitButton}
              showCancelButton={showCancelButton}
              submitButtonText={submitButtonText}
              cancelButtonText={cancelButtonText}
              isSubmitting={isSubmitting}
              onCancel={onCancel}
              submitButtonSize={submitButtonSize}
              alignment={getFormActionsAlignment()}
              stackOnMobile={stackButtonsOnMobile}
              reverseOrder={reverseButtonOrder}
              spacing={`${buttonSpacing}px`}
              buttonWidth={buttonWidth}
              submitButtonClassName={submitButtonClassName}
              cancelButtonClassName={cancelButtonClassName}
              className={formActionsClassName}
            />
          )}
        </div>
      )}
    </form>
  );
}

export default DynamicForm
