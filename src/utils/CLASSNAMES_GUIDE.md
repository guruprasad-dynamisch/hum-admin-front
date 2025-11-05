# ClassNames Utility Guide

## Overview
A lightweight utility function for conditionally joining CSS class names together, similar to the popular `classnames` npm package.

## Location
`src/utils/classNames.ts`

## Available Functions

### `cn(...classes)`
Main function for combining class names.

### `classNames(...classes)` 
Alias for `cn()` - more explicit name.

### `clsx(...classes)`
Alias for `cn()` - shorter name (compatible with clsx package).

## Basic Usage

### Simple Strings
```tsx
import { cn } from '@utils/classNames'

cn('foo', 'bar') // 'foo bar'
cn('foo', 'bar', 'baz') // 'foo bar baz'
```

### With Conditionals
```tsx
const isActive = true
const isDisabled = false

cn('btn', isActive && 'active') 
// Result: 'btn active'

cn('btn', isDisabled && 'disabled') 
// Result: 'btn'
```

### With Objects
```tsx
const isActive = true
const isDisabled = false

cn('btn', {
  'active': isActive,
  'disabled': isDisabled
})
// Result: 'btn active'

cn('sidebar', {
  'expanded': isOpen,
  'collapsed': !isOpen,
  'mobile-open': mobileOpen
})
// Result: 'sidebar expanded mobile-open' (if isOpen=true, mobileOpen=true)
```

### With Arrays
```tsx
cn(['foo', 'bar'], 'baz') 
// Result: 'foo bar baz'

cn(['btn', 'btn-primary'], { 'btn-lg': isLarge })
// Result: 'btn btn-primary btn-lg' (if isLarge=true)
```

### Mixed Usage
```tsx
cn(
  'btn',
  {
    'btn-primary': isPrimary,
    'btn-secondary': !isPrimary,
    'btn-disabled': isDisabled
  },
  isLarge && 'btn-lg',
  className // From props
)
```

## Real-World Examples

### Example 1: Sidebar Component
```tsx
import { cn } from '@utils/classNames'

function Sidebar({ isOpen, mobileOpen }) {
  return (
    <nav className={cn('sidebar', {
      'expanded': isOpen,
      'collapsed': !isOpen,
      'mobile-open': mobileOpen
    })}>
      {/* Content */}
    </nav>
  )
}
```

**Before:**
```tsx
const sidebarClasses = [
  'sidebar',
  isOpen ? 'expanded' : 'collapsed',
  mobileOpen ? 'mobile-open' : ''
].filter(Boolean).join(' ')

<nav className={sidebarClasses}>
```

**After:**
```tsx
<nav className={cn('sidebar', {
  'expanded': isOpen,
  'collapsed': !isOpen,
  'mobile-open': mobileOpen
})}>
```

### Example 2: Button Component
```tsx
import { cn } from '@utils/classNames'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

function Button({ variant = 'primary', size = 'md', disabled, className, children }: ButtonProps) {
  return (
    <button
      className={cn(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        {
          'btn-disabled': disabled
        },
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

### Example 3: Card Component
```tsx
import { cn } from '@utils/classNames'

function Card({ isActive, isHovered, className, children }) {
  return (
    <div className={cn(
      'card',
      {
        'card-active': isActive,
        'card-hover': isHovered
      },
      className
    )}>
      {children}
    </div>
  )
}
```

### Example 4: NavLink with Active State
```tsx
import { NavLink } from 'react-router-dom'
import { cn } from '@utils/classNames'

function NavItem({ to, collapsed, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn('nav-item', {
        'collapsed': collapsed,
        'active': isActive
      })}
    >
      {children}
    </NavLink>
  )
}
```

### Example 5: Form Input
```tsx
import { cn } from '@utils/classNames'

