# PageTopBar Component Guide

## Overview
The `PageTopBar` component is a reusable top bar for all pages (except Dashboard which has its own `DashboardHeader`). It provides a consistent layout with customizable left and right content sections.

## Component Location
**File**: `src/components/common/PageTopBar.tsx`

## Features
- ✅ Menu toggle button (automatically included)
- ✅ Customizable left content (page title, filters, etc.)
- ✅ Customizable right content (action buttons, etc.)
- ✅ Responsive design
- ✅ Sidebar state awareness
- ✅ Consistent styling with theme

## Props

```typescript
interface PageTopBarProps {
  leftContent?: React.ReactNode;   // Custom content for left section
  rightContent?: React.ReactNode;  // Custom content for right section
  className?: string;              // Additional CSS classes
}
```

## Usage Examples

### 1. Basic Usage - Page Title Only

```tsx
import PageTopBar from '@components/common/PageTopBar'

export default function MyPage() {
  return (
    <>
      <PageTopBar
        leftContent={
          <div className="page-title">My Page Title</div>
        }
      />
      {/* Rest of page content */}
    </>
  )
}
```

### 2. With Action Buttons (User Management Example)

```tsx
import PageTopBar from '@components/common/PageTopBar'
import PrimaryBtn from '@components/buttons/PrimaryBtn'
import SecondaryBtn from '@components/buttons/SecondaryBtn'

export default function Users() {
  const handleAddUser = () => {
    // Add user logic
  }

  const handleExport = () => {
    // Export logic
  }

  return (
    <>
      <PageTopBar
        leftContent={
          <div className="page-title">User Management</div>
        }
        rightContent={
          <>
            <PrimaryBtn onClick={handleAddUser} icon={<span>➕</span>}>
              Add User
            </PrimaryBtn>
            <SecondaryBtn onClick={handleExport} icon={<span>📥</span>}>
              Export
            </SecondaryBtn>
          </>
        }
      />
      {/* Rest of page content */}
    </>
  )
}
```

### 3. With Multiple Left Elements

```tsx
<PageTopBar
  leftContent={
    <>
      <div className="page-title">Templates</div>
      <select className="filter-select">
        <option>All Templates</option>
        <option>Active</option>
        <option>Archived</option>
      </select>
    </>
  }
  rightContent={
    <PrimaryBtn icon={<span>➕</span>}>
      New Template
    </PrimaryBtn>
  }
/>
```

### 4. With Icon Buttons

```tsx
import IconBtn from '@components/buttons/IconBtn'

<PageTopBar
  leftContent={
    <div className="page-title">Audit Trail</div>
  }
  rightContent={
    <>
      <IconBtn variant="gold" size="md">
        🔄
      </IconBtn>
      <SecondaryBtn icon={<span>📥</span>}>
        Download Report
      </SecondaryBtn>
    </>
  }
/>
```

### 5. With Text Buttons

```tsx
import TextBtn from '@components/buttons/TextBtn'

<PageTopBar
  leftContent={
    <div className="page-title">Settings</div>
  }
  rightContent={
    <>
      <TextBtn color="secondary">Cancel</TextBtn>
      <PrimaryBtn>Save Changes</PrimaryBtn>
    </>
  }
/>
```

## Structure

The PageTopBar automatically includes:

```
┌─────────────────────────────────────────────────────────┐
│ [☰] [Left Content]              [Right Content]         │
└─────────────────────────────────────────────────────────┘
```

- **Menu Toggle (☰)**: Always present, toggles sidebar
- **Left Content**: Your custom content (usually page title)
- **Right Content**: Your custom content (usually action buttons)

## Styling

### Page Title
Use the `.page-title` class for consistent page title styling:

```tsx
<div className="page-title">Your Page Title</div>
```

**Styles:**
- Color: Gold (`$primary-gold`)
- Font size: 20px (desktop), 18px (mobile)
- Font weight: Semibold
- No wrapping

### Responsive Behavior

**Desktop (> 768px):**
- Full layout with all elements visible
- Button text visible
- Proper spacing

**Mobile (≤ 768px):**
- Page title font size reduced
- Button text hidden (icons only)
- Reduced spacing
- Optimized for small screens

## Common Patterns

