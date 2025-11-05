# UserMenu Component

## Overview
A reusable user menu component that displays user avatar with initials, name, and role. Automatically reads user data from Redux store.

## Files Created

### Component
- **`src/components/common/UserMenu.tsx`** - UserMenu component

### Styles
- **`src/styles/components/user-menu.scss`** - UserMenu styles

### Updated
- **`src/components/dashboard/DashboardHeader.tsx`** - Uses UserMenu component
- **`src/styles/components/index.scss`** - Added user-menu import

## Features

✅ **Redux Integration** - Reads user data from Redux store  
✅ **Avatar with Initials** - Uses `getUserInitials()` utility  
✅ **User Info Display** - Shows name and role  
✅ **Click Handler** - Navigates to profile by default  
✅ **Responsive** - Hides user info on mobile  
✅ **Hover Effect** - Visual feedback  
✅ **Gradient Avatar** - Gold gradient background  

## Usage

### Basic Usage
```tsx
import UserMenu from '@components/common/UserMenu'

function Header() {
  return (
    <div className="header">
      <UserMenu />
    </div>
  )
}
```

### With Custom Click Handler
```tsx
import UserMenu from '@components/common/UserMenu'

function Header() {
  const handleUserClick = () => {
    console.log('User menu clicked')
    // Custom logic
  }

  return (
    <UserMenu onClick={handleUserClick} />
  )
}
```

### With Custom Class
```tsx
<UserMenu className="my-custom-class" />
```

## Props

```typescript
interface UserMenuProps {
  onClick?: () => void    // Custom click handler (optional)
  className?: string      // Additional CSS class (optional)
}
```

### Prop Details

#### `onClick` (optional)
- **Type:** `() => void`
- **Default:** Navigates to `/profile`
- **Description:** Custom click handler for the user menu

#### `className` (optional)
- **Type:** `string`
- **Description:** Additional CSS class for styling

## Component Structure

```tsx
<div className="user-menu">
  <div className="user-menu-avatar">
    {getUserInitials(user?.name)}
  </div>
  <div className="user-menu-info">
    <div className="user-menu-name">
      {user?.name || 'Admin User'}
    </div>
    <div className="user-menu-role">
      {user?.userType || 'Administrator'}
    </div>
  </div>
</div>
```

## Styling

### Colors
- **Avatar Background:** Linear gradient (gold)
- **Avatar Text:** Dark background color
- **Name:** White text
- **Role:** Gray text
- **Hover Background:** Light gold

### Sizes
- **Avatar:** 40px × 40px (36px on mobile)
- **Font Size (Name):** 14px (sm)
- **Font Size (Role):** 12px (xs)

### Classes
- `.user-menu` - Main container
- `.user-menu-avatar` - Avatar circle
- `.user-menu-info` - Info wrapper
- `.user-menu-name` - User name
- `.user-menu-role` - User role

## Redux Integration

The component automatically reads from Redux:

```tsx
import { useAppSelector } from '@redux/store'
import { selectUser } from '@redux/slices/authSlice'

const user = useAppSelector(selectUser)
```

**User Data:**
- `user.name` - User's full name
- `user.userType` - User's role/type

## Examples

### In DashboardHeader
```tsx
import UserMenu from '@components/common/UserMenu'

function DashboardHeader() {
  return (
    <div className="topbar">
      <div className="topbar-right">
        <IconBtn>🔔</IconBtn>
        <IconBtn>💬</IconBtn>
        <UserMenu />
      </div>
    </div>
  )
}
```

### In Navbar
```tsx
import UserMenu from '@components/common/UserMenu'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Logo</div>
      <div className="navbar-end">
        <UserMenu />
      </div>
    </nav>
  )
}
```

### With Dropdown Menu
```tsx
import { useState } from 'react'
import UserMenu from '@components/common/UserMenu'

function Header() {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="header">
      <UserMenu onClick={() => setShowDropdown(!showDropdown)} />
      
      {showDropdown && (
        <div className="dropdown-menu">
          <a href="/profile">Profile</a>
          <a href="/settings">Settings</a>
          <a href="/logout">Logout</a>
        </div>
      )}
    </div>
  )
}
```

## Responsive Behavior

### Desktop (>768px)
- Full display with avatar, name, and role
- 40px avatar size
- All text visible

### Tablet/Mobile (≤768px)
- Avatar only (name and role hidden)
- Reduced padding
- 36px avatar size on mobile

## Customization

### Change Avatar Size
```scss
.user-menu-avatar {
  width: 50px;
  height: 50px;
  font-size: $font-size-md;
}
```

### Change Avatar Colors
```scss
.user-menu-avatar {
  background: linear-gradient(135deg, #your-color, #your-dark-color);
  color: #your-text-color;
}
```

### Add Border
```scss
.user-menu {
  border: 1px solid $border-default;
  border-radius: $border-radius-lg;
}
```

### Change Hover Effect
```scss
.user-menu {
  &:hover {
    background: $primary-gold-light;
    transform: translateY(-2px);
  }
}
```

## Default Behavior

### No User Data
If no user is logged in or data is unavailable:
- **Avatar:** Shows "AU" (Admin User)
- **Name:** Shows "Admin User"
- **Role:** Shows "Administrator"

### Click Behavior
By default, clicking the user menu:
1. Navigates to `/profile` route
2. Can be overridden with custom `onClick` handler

## Integration with DashboardHeader

**Before:**
```tsx
<div className="topbar-user-menu" onClick={handleUserMenuClick}>
  <div className="topbar-user-avatar">
    {getUserInitials(user?.name)}
  </div>
  <div className="topbar-user-info">
    <div className="topbar-user-name">{user?.name}</div>
    <div className="topbar-user-role">{user?.userType}</div>
  </div>
</div>
```

**After:**
```tsx
<UserMenu />
```

## Benefits

✅ **Reusable** - Use in any component  
✅ **Self-contained** - Manages its own state and navigation  
✅ **Redux Connected** - Automatically reads user data  
✅ **Responsive** - Mobile-friendly  
✅ **Customizable** - Props for custom behavior  
✅ **Consistent** - Same design everywhere  
✅ **Maintainable** - Single source of truth  

## Testing

```tsx
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@redux/store'
import UserMenu from '@components/common/UserMenu'

test('renders user menu', () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <UserMenu />
      </BrowserRouter>
    </Provider>
  )

  expect(getByText('Admin User')).toBeInTheDocument()
})
```

---

**Status:** ✅ Complete  
**Reusable:** Yes  
**Redux Connected:** Yes  
**Responsive:** Mobile-friendly