function Input({ error, disabled, className, ...props }) {
  return (
    <input
      className={cn(
        'form-input',
        {
          'input-error': error,
          'input-disabled': disabled
        },
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
}
```

## TypeScript Support

The utility is fully typed with TypeScript:

```typescript
type ClassValue = 
  | string 
  | number 
  | boolean 
  | undefined 
  | null 
  | ClassObject 
  | ClassArray

interface ClassObject {
  [key: string]: boolean | undefined | null
}

function cn(...classes: ClassValue[]): string
```

## Comparison with Manual Concatenation

### Manual Way (Before)
```tsx
// Method 1: Template literals
const className = `btn ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`

// Method 2: Array join
const className = ['btn', isActive && 'active', isDisabled && 'disabled']
  .filter(Boolean)
  .join(' ')

// Method 3: Ternary chains
const className = `btn ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`
```

### With cn() Utility (After)
```tsx
const className = cn('btn', {
  'active': isActive,
  'disabled': isDisabled
})
```

## Benefits

### 1. **Cleaner Code**
- More readable and maintainable
- Less boilerplate
- Consistent pattern

### 2. **Type Safety**
- Full TypeScript support
- Autocomplete in IDE
- Type checking

### 3. **Flexible**
- Supports strings, objects, arrays
- Handles falsy values automatically
- Works with conditional logic

### 4. **Performance**
- Lightweight (no dependencies)
- Efficient implementation
- No runtime overhead

### 5. **Familiar**
- Same API as `classnames` package
- Compatible with `clsx` package
- Easy to learn

## Best Practices

### 1. Use Objects for Conditionals
```tsx
// Good
cn('btn', { 'active': isActive })

// Avoid
cn('btn', isActive ? 'active' : '')
```

### 2. Keep Base Classes First
```tsx
// Good
cn('btn', 'btn-primary', { 'active': isActive })

// Avoid
cn({ 'active': isActive }, 'btn', 'btn-primary')
```

### 3. Accept className Props
```tsx
// Good - allows customization
function Component({ className, ...props }) {
  return <div className={cn('base-class', className)} {...props} />
}
```

### 4. Use Meaningful Names
```tsx
// Good
cn('sidebar', { 'expanded': isOpen })

// Avoid
cn('sidebar', { 'exp': isOpen })
```

## Common Patterns

### Pattern 1: Base + Variants
```tsx
cn('btn', `btn-${variant}`, `btn-${size}`)
```

### Pattern 2: Base + Modifiers
```tsx
cn('card', {
  'card-active': isActive,
  'card-disabled': isDisabled,
  'card-loading': isLoading
})
```

### Pattern 3: Base + State + Custom
```tsx
cn('input', {
  'input-error': hasError,
  'input-focus': isFocused
}, className)
```

### Pattern 4: Conditional Entire Class
```tsx
cn({
  'text-primary': !isError,
  'text-error': isError
})
```

## Migration Guide

### From Template Literals
```tsx
// Before
className={`btn ${isActive ? 'active' : ''}`}

// After
className={cn('btn', { 'active': isActive })}
```

### From Array.join()
```tsx
// Before
className={['btn', isActive && 'active'].filter(Boolean).join(' ')}

// After
className={cn('btn', isActive && 'active')}
```

### From Multiple Ternaries
```tsx
// Before
className={`btn ${isPrimary ? 'btn-primary' : 'btn-secondary'} ${isLarge ? 'btn-lg' : ''}`}

// After
className={cn('btn', {
  'btn-primary': isPrimary,
  'btn-secondary': !isPrimary,
  'btn-lg': isLarge
})}
```

## Testing

```typescript
import { cn } from '@utils/classNames'

// Test basic usage
expect(cn('foo', 'bar')).toBe('foo bar')

// Test with conditionals
expect(cn('foo', true && 'bar')).toBe('foo bar')
expect(cn('foo', false && 'bar')).toBe('foo')

// Test with objects
expect(cn('foo', { bar: true, baz: false })).toBe('foo bar')

// Test with arrays
expect(cn(['foo', 'bar'])).toBe('foo bar')

// Test with mixed
expect(cn('foo', { bar: true }, 'baz')).toBe('foo bar baz')
```

## FAQs

### Q: Should I install the classnames package?
**A:** No, use the built-in `cn()` utility from `@utils/classNames`.

### Q: Can I use this with Tailwind CSS?
**A:** Yes! It works perfectly with any CSS framework.

### Q: What about performance?
**A:** The utility is highly optimized and has minimal overhead.

### Q: Can I use it with CSS Modules?
**A:** Yes, though we're using normal SCSS now, not modules.

### Q: Is it compatible with the classnames package?
**A:** Yes, it has the same API and behavior.

## Resources

- **Source Code:** `src/utils/classNames.ts`
- **Usage Examples:** See sidebar components
- **Similar Packages:** classnames, clsx

---

**Pro Tip:** Use the `cn()` function everywhere you need conditional class names for cleaner, more maintainable code!
