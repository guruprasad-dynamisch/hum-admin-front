# ChipsInput - Complete Usage Guide

## Overview

The ChipsInput component is now **fully flexible** with validation completely controlled from props. No built-in restrictions!

## Key Features

✅ **100% Customizable Validation** - Define any validation logic you need  
✅ **No Type Restrictions** - Component doesn't limit what you can validate  
✅ **Flexible Error Messages** - Return boolean or custom error strings  
✅ **Pre-built Validators** - Use ready-made validators or create your own  
✅ **Combine Validators** - Chain multiple validation rules  
✅ **TypeScript Support** - Fully typed with proper inference  

---

## Basic Usage

### 1. Simple Chips (No Validation)

```tsx
import { ChipsInput } from '@components/fields'

const [tags, setTags] = useState<string[]>([])

<ChipsInput
  label="Tags"
  value={tags}
  onChange={setTags}
/>
```

---

## Validation Approaches

### 2. Using Pre-built Validators

```tsx
import { ChipsInput, validateEmail } from '@components/fields'

const [emails, setEmails] = useState<string[]>([])

<ChipsInput
  label="Email Addresses"
  validation={validateEmail}
  value={emails}
  onChange={setEmails}
/>
```

**Available Pre-built Validators:**
- `validateEmail` - Email validation
- `validateZipCode` - US 5-digit zip codes
- `validatePhone` - Phone numbers (10+ digits)
- `validateUrl` - URL validation
- `validateDomain` - Domain names
- `validateUsername` - Usernames (3-20 chars, alphanumeric + underscore)
- `validateAlphanumeric` - Letters and numbers only
- `validateNoSpaces` - No spaces allowed
- `validateNumeric` - Numbers only
- `validateHexColor` - Hex color codes
- `validateIPv4` - IPv4 addresses

### 3. Custom Validation (Return Boolean)

```tsx
const validateTag = (value: string): boolean => {
  return value.length >= 3 && value.length <= 20
}

<ChipsInput
  label="Tags"
  validation={validateTag}
  errorMessage="Tag must be 3-20 characters"
  value={tags}
  onChange={setTags}
/>
```

### 4. Custom Validation (Return Error String)

```tsx
const validateProductCode = (value: string): boolean | string => {
  if (!/^[A-Z]{2}\d{4}$/.test(value)) {
    return 'Product code must be in format: AB1234'
  }
  return true
}

<ChipsInput
  label="Product Codes"
  validation={validateProductCode}
  value={codes}
  onChange={setCodes}
/>
```

### 5. Using Validator Factories

```tsx
import { createMinLengthValidator, createMaxLengthValidator } from '@components/fields'

// Min length
<ChipsInput
  validation={createMinLengthValidator(5)}
  label="Keywords"
  value={keywords}
  onChange={setKeywords}
/>

// Max length
<ChipsInput
  validation={createMaxLengthValidator(50)}
  label="Descriptions"
  value={descriptions}
  onChange={setDescriptions}
/>

// Range length
<ChipsInput
  validation={createRangeLengthValidator(3, 20)}
  label="Usernames"
  value={usernames}
  onChange={setUsernames}
/>

// Pattern matching
<ChipsInput
  validation={createPatternValidator(/^[A-Z]{3}-\d{3}$/, 'Format: ABC-123')}
  label="Reference Codes"
  value={codes}
  onChange={setCodes}
/>
```

### 6. Combining Multiple Validators

```tsx
import { combineValidators, validateEmail, createMinLengthValidator } from '@components/fields'

const validateEmailWithMinLength = combineValidators([
  validateEmail,
  createMinLengthValidator(10)
])

<ChipsInput
  label="Email Addresses"
  validation={validateEmailWithMinLength}
  value={emails}
  onChange={setEmails}
/>
```

### 7. Complex Custom Validation

```tsx
const validateCompanyDomain = (value: string): boolean | string => {
  // Must be a domain
  if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/.test(value)) {
    return 'Please enter a valid domain name'
  }
  
  // Cannot be certain domains
  const blockedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com']
  if (blockedDomains.includes(value.toLowerCase())) {
    return 'Personal email domains are not allowed'
  }
  
  // Must have specific TLD
  if (!value.endsWith('.com') && !value.endsWith('.org')) {
    return 'Only .com and .org domains are allowed'
  }
  
  return true
}

<ChipsInput
  label="Company Domains"
  validation={validateCompanyDomain}
  value={domains}
  onChange={setDomains}
/>
```

---

## With React Hook Form

### 8. Basic Form Integration

```tsx
import { useForm } from 'react-hook-form'
import { ChipsField, validateEmail } from '@components/fields'

interface FormData {
  emails: string[]
  tags: string[]
}

function MyForm() {
  const { control, handleSubmit } = useForm<FormData>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ChipsField
        name="emails"
        control={control}
        label="Email Addresses"
        validation={validateEmail}
        required
      />
      
      <ChipsField
        name="tags"
        control={control}
        label="Tags"
        validation={createMinLengthValidator(3)}
      />
    </form>
  )
}
```

### 9. With Form Validation Rules

```tsx
import { useForm } from 'react-hook-form'
import { ChipsField } from '@components/fields'

const { control } = useForm({
  defaultValues: {
    skills: []
  }
})

<ChipsField
  name="skills"
  control={control}
  label="Skills"
  validation={(value) => {
    if (value.length < 2) return 'Skill name too short'
    if (value.length > 30) return 'Skill name too long'
    if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces allowed'
    return true
  }}
  maxChips={10}
  required
/>
```

