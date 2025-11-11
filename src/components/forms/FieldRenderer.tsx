import React from 'react'
import { Control, FieldValues } from 'react-hook-form'
import InputField from '../fields/InputField'
import PhoneInput from '../fields/PhoneInput'
import SelectField from '../fields/SelectField'
import TextAreaField from '../fields/TextAreaField'
import { FieldConfig } from './types'

/**
 * Field renderer component props
 */
interface FieldRendererProps {
  field: FieldConfig
  mode: 'react-hook-form' | 'standalone'
  control?: Control<FieldValues>
  value?: unknown
  onChange?: (value: unknown) => void
  onBlur?: () => void
  error?: string
}

/**
 * FieldRenderer Component
 * 
 * Renders the appropriate field component based on field type.
 * Supports both react-hook-form and standalone modes.
 * 
 * @example
 * <FieldRenderer
 *   field={fieldConfig}
 *   mode="react-hook-form"
 *   control={control}
 * />
 */
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
  }

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
      )

    case 'phone':
      return (
        <PhoneInput
          {...commonProps}
          defaultCountry={field.defaultCountry || 'US'}
          control={mode === 'react-hook-form' ? control : undefined}
          rules={mode === 'react-hook-form' ? { required: field.required } : undefined}
          value={mode === 'standalone' ? (value as string) : undefined}
          onChange={mode === 'standalone' ? onChange : undefined}
          onBlur={mode === 'standalone' ? onBlur : undefined}
        />
      )

    case 'textarea':
      return (
        <TextAreaField
          {...commonProps}
          rows={field.rows}
          maxLength={field.maxLength}
          helperText={field.helperText}
          value={mode === 'standalone' ? (value as string) : undefined}
          onChange={mode === 'standalone' ? onChange : undefined}
          onBlur={mode === 'standalone' ? onBlur : undefined}
          error={error}
        />
      )

    case 'checkbox':
      // TODO: Implement checkbox field
      return (
        <div className="field-placeholder">
          Checkbox field coming soon...
        </div>
      )

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
      )

    case 'date':
      // TODO: Implement date field
      return (
        <div className="field-placeholder">
          Date field coming soon...
        </div>
      )

    case 'group':
      // TODO: Implement group field
      return (
        <div className="field-placeholder">
          Group field coming soon...
        </div>
      )

    default:
      return null
  }
}

export default FieldRenderer
