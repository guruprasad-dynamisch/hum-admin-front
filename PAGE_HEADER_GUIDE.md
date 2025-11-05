# PageHeader Component Guide

## Overview
A reusable page header component for individual pages. Each page can have its own custom header with title, subtitle, breadcrumbs, and action buttons.

## Why Per-Page Headers?

The `DashboardHeader` is specific to the dashboard page. Other pages (Users, Settings, Reports, etc.) should have their own headers with page-specific content.

## Files Created

### Component
- **`src/components/common/PageHeader.tsx`** - Reusable page header

### Styles
- **`src/styles/components/page-header.scss`** - Page header styles

### Updated
- **`src/components/ProtectedLayout.tsx`** - Removed global header
- **`src/styles/components/protected-layout.scss`** - Adjusted layout
- **`src/styles/components/index.scss`** - Added page-header import

## Usage

### Basic Usage
```tsx
import PageHeader from '@components/common/PageHeader'

function UsersPage() {
  return (
    <>
      <PageHeader title="Users" />
      <div className="page-content">
        {/* Page content */}
      </div>
    </>
  )
}
```

### With Subtitle
```tsx
<PageHeader 
  title="Users Management"
  subtitle="Manage all users and their permissions"
/>
```

### With Actions
```tsx
<PageHeader 
  title="Users"
  subtitle="Manage all users"
  actions={
    <>
      <Button variant="outline-secondary">Export</Button>
      <Button variant="primary">Add User</Button>
    </>
  }
/>
```

### With Breadcrumbs
```tsx
<PageHeader 
  title="User Details"
  breadcrumbs={[
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Users', path: '/users' },
    { label: 'John Doe' }
  ]}
/>
```

### Complete Example
```tsx
import PageHeader from '@components/common/PageHeader'
import { Button } from 'react-bootstrap'
import IconBtn from '@components/buttons/IconBtn'

function UsersPage() {
  return (
    <>
      <PageHeader 
        title="Users Management"
        subtitle="Manage all users and their permissions"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Users' }
        ]}
        actions={
          <>
            <IconBtn variant="secondary">
              ⚙️
            </IconBtn>
            <Button variant="outline-secondary">
              Export
            </Button>
            <Button variant="primary">
              + Add User
            </Button>
          </>
        }
      />
      
      <div className="page-content">
        {/* Your page content */}
      </div>
    </>
  )
}
```

## Props API

```typescript
interface PageHeaderProps {
  title: string                    // Page title (required)
  subtitle?: string                // Optional subtitle
  actions?: React.ReactNode        // Action buttons/components
  breadcrumbs?: Array<{            // Breadcrumb navigation
    label: string
    path?: string
  }>
  className?: string               // Additional CSS classes
}
```

### Prop Details

#### `title` (required)
- **Type:** `string`
- **Description:** Main page title
- **Example:** `"Users Management"`

#### `subtitle` (optional)
- **Type:** `string`
- **Description:** Subtitle or description
- **Example:** `"Manage all users and their permissions"`

#### `actions` (optional)
- **Type:** `React.ReactNode`
- **Description:** Action buttons or components
- **Example:** `<Button>Add User</Button>`

#### `breadcrumbs` (optional)
- **Type:** `Array<{ label: string; path?: string }>`
- **Description:** Breadcrumb navigation items
- **Example:** 
  ```tsx
  [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Users' }
  ]
  ```

#### `className` (optional)
- **Type:** `string`
- **Description:** Additional CSS classes
- **Example:** `"custom-header"`

## Page Examples

### Dashboard Page
```tsx
import DashboardHeader from '@components/dashboard/DashboardHeader'

function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <div className="page-content">
        {/* Dashboard content */}
      </div>
    </>
  )
}
```

### Users Page
```tsx
import PageHeader from '@components/common/PageHeader'
import { Button } from 'react-bootstrap'

function UsersPage() {
  return (
    <>
      <PageHeader 
        title="Users"
        subtitle="Manage all users and permissions"
        actions={
          <Button variant="primary">+ Add User</Button>
        }
      />
      <div className="page-content">
        {/* Users list */}
      </div>
    </>
  )
}
```

### Settings Page
```tsx
import PageHeader from '@components/common/PageHeader'

function SettingsPage() {
  return (
    <>
      <PageHeader 
        title="Settings"
        subtitle="Configure your application settings"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Settings' }
        ]}
      />
      <div className="page-content">
        {/* Settings form */}
      </div>
    </>
  )
}
```

### User Details Page
```tsx
import PageHeader from '@components/common/PageHeader'
import { Button } from 'react-bootstrap'

function UserDetailsPage({ user }) {
  return (
    <>
      <PageHeader 
        title={user.name}
        subtitle={user.email}
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Users', path: '/users' },
          { label: user.name }
        ]}
        actions={
          <>
            <Button variant="outline-secondary">Edit</Button>
            <Button variant="danger">Delete</Button>
          </>
        }
      />
      <div className="page-content">
        {/* User details */}
      </div>
    </>
  )
}
```

