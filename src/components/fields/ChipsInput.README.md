# ChipsInput Component

A fully customizable, theme-matched chips/tags input component with built-in validation support. Works standalone or with React Hook Form.

## Features

✅ **Modular & Flexible** - Use with or without React Hook Form  
✅ **Built-in Validation** - Email, zip code, phone number validators  
✅ **Custom Validation** - Add your own validation logic  
✅ **Theme Matched** - Styled with your gold theme colors  
✅ **Fully Typed** - Complete TypeScript support  
✅ **Keyboard Navigation** - Enter, Tab, Comma to add chips  
✅ **Backspace to Delete** - Remove last chip with backspace  
✅ **Max Chips Limit** - Optional maximum number of chips  
✅ **Object Support** - Work with string arrays or object arrays  
✅ **Responsive** - Mobile-friendly design  
✅ **Accessible** - ARIA labels and keyboard support

## Installation

The component is already installed in your project. Import it from:

```tsx
import { ChipsInput, ChipsField } from '@components/fields'
```

## Basic Usage

### Without React Hook Form

```tsx
import { useState } from 'react'
import { ChipsInput } from '@components/fields'

function MyComponent() {
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
```

### With React Hook Form

```tsx
import { useForm } from 'react-hook-form'
import { ChipsField } from '@components/fields'

interface FormData {
  emails: string[]
}

function MyForm() {
  const { control, handleSubmit } = useForm<FormData>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ChipsField
        name="emails"
        control={control}
        label="Email Addresses"
        type="email"
        required
      />
    </form>
  )
}
```

## Props

### ChipsInput Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string[] \| ChipItem[]` | `[]` | Current chips value |
| `onChange` | `(value) => void` | - | Callback when chips change |
| `type` | `'text' \| 'email' \| 'zipCode' \| 'phone' \| 'custom'` | `'text'` | Built-in validation type |
| `placeholder` | `string` | `'Type and press Enter...'` | Input placeholder |
| `disabled` | `boolean` | `false` | Disable input |
| `readOnly` | `boolean` | `false` | Make read-only |
| `maxLength` | `number` | `524288` | Max input length |
| `maxChips` | `number` | - | Maximum number of chips |
| `validation` | `(value: string) => boolean` | - | Custom validation function |
| `errorMessage` | `string` | - | Custom error message |
| `label` | `string` | - | Field label |
| `required` | `boolean` | `false` | Show required indicator |
| `mode` | `'add' \| 'inline'` | `'add'` | Display mode |
| `dataKeyForLabel` | `string` | - | Key to use for chip label (for objects) |
| `onChipClick` | `(chip) => void` | - | Callback when chip is clicked |
| `onChipRemove` | `(chip) => void` | - | Callback when chip is removed |
| `onChipAdd` | `(chip) => void` | - | Callback when chip is added |

### ChipsField Props (React Hook Form)

Includes all ChipsInput props plus:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | ✅ | Form field name |
| `control` | `Control` | ✅ | React Hook Form control |
| `defaultValue` | `string[] \| ChipItem[]` | - | Default value |

## Built-in Validation Types

### Email
```tsx
<ChipsInput
  type="email"
  label="Email Addresses"
  value={emails}
  onChange={setEmails}
/>
```
Validates: `user@example.com`

### Zip Code
```tsx
<ChipsInput
  type="zipCode"
  label="Zip Codes"
  value={zipCodes}
  onChange={setZipCodes}
/>
```
Validates: 5-digit US zip codes  
Auto-adds chip when 5 digits are entered

### Phone
```tsx
<ChipsInput
  type="phone"
  label="Phone Numbers"
  value={phones}
  onChange={setPhones}
/>
```
Validates: Phone numbers with at least 10 digits

## Custom Validation

```tsx
const validateUsername = (value: string): boolean => {
  return /^[a-zA-Z0-9_]{3,20}$/.test(value)
}

<ChipsInput
  label="Usernames"
  validation={validateUsername}
  errorMessage="Username must be 3-20 characters (letters, numbers, underscores only)"
  value={usernames}
  onChange={setUsernames}
/>
```

## Working with Objects

```tsx
interface Member {
  id: number
  label: string
  value: string
  role: string
}

const [members, setMembers] = useState<Member[]>([
  { id: 1, label: 'John Doe', value: 'john@example.com', role: 'Admin' }
])

<ChipsInput
  label="Team Members"
  value={members}
  onChange={setMembers}
  dataKeyForLabel="label"
  onChipClick={(chip) => console.log('Clicked:', chip)}
/>
```

## Max Chips Limit

```tsx
<ChipsInput
  label="Top 5 Skills"
  maxChips={5}
  value={skills}
  onChange={setSkills}
/>
```

## Callbacks

```tsx
<ChipsInput
  label="Items"
  value={items}
  onChange={setItems}
  onChipAdd={(chip) => console.log('Added:', chip)}
  onChipRemove={(chip) => console.log('Removed:', chip)}
  onChipClick={(chip) => console.log('Clicked:', chip)}
/>
```

## Keyboard Shortcuts

- **Enter** - Add chip
- **Tab** - Add chip
- **Comma (,)** - Add chip
- **Backspace** - Remove last chip (when input is empty)

## Styling

The component uses your theme's SCSS variables:
- `$primary-gold` - Labels and accents
- `$bg-input` - Input background
- `$border-input` - Border color
- `$text-primary` - Text color
- `$status-error` - Error states

Custom styles can be added via `chips-input.scss`.

## Complete Example

```tsx
import { useForm } from 'react-hook-form'
import { ChipsField } from '@components/fields'

interface FormData {
  emails: string[]
  tags: string[]
  domains: string[]
}

function CompleteExample() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      emails: [],
      tags: [],
      domains: []
    }
  })

  const validateDomain = (value: string): boolean => {
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/.test(value)
  }

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
        name="domains"
        control={control}
        label="Allowed Domains"
        placeholder="Enter domain names..."
        validation={validateDomain}
        errorMessage="Please enter a valid domain name"
      />

      <button type="submit">Submit</button>
    </form>
  )
}
```

## TypeScript Types

```tsx
interface ChipItem {
  id: string | number
  label: string
  value: string
  [key: string]: any
}

interface ChipsInputProps {
  value?: string[] | ChipItem[]
  onChange?: (value: string[] | ChipItem[]) => void
  type?: 'text' | 'email' | 'zipCode' | 'phone' | 'custom'
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  maxLength?: number
  maxChips?: number
  validation?: (value: string) => boolean
  errorMessage?: string
  customError?: string
  label?: string
  required?: boolean
  mode?: 'add' | 'inline'
  dataKeyForLabel?: string
  onChipClick?: (chip: string | ChipItem) => void
  onChipRemove?: (chip: string | ChipItem) => void
  onChipAdd?: (chip: string | ChipItem) => void
  name?: string
  error?: any
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Part of the Humanistics AI Admin Portal project.
