import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ChipsInput, { ChipItem } from './ChipsInput'
import ChipsField from './ChipsField'

/**
 * USAGE EXAMPLES FOR CHIPS INPUT COMPONENT
 * =========================================
 */

// ============================================
// Example 1: Basic Usage (Without React Hook Form)
// ============================================
export function BasicChipsExample() {
  const [tags, setTags] = useState<string[]>([])

  return (
    <ChipsInput
      label="Tags"
      placeholder="Add tags..."
      value={tags}
      onChange={setTags}
    />
  )
}

// ============================================
// Example 2: Email Validation
// ============================================
import { validateEmail } from '../../validations/chipsInput-validators'

export function EmailChipsExample() {
  const [emails, setEmails] = useState<string[]>([])

  return (
    <ChipsInput
      label="Email Addresses"
      validation={validateEmail}
      placeholder="Enter email addresses..."
      value={emails}
      onChange={setEmails}
      required
    />
  )
}

// ============================================
// Example 3: Zip Code Validation
// ============================================
import { validateZipCode } from '../../validations/chipsInput-validators'

export function ZipCodeChipsExample() {
  const [zipCodes, setZipCodes] = useState<string[]>([])

  return (
    <ChipsInput
      label="Zip Codes"
      validation={validateZipCode}
      placeholder="Enter 5-digit zip codes..."
      value={zipCodes}
      onChange={setZipCodes}
    />
  )
}

// ============================================
// Example 4: Custom Validation
// ============================================
export function CustomValidationExample() {
  const [usernames, setUsernames] = useState<string[]>([])

  const validateUsername = (value: string): boolean => {
    // Username must be 3-20 characters, alphanumeric with underscores
    return /^[a-zA-Z0-9_]{3,20}$/.test(value)
  }

  return (
    <ChipsInput
      label="Usernames"
      placeholder="Add usernames..."
      value={usernames}
      onChange={setUsernames}
      validation={validateUsername}
      errorMessage="Username must be 3-20 characters (letters, numbers, underscores only)"
    />
  )
}

// ============================================
// Example 5: With Max Chips Limit
// ============================================
export function MaxChipsExample() {
  const [skills, setSkills] = useState<string[]>([])

  return (
    <ChipsInput
      label="Top 5 Skills"
      placeholder="Add up to 5 skills..."
      value={skills}
      onChange={setSkills}
      maxChips={5}
    />
  )
}

// ============================================
// Example 6: Using Object Data (ChipItem)
// ============================================
export function ObjectChipsExample() {
  const [members, setMembers] = useState<ChipItem[]>([
    { id: 1, label: 'John Doe', value: 'john@example.com', role: 'Admin' },
    { id: 2, label: 'Jane Smith', value: 'jane@example.com', role: 'User' }
  ])

  return (
    <ChipsInput
      label="Team Members"
      placeholder="Add members..."
      value={members}
      onChange={setMembers}
      dataKeyForLabel="label"
      onChipClick={(chip) => {
        console.log('Clicked:', chip)
      }}
    />
  )
}

// ============================================
// Example 7: Disabled/Read-Only State
// ============================================
export function DisabledChipsExample() {
  const tags = ['React', 'TypeScript', 'SCSS']

  return (
    <ChipsInput
      label="Technologies (Read-Only)"
      value={tags}
      disabled
      placeholder="No tags added"
    />
  )
}

// ============================================
// Example 8: Inline Mode
// ============================================
export function InlineModeExample() {
  const [keywords, setKeywords] = useState<string[]>([])

  return (
    <ChipsInput
      label="Keywords"
      mode="inline"
      placeholder="Add keywords..."
      value={keywords}
      onChange={setKeywords}
    />
  )
}

// ============================================
// Example 9: With React Hook Form
// ============================================
interface FormData {
  emails: string[]
  tags: string[]
  zipCodes: string[]
}

export function ReactHookFormExample() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      emails: [],
      tags: [],
      zipCodes: []
    }
  })

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ChipsField
        name="emails"
        control={control}
        label="Email Addresses"
        type="email"
        placeholder="Enter email addresses..."
        required
      />

      <ChipsField
        name="tags"
        control={control}
        label="Tags"
        placeholder="Add tags..."
        maxChips={10}
      />

      <ChipsField
        name="zipCodes"
        control={control}
        label="Zip Codes"
        type="zipCode"
        placeholder="Enter zip codes..."
      />

      <button type="submit">Submit</button>
    </form>
  )
}

// ============================================
// Example 10: With Callbacks
// ============================================
export function CallbacksExample() {
  const [items, setItems] = useState<string[]>([])

  return (
    <ChipsInput
      label="Items"
      placeholder="Add items..."
      value={items}
      onChange={setItems}
      onChipAdd={(chip) => {
        console.log('Added:', chip)
      }}
      onChipRemove={(chip) => {
        console.log('Removed:', chip)
      }}
      onChipClick={(chip) => {
        console.log('Clicked:', chip)
      }}
    />
  )
}

// ============================================
// Example 11: Phone Numbers
// ============================================
export function PhoneChipsExample() {
  const [phones, setPhones] = useState<string[]>([])

  return (
    <ChipsInput
      label="Phone Numbers"
      type="phone"
      placeholder="Enter phone numbers..."
      value={phones}
      onChange={setPhones}
    />
  )
}

// ============================================
// Example 12: Custom Validation with React Hook Form
// ============================================
export function CustomValidationFormExample() {
  const { control, handleSubmit } = useForm<{ domains: string[] }>({
    defaultValues: { domains: [] }
  })

  const validateDomain = (value: string): boolean => {
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/.test(value)
  }

  const onSubmit = (data: { domains: string[] }) => {
    console.log('Domains:', data.domains)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ChipsField
        name="domains"
        control={control}
        label="Allowed Domains"
        placeholder="Enter domain names..."
        validation={validateDomain}
        errorMessage="Please enter a valid domain name (e.g., example.com)"
        required
      />
      <button type="submit">Save Domains</button>
    </form>
  )
}
