import React from 'react'
import '@styles/fields/textarea-field.scss'

export interface TextAreaFieldProps {
  /** Field name */
  name: string
  /** Field label */
  label?: string
  /** Field value */
  value?: string
  /** Placeholder text */
  placeholder?: string
  /** Helper text */
  helperText?: string
  /** Error message */
  error?: string
  /** Disabled state */
  disabled?: boolean
  /** Required field */
  required?: boolean
  /** Rows */
  rows?: number
  /** Max length */
  maxLength?: number
  /** onChange handler */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  /** onBlur handler */
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

/**
 * TextAreaField Component
 * Multi-line text input field with label and validation
 * 
 * @example
 * <TextAreaField
 *   name="bio"
 *   label="Bio"
 *   placeholder="Tell us about yourself..."
 *   rows={5}
 *   onChange={handleChange}
 * />
 */
const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  value,
  placeholder,
  helperText,
  error,
  disabled = false,
  required = false,
  rows = 4,
  maxLength,
  onChange,
  onBlur
}) => {
  return (
    <div className="textarea-field-wrapper">
      {label && (
        <label htmlFor={name} className="textarea-field-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="textarea-field-container">
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          onChange={onChange}
          onBlur={onBlur}
          className={`custom-textarea ${error ? 'has-error' : ''}`}
        />
      </div>

      {helperText && !error && (
        <div className="helper-text">{helperText}</div>
      )}

      {error && (
        <div className="error-feedback">{error}</div>
      )}

      {maxLength && value && (
        <div className="character-count">
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  )
}

export default TextAreaField
