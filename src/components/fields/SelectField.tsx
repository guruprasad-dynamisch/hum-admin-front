import React, { forwardRef } from 'react'
import { useController, Control, FieldValues, RegisterOptions } from 'react-hook-form'
import { cn } from '@utils/classNames'
import '@styles/fields/select-field.scss'

export interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps {
  /** Field name (required for react-hook-form mode) */
  name?: string
  /** Label text */
  label?: string
  /** Placeholder text */
  placeholder?: string
  /** Options for the select */
  options: SelectOption[]
  /** Mode of operation */
  mode?: 'standalone' | 'react-hook-form'
  /** React Hook Form control */
  control?: Control<FieldValues>
  /** React Hook Form validation rules */
  rules?: RegisterOptions
  /** Standalone mode value */
  value?: string
  /** Standalone mode onChange handler */
  onChange?: (value: string) => void
  /** Standalone mode onBlur handler */
  onBlur?: () => void
  /** Whether field is disabled */
  disabled?: boolean
  /** Whether field is required */
  required?: boolean
  /** Custom className for the wrapper */
  className?: string
  /** Show label (default: true) */
  showLabel?: boolean
  /** Additional HTML select props */
  [key: string]: any
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      mode = 'standalone',
      name = '',
      label,
      placeholder,
      options = [],
      disabled = false,
      required = false,
      className = '',
      showLabel = true,
      control,
      rules,
      value,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    // Handle react-hook-form mode
    const isReactHookForm = mode === 'react-hook-form' && control && name
    let fieldProps: {
      ref?: React.Ref<HTMLSelectElement>
      value?: string
      onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
      onBlur?: () => void
    } = {}
    let error = null

    if (isReactHookForm) {
      const {
        field: { onChange: fieldOnChange, onBlur: fieldOnBlur, value: fieldValue, ref: fieldRef },
        fieldState: { error: fieldError },
      } = useController({
        name,
        control,
        rules,
        defaultValue: value || '',
      })

      fieldProps = {
        ref: fieldRef,
        value: fieldValue || '',
        onChange: fieldOnChange,
        onBlur: fieldOnBlur,
      }
      error = fieldError
    }

    // Standalone mode props
    const standaloneProps = !isReactHookForm ? {
      ref: ref,
      value: value || '',
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value)
      },
      onBlur: onBlur,
    } : {}

    return (
      <div className={cn('select-field-wrapper', className)}>
        {showLabel && label && (
          <label htmlFor={name} className="select-field-label">
            {label}{required && <span className="required">*</span>}
          </label>
        )}
        
        <div className="select-field-container">
          <select
            {...props}
            {...(isReactHookForm ? fieldProps : standaloneProps)}
            id={name}
            disabled={disabled}
            className={cn('custom-select', { 
              'has-error': !!error
            })}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option: SelectOption) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {error && (
          <span className="error-feedback">
            {error.message}
          </span>
        )}
      </div>
    )
  }
)

SelectField.displayName = 'SelectField'

export default SelectField
