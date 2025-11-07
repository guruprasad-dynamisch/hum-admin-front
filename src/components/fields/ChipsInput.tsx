import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react'
import { FiX } from 'react-icons/fi'
import '@styles/fields/chips-input.scss'

export interface ChipItem {
  id: string | number
  label: string
  value: string
  [key: string]: any
}

export interface ChipsInputProps {
  // Data
  value?: string[] | ChipItem[]
  onChange?: (value: string[] | ChipItem[]) => void
  
  // Configuration
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  maxLength?: number
  maxChips?: number
  
  // Validation - Fully customizable from props
  validation?: (value: string) => boolean | string
  errorMessage?: string
  customError?: string
  
  // Display
  label?: string
  required?: boolean
  mode?: 'add' | 'inline'
  dataKeyForLabel?: string
  
  // Callbacks
  onChipClick?: (chip: string | ChipItem) => void
  onChipRemove?: (chip: string | ChipItem) => void
  onChipAdd?: (chip: string | ChipItem) => void
  
  // React Hook Form
  name?: string
  error?: any
}

const ChipsInput: React.FC<ChipsInputProps> = ({
  value = [],
  onChange,
  placeholder = 'Type and press Enter...',
  disabled = false,
  readOnly = false,
  maxLength = 524288,
  maxChips,
  validation,
  errorMessage,
  customError,
  label,
  required = false,
  mode = 'add',
  dataKeyForLabel,
  onChipClick,
  onChipRemove,
  onChipAdd,
  name,
  error,
}) => {
  const [chips, setChips] = useState<(string | ChipItem)[]>(value || [])
  const [inputValue, setInputValue] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    setChips(value || [])
  }, [value])

  const validateInput = (value: string): { isValid: boolean; error?: string } => {
    if (!value.trim()) {
      return { isValid: false, error: 'Value cannot be empty' }
    }

    // If validation function is provided, use it
    if (validation) {
      const result = validation(value)
      
      // If validation returns a string, it's an error message
      if (typeof result === 'string') {
        return { isValid: false, error: result }
      }
      
      // If validation returns false, use provided errorMessage or default
      if (result === false) {
        return { isValid: false, error: errorMessage || 'Invalid input' }
      }
      
      // Validation passed
      return { isValid: true }
    }

    // No validation provided, accept all non-empty values
    return { isValid: true }
  }

  const getChipValue = (chip: string | ChipItem): string => {
    if (typeof chip === 'string') return chip
    return dataKeyForLabel ? chip[dataKeyForLabel] : chip.label || chip.value
  }

  const chipExists = (newChip: string): boolean => {
    return chips.some(chip => {
      const chipValue = typeof chip === 'string' ? chip : chip.value
      return chipValue.toLowerCase() === newChip.toLowerCase()
    })
  }

  const addChip = (value: string) => {
    if (!value.trim()) return
    
    if (chipExists(value)) {
      setValidationError('This item already exists')
      return
    }

    if (maxChips && chips.length >= maxChips) {
      setValidationError(`Maximum ${maxChips} items allowed`)
      return
    }

    const validationResult = validateInput(value)
    if (!validationResult.isValid) {
      setValidationError(validationResult.error || 'Invalid input')
      return
    }

    const newChip = typeof chips[0] === 'object' && chips[0] !== null
      ? { id: Date.now(), label: value, value }
      : value

    const updatedChips = [...chips, newChip] as (string | ChipItem)[]
    setChips(updatedChips)
    setValidationError(null)

    if (onChange) {
      onChange(updatedChips as string[] | ChipItem[])
    }

    if (onChipAdd) {
      onChipAdd(newChip)
    }
  }

  const removeChip = (chipToRemove: string | ChipItem) => {
    if (disabled) return

    const updatedChips = chips.filter(chip => {
      if (typeof chip === 'string' && typeof chipToRemove === 'string') {
        return chip !== chipToRemove
      }
      if (typeof chip === 'object' && typeof chipToRemove === 'object') {
        return chip.id !== chipToRemove.id
      }
      return true
    })

    setChips(updatedChips)

    if (onChange) {
      onChange(updatedChips as string[] | ChipItem[])
    }

    if (onChipRemove) {
      onChipRemove(chipToRemove)
    }
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', 'Tab', ','].includes(e.key) && inputValue.trim()) {
      e.preventDefault()
      addChip(inputValue.trim())
      setInputValue('')
    } else if (e.key === 'Backspace' && !inputValue && chips.length > 0) {
      const lastChip = chips[chips.length - 1]
      if (lastChip !== undefined) {
        removeChip(lastChip)
      }
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setValidationError(null)
  }

  const handleChipClick = (chip: string | ChipItem) => {
    if (onChipClick) {
      onChipClick(chip)
    }
  }

  const displayError = customError || error?.message || validationError

  return (
    <div className="chips-input-wrapper">
      {label && (
        <label className="chips-input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div
        className={`chips-input-container ${mode === 'inline' ? 'inline-mode' : ''} ${
          displayError ? 'has-error' : ''
        } ${disabled ? 'disabled' : ''}`}
      >
        <div className="chips-list">
          {chips.map((chip, index) => {
            const chipValue = getChipValue(chip)
            const chipKey = typeof chip === 'object' ? chip.id : chip

            return (
              <div
                key={`${chipKey}_${index}`}
                className="chip-item"
                onClick={() => handleChipClick(chip)}
                title={chipValue}
              >
                <span className="chip-label">{chipValue}</span>
                {!disabled && (
                  <button
                    type="button"
                    className="chip-remove"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeChip(chip)
                    }}
                    aria-label="Remove chip"
                  >
                    <FiX />
                  </button>
                )}
              </div>
            )
          })}

          {!disabled && !readOnly && (
            <input
              type="text"
              className="chips-input"
              placeholder={chips.length === 0 ? placeholder : ''}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              maxLength={maxLength}
              disabled={disabled}
              readOnly={readOnly}
              name={name}
            />
          )}
        </div>

        {chips.length === 0 && disabled && (
          <div className="chips-empty-state">{placeholder}</div>
        )}
      </div>

      {displayError && (
        <div className="chips-error-message">{displayError}</div>
      )}
    </div>
  )
}

export default ChipsInput
