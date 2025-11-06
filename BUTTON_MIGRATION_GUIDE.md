# Button Migration Guide - MUI to Native HTML

## Overview
All button components have been migrated from Material-UI (MUI) to native HTML buttons with custom SCSS styling that matches your current theme.

## Migrated Components

### 1. **PrimaryBtn** (Contained/Filled Button)
- **File**: `src/components/buttons/PrimaryBtn.tsx`
- **Style**: Gold background with dark text
- **Usage**: Main action buttons

**Props:**
```typescript
{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}
```

**Examples:**
```tsx
<PrimaryBtn onClick={handleSubmit} loading={isLoading}>
  Submit
</PrimaryBtn>

<PrimaryBtn icon={<SaveIcon />} iconPosition="start">
  Save Changes
</PrimaryBtn>

<PrimaryBtn icon={<ArrowRightIcon />} iconPosition="end">
  Next
</PrimaryBtn>
```

### 2. **SecondaryBtn** (Outlined Button)
- **File**: `src/components/buttons/SecondaryBtn.tsx`
- **Style**: Transparent background with border
- **Usage**: Secondary actions

**Props:**
```typescript
{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  className?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}
```

**Examples:**
```tsx
<SecondaryBtn onClick={handleCancel}>
  Cancel
</SecondaryBtn>

<SecondaryBtn icon={<FilterIcon />} iconPosition="start">
  Filter
</SecondaryBtn>

<SecondaryBtn icon={<DownloadIcon />} iconPosition="end">
  Export
</SecondaryBtn>
```

### 3. **TextBtn** (Text/Ghost Button)
- **File**: `src/components/buttons/TextBtn.tsx`
- **Style**: No background, text only
- **Usage**: Tertiary actions, links

**Props:**
```typescript
{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
  color?: "primary" | "secondary" | "error" | "warning";
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}
```

**Color Variants:**
- `primary` - Gold color (default)
- `secondary` - Gray color
- `error` - Red color
- `warning` - Yellow/orange color

**Example:**
```tsx
<TextBtn color="error" icon={<DeleteIcon />}>
  Delete
</TextBtn>
```

### 4. **OutlinedIconBtn** (Icon Button with Label)
- **File**: `src/components/buttons/OutlinedIconBtn.tsx`
- **Style**: Rounded pill-style button
- **Usage**: Icon + text combinations

**Props:**
```typescript
{
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
```

**Example:**
```tsx
<OutlinedIconBtn 
  onClick={handleAction}
  label="Add Item"
  startIcon={<AddIcon />}
/>
```

### 5. **IconBtn** (Icon-Only Button)
- **File**: `src/components/buttons/IconBtn.tsx`
- **Style**: Icon-only, no text
- **Usage**: Toolbar actions, compact spaces
- **Note**: Already uses native HTML - no changes needed

## Removed Props

The following MUI-specific props have been removed:

- ❌ `variant` - Now determined by component choice
- ❌ `color` (except TextBtn) - Styling is built-in
- ❌ `sx` - Use `className` instead
- ❌ All MUI-specific props

## New SCSS File

**File**: `src/styles/components/buttons.scss`

This file contains all button styles matching your theme variables:
- `.btn` - Base button styles
- `.btn-primary` - Primary/contained button
- `.btn-secondary` - Secondary/outlined button
- `.btn-text` - Text button with color variants
- `.btn-outlined-icon` - Outlined icon button
- `.btn-full-width` - Full width modifier
- `.btn-spinner` - Loading spinner animation

## Theme Integration

All buttons now use your SCSS variables from `_variables.scss`:
- `$primary-gold` - Main brand color
- `$bg-primary`, `$bg-secondary` - Background colors
- `$text-primary`, `$text-secondary` - Text colors
- `$border-default`, `$border-hover` - Border colors
- `$status-*` - Status colors (error, success, warning)
- `$transition-fast` - Smooth transitions
- `$spacing-*` - Consistent spacing

## Migration Checklist

When updating existing code:

1. ✅ Remove MUI imports (`Button`, `CircularProgress`, `Box`)
2. ✅ Remove `variant` prop (choose correct component instead)
3. ✅ Remove `color` prop (except for TextBtn)
4. ✅ Replace `sx` prop with `className` if needed
5. ✅ Keep `loading`, `disabled`, `fullWidth`, `type` props as-is

## Benefits

✅ **No MUI dependency** for buttons
✅ **Smaller bundle size** - Native HTML is lighter
✅ **Full theme control** - All styles in SCSS
✅ **Better performance** - No React component overhead
✅ **Consistent design** - Matches your design system
✅ **Accessibility** - Proper focus states and keyboard support
✅ **Responsive** - Mobile-friendly sizing

## Next Steps

You can now safely remove MUI Button imports from your project once all button usages are migrated. The buttons will work seamlessly with your existing theme and design system.