### Pattern 1: List/Table Pages
```tsx
// Users, Templates, Audit Trail, etc.
<PageTopBar
  leftContent={<div className="page-title">Page Name</div>}
  rightContent={
    <>
      <PrimaryBtn icon={<span>➕</span>}>Add Item</PrimaryBtn>
      <SecondaryBtn icon={<span>📥</span>}>Export</SecondaryBtn>
    </>
  }
/>
```

### Pattern 2: Detail/Edit Pages
```tsx
// Edit User, Template Editor, etc.
<PageTopBar
  leftContent={<div className="page-title">Edit Item</div>}
  rightContent={
    <>
      <TextBtn color="secondary">Cancel</TextBtn>
      <PrimaryBtn>Save</PrimaryBtn>
    </>
  }
/>
```

### Pattern 3: Report Pages
```tsx
// Cost Reports, Analytics, etc.
<PageTopBar
  leftContent={
    <>
      <div className="page-title">Reports</div>
      <select>
        <option>Last 7 Days</option>
        <option>Last 30 Days</option>
      </select>
    </>
  }
  rightContent={
    <SecondaryBtn icon={<span>📥</span>}>Download</SecondaryBtn>
  }
/>
```

## Integration with PageHeader

You can use both `PageTopBar` and `PageHeader` together:

```tsx
export default function Users() {
  return (
    <>
      {/* Top Bar - Fixed at top with actions */}
      <PageTopBar
        leftContent={<div className="page-title">User Management</div>}
        rightContent={
          <PrimaryBtn icon={<span>➕</span>}>Add User</PrimaryBtn>
        }
      />

      {/* Page Header - Breadcrumbs and title */}
      <PageHeader
        title="User Management"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'User Management', active: true }
        ]}
      />

      {/* Page Content */}
      <div className="page-content">
        {/* Your content here */}
      </div>
    </>
  )
}
```

## Differences from DashboardHeader

| Feature | DashboardHeader | PageTopBar |
|---------|----------------|------------|
| **Use Case** | Dashboard page only | All other pages |
| **Search Bar** | ✅ Included | ❌ Not included |
| **Notifications** | ✅ Included | ❌ Not included |
| **Messages** | ✅ Included | ❌ Not included |
| **User Menu** | ✅ Included | ❌ Not included |
| **Custom Content** | ❌ Fixed layout | ✅ Fully customizable |
| **Menu Toggle** | ✅ Included | ✅ Included |

## Best Practices

1. **Keep it Simple**: Don't overcrowd the top bar
2. **Use Icons**: Always include icons with buttons for better UX
3. **Consistent Titles**: Use `.page-title` class for all page titles
4. **Action Hierarchy**: Primary action = PrimaryBtn, Secondary = SecondaryBtn
5. **Mobile First**: Test on mobile to ensure buttons work with icons only
6. **Limit Buttons**: Maximum 2-3 buttons in right content for best UX

## Examples by Page Type

### User Management
```tsx
leftContent: "User Management"
rightContent: Add User, Export
```

### Templates
```tsx
leftContent: "Templates"
rightContent: New Template, Import
```

### Audit Trail
```tsx
leftContent: "Audit Trail"
rightContent: Refresh, Export
```

### Cost Reports
```tsx
leftContent: "Cost Reports" + Date Filter
rightContent: Download Report
```

### Settings
```tsx
leftContent: "Settings"
rightContent: Cancel, Save Changes
```

## Migration from HTML

If you have an HTML reference (like `user1.html`), here's how to convert:

**HTML:**
```html
<div class="topbar">
  <div class="page-title">User Management</div>
  <div class="topbar-right">
    <button class="btn">➕ Add User</button>
    <button class="btn btn-secondary">📥 Export</button>
  </div>
</div>
```

**React (PageTopBar):**
```tsx
<PageTopBar
  leftContent={<div className="page-title">User Management</div>}
  rightContent={
    <>
      <PrimaryBtn icon={<span>➕</span>}>Add User</PrimaryBtn>
      <SecondaryBtn icon={<span>📥</span>}>Export</SecondaryBtn>
    </>
  }
/>
```

## Troubleshooting

**Issue**: Buttons not showing on mobile
- **Solution**: Make sure icons are included, text hides automatically

**Issue**: Title overlapping with buttons
- **Solution**: Keep title text short or use abbreviations on mobile

**Issue**: Too many buttons
- **Solution**: Use IconBtn for less important actions or move to dropdown menu

**Issue**: Custom styling not applying
- **Solution**: Use `className` prop on PageTopBar or wrap content in styled div
