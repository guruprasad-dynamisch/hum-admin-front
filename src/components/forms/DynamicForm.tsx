import React from 'react'
import { useForm, Control, FieldValues, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@utils/classNames'
import InputField from '../fields/InputField'
import PhoneInput from '../fields/PhoneInput'
import SelectField from '../fields/SelectField'
import TextAreaField from '../fields/TextAreaField'
import PrimaryBtn from '../buttons/PrimaryBtn'
import SecondaryBtn from '../buttons/SecondaryBtn'
import '@styles/components/dynamic-form.scss'

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
 * Field renderer component
 */
interface FieldRendererProps {
  field: FieldConfig;
  mode: 'react-hook-form' | 'standalone';
  control?: Control<any>;
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  error?: string;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  mode,
  control,
  value,
  onChange,
  onBlur,
  error,
}) => {
  const commonProps = {
    name: field.name,
    label: field.label,
    placeholder: field.placeholder,
    required: field.required,
    disabled: field.disabled,
    className: field.className,
    helperText: field.helperText,
    mode,
  };

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
    case 'tel':
    case 'url':
    case 'search':
      return (
        <InputField
          {...commonProps}
          type={field.type}
          control={mode === 'react-hook-form' ? control : undefined}
          value={mode === 'standalone' ? value : undefined}
          onChange={mode === 'standalone' ? onChange : undefined}
          onBlur={mode === 'standalone' ? onBlur : undefined}
        />
      );

    case 'phone':
      return (
        <PhoneInput
          {...commonProps}
          defaultCountry={field.defaultCountry || 'US'}
          control={mode === 'react-hook-form' ? control : undefined}
          rules={mode === 'react-hook-form' ? { required: field.required } : undefined}
          value={mode === 'standalone' ? value : undefined}
          onChange={mode === 'standalone' ? onChange : undefined}
          onBlur={mode === 'standalone' ? onBlur : undefined}
        />
      );

    case 'textarea':
      return (
        <TextAreaField
          {...commonProps}
          rows={field.rows}
          maxLength={field.maxLength}
          helperText={field.helperText}
          value={mode === 'standalone' ? value : undefined}
          onChange={mode === 'standalone' ? onChange : undefined}
          onBlur={mode === 'standalone' ? onBlur : undefined}
          error={error}
        />
      );

    case 'checkbox':
      // TODO: Implement checkbox field
      return (
        <div className="field-placeholder">
          Checkbox field coming soon...
        </div>
      );

    case 'select':
    case 'dropdown':
      return (
        <SelectField
          {...commonProps}
          options={field.options || []}
          value={mode === 'standalone' ? value : undefined}
          onChange={mode === 'standalone' ? onChange : undefined}
          control={mode === 'react-hook-form' ? control : undefined}
        />
      );

    case 'date':
      // TODO: Implement date field
      return (
        <div className="field-placeholder">
          Date field coming soon...
        </div>
      );

    case 'group':
      // TODO: Implement group field
      return (
        <div className="field-placeholder">
          Group field coming soon...
        </div>
      );

    default:
      return null;
  }
};

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
    fieldSpacing = 2,
    layout = 'stack',
    gridColumns = 12,
  } = props;

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
                    control={control}
                  />
                </div>
              )
            })}
            {(showSubmitButton || showCancelButton) && (
              <div className="form-grid-item" style={{ gridColumn: 'span 12' }}>
                <div className={cn('form-actions', submitButtonSize === 'small' && 'justify-end')}>
                  {showCancelButton && onCancel && (
                    <SecondaryBtn
                      type="button"
                      onClick={onCancel}
                      disabled={isSubmitting}
                      className={getButtonClassName()}
                      fullWidth={false}
                    >
                      {cancelButtonText}
                    </SecondaryBtn>
                  )}
                  {showSubmitButton && (
                    <PrimaryBtn
                      type="submit"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                      fullWidth={submitButtonSize !== 'small' && !showCancelButton}
                      className={getButtonClassName()}
                    >
                      {submitButtonText}
                    </PrimaryBtn>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="form-stack" style={{ '--field-spacing': `${fieldSpacing * 8}px` } as React.CSSProperties}>
            {fields.map((field) => (
              <div key={field.name} className="form-field">
                <FieldRenderer
                  field={field}
                  mode="react-hook-form"
                  control={control}
                />
              </div>
            ))}
            {(showSubmitButton || showCancelButton) && (
              <div className={cn('form-actions', submitButtonSize === 'small' && 'justify-end')}>
                {showCancelButton && onCancel && (
                  <SecondaryBtn
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className={getButtonClassName()}
                    fullWidth={false}
                  >
                    {cancelButtonText}
                  </SecondaryBtn>
                )}
                {showSubmitButton && (
                  <PrimaryBtn
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    fullWidth={submitButtonSize !== 'small' && !showCancelButton}
                    className={getButtonClassName()}
                  >
                    {submitButtonText}
                  </PrimaryBtn>
                )}
              </div>
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
              <div className={cn('form-actions', submitButtonSize === 'small' && 'justify-end')}>
                {showCancelButton && onCancel && (
                  <SecondaryBtn
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className={getButtonClassName()}
                    fullWidth={false}
                  >
                    {cancelButtonText}
                  </SecondaryBtn>
                )}
                {showSubmitButton && (
                  <PrimaryBtn
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    fullWidth={submitButtonSize !== 'small' && !showCancelButton}
                    className={getButtonClassName()}
                  >
                    {submitButtonText}
                  </PrimaryBtn>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="form-stack" style={{ '--field-spacing': `${fieldSpacing * 8}px` } as React.CSSProperties}>
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
            <div className={cn('form-actions', submitButtonSize === 'small' && 'justify-end')}>
              {showCancelButton && onCancel && (
                <SecondaryBtn
                  type="button"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className={getButtonClassName()}
                  fullWidth={false}
                >
                  {cancelButtonText}
                </SecondaryBtn>
              )}
              {showSubmitButton && (
                <PrimaryBtn
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  fullWidth={submitButtonSize !== 'small' && !showCancelButton}
                  className={getButtonClassName()}
                >
                  {submitButtonText}
                </PrimaryBtn>
              )}
            </div>
          )}
        </div>
      )}
    </form>
  );
}

export default DynamicForm