### Reports Page
```tsx
import PageHeader from '@components/common/PageHeader'
import { Button } from 'react-bootstrap'
import IconBtn from '@components/buttons/IconBtn'

function ReportsPage() {
  return (
    <>
      <PageHeader 
        title="Reports"
        subtitle="View and generate reports"
        actions={
          <>
            <IconBtn variant="secondary">📊</IconBtn>
            <Button variant="outline-secondary">Export PDF</Button>
            <Button variant="primary">Generate Report</Button>
          </>
        }
      />
      <div className="page-content">
        {/* Reports content */}
      </div>
    </>
  )
}
```

## Styling

### Default Styles
- **Background:** `$bg-secondary` (#1a1a1a)
- **Border:** Bottom border (#2a2a2a)
- **Padding:** 24px
- **Min Height:** 100px

### Title Styles
- **Font Size:** 30px (1.5 * xl)
- **Font Weight:** Bold
- **Color:** White (#ffffff)

### Subtitle Styles
- **Font Size:** 16px (md)
- **Color:** Gray (#888888)

### Breadcrumbs
- **Font Size:** 14px (sm)
- **Color:** Gray (#888888)
- **Hover:** Gold (#e2c36a)

## Layout Structure

```
┌─────────────────────────────────────────────────┐
│ PageHeader                                      │
│ ┌─────────────────────────┬─────────────────┐  │
│ │ Breadcrumbs             │                 │  │
│ │ Home / Users / Details  │                 │  │
│ ├─────────────────────────┤    Actions      │  │
│ │ Title                   │  [Edit] [Save]  │  │
│ │ Subtitle text here      │                 │  │
│ └─────────────────────────┴─────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (>768px)
- Horizontal layout
- Title and actions side-by-side
- Full padding

### Tablet (≤768px)
- Vertical layout
- Title above actions
- Reduced padding

### Mobile (≤480px)
- Vertical layout
- Smaller font sizes
- Minimal padding

## Best Practices

### 1. Always Use a Page Header
```tsx
// Good
<>
  <PageHeader title="Users" />
  <div className="page-content">...</div>
</>

// Avoid - no header
<div className="page-content">...</div>
```

### 2. Use Descriptive Titles
```tsx
// Good
<PageHeader title="User Management" />

// Avoid
<PageHeader title="Page" />
```

### 3. Add Subtitles for Context
```tsx
// Good
<PageHeader 
  title="Users"
  subtitle="Manage all users and their permissions"
/>

// Okay (but less informative)
<PageHeader title="Users" />
```

### 4. Use Breadcrumbs for Deep Pages
```tsx
// Good for nested pages
<PageHeader 
  title="User Details"
  breadcrumbs={[
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Users', path: '/users' },
    { label: 'John Doe' }
  ]}
/>
```

### 5. Group Related Actions
```tsx
// Good
<PageHeader 
  actions={
    <>
      <IconBtn>⚙️</IconBtn>
      <Button variant="outline">Export</Button>
      <Button variant="primary">Add</Button>
    </>
  }
/>
```

## Page Content Layout

### Recommended Structure
```tsx
function MyPage() {
  return (
    <>
      {/* Page Header */}
      <PageHeader title="My Page" />
      
      {/* Page Content with padding */}
      <div style={{ padding: '24px' }}>
        <div className="container-fluid">
          {/* Your content */}
        </div>
      </div>
    </>
  )
}
```

### With Custom Styling
```tsx
function MyPage() {
  return (
    <>
      <PageHeader title="My Page" />
      
      <div className="page-wrapper">
        {/* Your content */}
      </div>
    </>
  )
}

// In your SCSS
.page-wrapper {
  padding: $spacing-xxl;
  background: $bg-primary;
}
```

## Customization

### Custom Header Style
```tsx
<PageHeader 
  title="Custom Page"
  className="custom-header"
/>
```

```scss
.custom-header {
  background: linear-gradient(135deg, $bg-secondary, $bg-tertiary);
  border-bottom: 2px solid $primary-gold;
}
```

### Custom Title Color
```scss
.page-header {
  .page-title {
    color: $primary-gold;
  }
}
```

### Add Background Image
```scss
.page-header {
  background-image: url('/path/to/image.jpg');
  background-size: cover;
  background-position: center;
}
```

## Accessibility

### Built-in Features
- ✅ Semantic HTML (`<h1>`, `<nav>`)
- ✅ ARIA labels for breadcrumbs
- ✅ Keyboard navigation
- ✅ Screen reader friendly

### Best Practices
```tsx
// Add aria-label for actions
<PageHeader 
  actions={
    <Button aria-label="Add new user">
      + Add User
    </Button>
  }
/>
```

## Migration from Global Header

### Before (Global Header in ProtectedLayout)
```tsx
// ProtectedLayout.tsx
<DashboardHeader />
<main>
  <Outlet />
</main>
```

### After (Per-Page Headers)
```tsx
// ProtectedLayout.tsx
<main>
  <Outlet />
</main>

// Each page
function UsersPage() {
  return (
    <>
      <PageHeader title="Users" />
      {/* content */}
    </>
  )
}
```

## Benefits

✅ **Flexible** - Each page has its own header  
✅ **Customizable** - Different titles, actions per page  
✅ **Breadcrumbs** - Easy navigation  
✅ **Responsive** - Mobile-friendly  
✅ **Consistent** - Same design across pages  
✅ **Reusable** - One component for all pages  

---

**Status:** ✅ Complete  
**Usage:** Import and use in each page  
**Layout:** ProtectedLayout has no global header
