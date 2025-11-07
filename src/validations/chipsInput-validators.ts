/**
 * Validation helper functions for ChipsInput
 * These can be used as validation prop or combined for custom validation
 */

/**
 * Email validation
 * @example
 * <ChipsInput validation={validateEmail} />
 */
export const validateEmail = (value: string): boolean | string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address'
  }
  return true
}

/**
 * Zip code validation (US 5-digit)
 * @example
 * <ChipsInput validation={validateZipCode} />
 */
export const validateZipCode = (value: string): boolean | string => {
  const zipRegex = /^\d{5}$/
  if (!zipRegex.test(value)) {
    return 'Please enter a valid 5-digit zip code'
  }
  return true
}

/**
 * Phone number validation (at least 10 digits)
 * @example
 * <ChipsInput validation={validatePhone} />
 */
export const validatePhone = (value: string): boolean | string => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  const digitsOnly = value.replace(/\D/g, '')
  
  if (!phoneRegex.test(value)) {
    return 'Phone number can only contain digits, spaces, and symbols: + - ( )'
  }
  
  if (digitsOnly.length < 10) {
    return 'Phone number must have at least 10 digits'
  }
  
  return true
}

/**
 * URL validation
 * @example
 * <ChipsInput validation={validateUrl} />
 */
export const validateUrl = (value: string): boolean | string => {
  try {
    new URL(value)
    return true
  } catch {
    return 'Please enter a valid URL (e.g., https://example.com)'
  }
}

/**
 * Domain name validation
 * @example
 * <ChipsInput validation={validateDomain} />
 */
export const validateDomain = (value: string): boolean | string => {
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/
  if (!domainRegex.test(value)) {
    return 'Please enter a valid domain name (e.g., example.com)'
  }
  return true
}

/**
 * Username validation (3-20 characters, alphanumeric with underscores)
 * @example
 * <ChipsInput validation={validateUsername} />
 */
export const validateUsername = (value: string): boolean | string => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
  if (!usernameRegex.test(value)) {
    return 'Username must be 3-20 characters (letters, numbers, underscores only)'
  }
  return true
}

/**
 * Alphanumeric validation
 * @example
 * <ChipsInput validation={validateAlphanumeric} />
 */
export const validateAlphanumeric = (value: string): boolean | string => {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/
  if (!alphanumericRegex.test(value)) {
    return 'Only letters and numbers are allowed'
  }
  return true
}

/**
 * Minimum length validation
 * @example
 * <ChipsInput validation={createMinLengthValidator(3)} />
 */
export const createMinLengthValidator = (minLength: number) => {
  return (value: string): boolean | string => {
    if (value.length < minLength) {
      return `Must be at least ${minLength} characters`
    }
    return true
  }
}

/**
 * Maximum length validation
 * @example
 * <ChipsInput validation={createMaxLengthValidator(50)} />
 */
export const createMaxLengthValidator = (maxLength: number) => {
  return (value: string): boolean | string => {
    if (value.length > maxLength) {
      return `Must be no more than ${maxLength} characters`
    }
    return true
  }
}

/**
 * Range length validation
 * @example
 * <ChipsInput validation={createRangeLengthValidator(3, 20)} />
 */
export const createRangeLengthValidator = (minLength: number, maxLength: number) => {
  return (value: string): boolean | string => {
    if (value.length < minLength || value.length > maxLength) {
      return `Must be between ${minLength} and ${maxLength} characters`
    }
    return true
  }
}

/**
 * Pattern validation
 * @example
 * <ChipsInput validation={createPatternValidator(/^[A-Z]{2}\d{4}$/, 'Format: AB1234')} />
 */
export const createPatternValidator = (pattern: RegExp, errorMessage: string) => {
  return (value: string): boolean | string => {
    if (!pattern.test(value)) {
      return errorMessage
    }
    return true
  }
}

/**
 * Combine multiple validators
 * @example
 * const validate = combineValidators([
 *   validateEmail,
 *   createMinLengthValidator(5)
 * ])
 * <ChipsInput validation={validate} />
 */
export const combineValidators = (validators: Array<(value: string) => boolean | string>) => {
  return (value: string): boolean | string => {
    for (const validator of validators) {
      const result = validator(value)
      if (result !== true) {
        return result
      }
    }
    return true
  }
}

/**
 * No spaces validation
 * @example
 * <ChipsInput validation={validateNoSpaces} />
 */
export const validateNoSpaces = (value: string): boolean | string => {
  if (/\s/.test(value)) {
    return 'Spaces are not allowed'
  }
  return true
}

/**
 * Numeric only validation
 * @example
 * <ChipsInput validation={validateNumeric} />
 */
export const validateNumeric = (value: string): boolean | string => {
  if (!/^\d+$/.test(value)) {
    return 'Only numbers are allowed'
  }
  return true
}

/**
 * Hex color validation
 * @example
 * <ChipsInput validation={validateHexColor} />
 */
export const validateHexColor = (value: string): boolean | string => {
  const hexRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
  if (!hexRegex.test(value)) {
    return 'Please enter a valid hex color (e.g., #FF5733 or #F57)'
  }
  return true
}

/**
 * IP address validation (IPv4)
 * @example
 * <ChipsInput validation={validateIPv4} />
 */
export const validateIPv4 = (value: string): boolean | string => {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/
  if (!ipRegex.test(value)) {
    return 'Please enter a valid IPv4 address (e.g., 192.168.1.1)'
  }
  
  const parts = value.split('.')
  for (const part of parts) {
    const num = parseInt(part, 10)
    if (num < 0 || num > 255) {
      return 'Each IP segment must be between 0 and 255'
    }
  }
  
  return true
}
