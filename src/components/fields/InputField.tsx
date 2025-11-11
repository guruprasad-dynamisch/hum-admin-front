import React, { forwardRef, useState } from 'react'
import { useController, Control, FieldValues, RegisterOptions } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { cn } from '@utils/classNames'
import IconBtn from '@components/buttons/IconBtn'
import '@styles/fields/input-field.scss'

interface InputFieldProps {
  /** Field name (required for react-hook-form mode) */
  name?: string
  /** Label text */
  label?: string
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  /** Placeholder text */
  placeholder?: string
  /** Mode of operation */
  mode?: 'standalone' | 'react-hook-form'
  /** React Hook Form control */
  control?: Control<FieldValues>
  /** React Hook Form validation rules */
  rules?: RegisterOptions
  /** Standalone mode value */
  value?: string | number
  /** Standalone mode onChange handler */
  onChange?: (value: string | number) => void
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
  /** Show password visibility toggle (only for password type, default: true) */
  showPasswordToggle?: boolean
  /** Icon to display (can be emoji, text, or React node) */
  icon?: React.ReactNode
  /** Icon position: 'start' or 'end' (default: 'start') */
  iconPosition?: 'start' | 'end'
  /** Helper text to display below the input */
  helperText?: string
  /** Autocomplete attribute for better UX and security */
  autoComplete?: string
  /** Additional HTML input props */
  [key: string]: any
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      mode = 'standalone',
      name = '',
      label,
      type = 'text',
      placeholder,
      disabled = false,
      required = false,
      className = '',
      showLabel = true,
      showPasswordToggle = true,
      control,
      rules,
      value,
      onChange,
      onBlur,
      icon,
      iconPosition = 'start',
      helperText,
      autoComplete,
      ...props
    },
    ref
  ) => {
    // State for password visibility
    const [showPassword, setShowPassword] = useState(false)

    // Handle react-hook-form mode
    const isReactHookForm = mode === 'react-hook-form' && control && name
    let fieldProps: {
      ref?: React.Ref<HTMLInputElement>
      value?: string | number
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
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

    // Determine the actual input type (handle password visibility)
    const actualType = type === 'password' && showPassword ? 'text' : type

    // Standalone mode props
    const standaloneProps = !isReactHookForm ? {
      ref: ref,
      value: value || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = type === 'number' ? Number(e.target.value) : e.target.value
        onChange?.(newValue)
      },
      onBlur: onBlur,
    } : {}

    return (
      <div className={cn('input-field-wrapper', className)}>
        {showLabel && label && (
          <label htmlFor={name} className="input-field-label">
            {label}{required && <span className="required">*</span>}
          </label>
        )}
        
        <div className={cn('input-field-container', {
          'has-icon-start': icon && iconPosition === 'start',
          'has-icon-end': icon && iconPosition === 'end'
        })}>
          {icon && iconPosition === 'start' && (
            <span className="input-icon input-icon-start">{icon}</span>
          )}
          
          <input
            {...props}
            {...(isReactHookForm ? fieldProps : standaloneProps)}
            id={name}
            type={actualType}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            aria-label={!showLabel && label ? label : undefined}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            className={cn('custom-input', { 
              'has-error': !!error,
              'with-icon-start': icon && iconPosition === 'start',
              'with-icon-end': icon && iconPosition === 'end'
            })}
          />
          
          {icon && iconPosition === 'end' && type !== 'password' && (
            <span className="input-icon input-icon-end">{icon}</span>
          )}
          
          {type === 'password' && showPasswordToggle && (
            <IconBtn
              variant="secondary"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
              aria-label="Toggle password visibility"
              className="password-toggle-btn"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </IconBtn>
          )}
        </div>
        
        {helperText && !error && (
          <div id={`${name}-helper`} className="helper-text">{helperText}</div>
        )}
        
        {error && (
          <span id={`${name}-error`} className="error-feedback" role="alert">
            {error.message}
          </span>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'

export default InputField