---

## Advanced Examples

### 10. API-based Validation

```tsx
const validateUsernameAvailable = async (value: string): Promise<boolean | string> => {
  try {
    const response = await fetch(`/api/check-username?username=${value}`)
    const data = await response.json()
    
    if (!data.available) {
      return 'This username is already taken'
    }
    return true
  } catch {
    return 'Could not verify username availability'
  }
}

// Note: For async validation, you'll need to handle it differently
// This is a synchronous example showing the pattern
const validateUsername = (value: string): boolean | string => {
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
    return 'Username must be 3-20 characters (letters, numbers, underscores)'
  }
  // You would trigger async check separately
  return true
}
```

### 11. Conditional Validation

```tsx
const [strictMode, setStrictMode] = useState(false)

const validateWithMode = (value: string): boolean | string => {
  if (strictMode) {
    // Strict validation
    if (!/^[A-Z][a-z]+$/.test(value)) {
      return 'Must start with capital letter, followed by lowercase'
    }
  } else {
    // Lenient validation
    if (!/^[a-zA-Z]+$/.test(value)) {
      return 'Only letters allowed'
    }
  }
  return true
}

<ChipsInput
  validation={validateWithMode}
  value={items}
  onChange={setItems}
/>
```

### 12. Multi-step Validation

```tsx
const validateSecurityCode = (value: string): boolean | string => {
  // Step 1: Format check
  if (!/^[A-Z0-9]{6}$/.test(value)) {
    return 'Code must be 6 characters (uppercase letters and numbers)'
  }
  
  // Step 2: Must contain at least one letter
  if (!/[A-Z]/.test(value)) {
    return 'Code must contain at least one letter'
  }
  
  // Step 3: Must contain at least one number
  if (!/\d/.test(value)) {
    return 'Code must contain at least one number'
  }
  
  // Step 4: Cannot be all same character
  if (/^(.)\1+$/.test(value)) {
    return 'Code cannot be all the same character'
  }
  
  return true
}

<ChipsInput
  label="Security Codes"
  validation={validateSecurityCode}
  value={codes}
  onChange={setCodes}
/>
```

---

## Creating Custom Validators

### Template for Custom Validator

```tsx
export const validateMyCustomField = (value: string): boolean | string => {
  // Your validation logic here
  
  if (/* condition fails */) {
    return 'Your custom error message'
  }
  
  return true
}
```

### Validator with Options

```tsx
export const createCustomValidator = (options: {
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  errorMessage?: string
}) => {
  return (value: string): boolean | string => {
    if (options.minLength && value.length < options.minLength) {
      return `Minimum ${options.minLength} characters required`
    }
    
    if (options.maxLength && value.length > options.maxLength) {
      return `Maximum ${options.maxLength} characters allowed`
    }
    
    if (options.pattern && !options.pattern.test(value)) {
      return options.errorMessage || 'Invalid format'
    }
    
    return true
  }
}

// Usage
const validate = createCustomValidator({
  minLength: 5,
  maxLength: 20,
  pattern: /^[a-zA-Z0-9]+$/,
  errorMessage: 'Only alphanumeric characters allowed'
})

<ChipsInput validation={validate} />
```

---

## All Available Props

```tsx
interface ChipsInputProps {
  // Data
  value?: string[] | ChipItem[]
  onChange?: (value: string[] | ChipItem[]) => void
  
  // Configuration
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  maxLength?: number
  maxChips?: number
  
  // Validation - FULLY CUSTOMIZABLE
  validation?: (value: string) => boolean | string
  errorMessage?: string  // Used when validation returns false
  customError?: string   // Override any error
  
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
```

---

## Import Summary

```tsx
// Component
import { ChipsInput, ChipsField } from '@components/fields'

// Pre-built validators
import {
  validateEmail,
  validateZipCode,
  validatePhone,
  validateUrl,
  validateDomain,
  validateUsername,
  validateAlphanumeric,
  validateNoSpaces,
  validateNumeric,
  validateHexColor,
  validateIPv4
} from '@components/fields'

// Validator factories
import {
  createMinLengthValidator,
  createMaxLengthValidator,
  createRangeLengthValidator,
  createPatternValidator,
  combineValidators
} from '@components/fields'
```

---

## Best Practices

1. **Return descriptive error messages** - Users need to know what's wrong
2. **Validate early** - Check format before making API calls
3. **Combine validators** - Use `combineValidators` for multiple rules
4. **Keep validators pure** - No side effects in validation functions
5. **Test edge cases** - Empty strings, special characters, etc.
6. **Use TypeScript** - Get type safety for your validation logic

---

## TypeScript Types

```tsx
type ValidationFunction = (value: string) => boolean | string

// Returns true if valid
// Returns false if invalid (uses errorMessage prop)
// Returns string if invalid (uses returned string as error)
```

---

## Summary

The ChipsInput component is now **completely flexible**:
- ✅ No built-in type restrictions
- ✅ Validation is 100% from props
- ✅ Can return boolean or custom error strings
- ✅ Pre-built validators available but optional
- ✅ Easy to create custom validators
- ✅ Combine multiple validators
- ✅ Works standalone or with React Hook Form

**You have full control over validation!** 🎉
