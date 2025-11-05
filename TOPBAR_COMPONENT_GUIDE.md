# Topbar Component Guide

## Overview
A responsive topbar component matching the design from `dashboard.html` with search, notifications, messages, and user menu.

## Files Created

### Component
- **`src/components/Topbar.tsx`** - Main topbar component

### Styles
- **`src/styles/components/topbar.scss`** - Topbar styles
- **`src/styles/components/protected-layout.scss`** - Layout styles

### Updated
- **`src/components/ProtectedLayout.tsx`** - Integrated topbar with sidebar
- **`src/styles/components/index.scss`** - Added topbar imports

## Features

### 1. **Menu Toggle Button**
- Hamburger icon (☰)
- Toggles sidebar open/closed
- Gold color on hover
- Responsive click feedback

### 2. **Search Bar**
- Search icon (🔍)
- Input field with placeholder
- Focus state with gold border
- Auto-submit on enter
- Hidden on mobile

### 3. **Notification Button**
- Bell icon (🔔)
- Badge showing count (3)
- Hover effect
- Click handler ready

### 4. **Messages Button**
- Chat icon (💬)
- Hover effect
- Click handler ready

### 5. **User Menu**
- User avatar with initials
- User name display
- User role display
- Click to navigate to profile
- Hover effect
- Gradient background

## Design Specifications

### Layout
- **Height:** 70px
- **Position:** Fixed at top
- **Left offset:** Adjusts with sidebar (250px expanded, 72px collapsed)
- **Z-index:** 999
- **Background:** Dark (#1a1a1a)
- **Border:** Bottom border (#2a2a2a)

### Colors
- **Background:** `$bg-secondary` (#1a1a1a)
- **Border:** `$border-default` (#2a2a2a)
- **Icons:** `$text-secondary` (#888888)
- **Hover:** `$primary-gold` (#e2c36a)
- **Badge:** `$status-error` (#ff4444)

### Spacing
- **Padding:** 0 24px
- **Gap:** 20px between elements
- **Icon size:** 22px
- **Avatar size:** 40px

## Usage

### Basic Usage
```tsx
import Topbar from '@components/Topbar'

function Layout() {
  return (
    <>
      <Topbar />
      <main>{/* Content */}</main>
    </>
  )
}
```

### With Sidebar Integration
```tsx
import { useState } from 'react'
import Sidebar from '@components/Sidebar'
import Topbar from '@components/Topbar'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <>
      <Sidebar open={sidebarOpen} onToggle={setSidebarOpen} />
      <Topbar 
        sidebarOpen={sidebarOpen}
        sidebarCollapsed={!sidebarOpen}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main>{/* Content */}</main>
    </>
  )
}
```

### In ProtectedLayout (Recommended)
The topbar is already integrated in `ProtectedLayout.tsx`:

```tsx
import ProtectedLayout from '@components/ProtectedLayout'

// In your routes
<Route element={<ProtectedLayout />}>
  <Route path="/dashboard" element={<Dashboard />} />
  {/* Other protected routes */}
</Route>
```

## Props

```typescript
interface TopbarProps {
  sidebarOpen?: boolean       // Is sidebar open?
  sidebarCollapsed?: boolean  // Is sidebar collapsed?
  onMenuToggle?: () => void   // Menu toggle handler
}
```

### Prop Details

#### `sidebarOpen` (optional)
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Controls topbar left offset based on sidebar state

#### `sidebarCollapsed` (optional)
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Adjusts topbar position when sidebar is collapsed

#### `onMenuToggle` (optional)
- **Type:** `() => void`
- **Description:** Callback when menu toggle button is clicked

## Components Breakdown

### Menu Toggle Button
```tsx
<button className="topbar-menu-toggle" onClick={onMenuToggle}>
  ☰
</button>
```

**Classes:**
- `.topbar-menu-toggle` - Main button style

**Features:**
- Gold color
- Hover background
- Click scale effect

### Search Bar
```tsx
<form className="topbar-search-bar" onSubmit={handleSearch}>
  <span className="search-icon">🔍</span>
  <input type="text" placeholder="Search..." />
</form>
```

**Classes:**
- `.topbar-search-bar` - Container
- `.search-icon` - Icon wrapper

**Features:**
- Dark background
- Gold focus border
- 300px width
- Hidden on mobile

### Icon Buttons
```tsx
<button className="topbar-icon-btn">
  🔔
  <span className="topbar-badge">3</span>
</button>
```

**Classes:**
- `.topbar-icon-btn` - Button style
- `.topbar-badge` - Notification badge

**Features:**
- Hover color change
- Badge positioning
- Click scale effect

### User Menu
```tsx
<div className="topbar-user-menu" onClick={handleUserMenuClick}>
  <div className="topbar-user-avatar">AU</div>
  <div className="topbar-user-info">
    <div className="topbar-user-name">Admin User</div>
    <div className="topbar-user-role">Administrator</div>
  </div>
</div>
```

**Classes:**
- `.topbar-user-menu` - Container
- `.topbar-user-avatar` - Avatar circle
- `.topbar-user-info` - Info wrapper
- `.topbar-user-name` - Name text
- `.topbar-user-role` - Role text

**Features:**
- Gradient avatar
- User initials
- Hover background
- Click to profile

## Customization

### Change Topbar Height
```scss
// src/styles/components/topbar.scss
.topbar {
  height: 80px; // Change from 70px
}

// Also update in protected-layout.scss
.main-content {
  margin-top: 80px;
  height: calc(100vh - 80px);
}
```

### Change Search Bar Width
```scss
.topbar-search-bar {
  width: 400px; // Change from 300px
}
```

### Change Avatar Colors
```scss
.topbar-user-avatar {
  background: linear-gradient(135deg, #your-color, #your-dark-color);
}
```

### Add More Icons
```tsx
<button className="topbar-icon-btn" aria-label="Settings">
  ⚙️
</button>
```

## Responsive Behavior

### Desktop (>768px)
- Full topbar with all elements
- Search bar visible
- User info visible
- Left offset adjusts with sidebar

### Tablet (≤768px)
- Topbar full width (left: 0)
- Search bar hidden
- User info hidden
- Only avatar shown
- Reduced gaps

### Mobile (≤480px)
- Reduced padding
- Smaller icons
- Smaller avatar
- Minimal gaps

## State Management

### User Data
The topbar reads user data from Redux store:

```tsx
const user = useAppSelector(selectUser)

// Displays:
// - user.name (or 'Admin User')
// - user.userType (or 'Administrator')
// - Initials from user.name
```

### Search State
```tsx
const [searchQuery, setSearchQuery] = useState('')

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault()
  if (searchQuery.trim()) {
    // Implement search
  }
}
```

## Integration with Sidebar

The topbar automatically adjusts its position based on sidebar state:

```scss
.topbar {
  left: $sidebar-width; // 250px when expanded
  
  &.sidebar-collapsed {
    left: $sidebar-collapsed-width; // 72px when collapsed
  }
  
  &.full-width {
    left: 0; // Full width on mobile
  }
}
```

## Accessibility

### ARIA Labels
```tsx
<button aria-label="Toggle menu">☰</button>
<button aria-label="Notifications">🔔</button>
<button aria-label="Messages">💬</button>
```

### Keyboard Navigation
- All buttons are keyboard accessible
- Search input is focusable
- Tab order is logical

### Screen Readers
- Buttons have descriptive labels
- Badge counts are announced
- User info is readable

## Event Handlers

### Menu Toggle
```tsx
const handleMenuToggle = () => {
  setSidebarOpen(!sidebarOpen)
}
```

### Search Submit
```tsx
const handleSearch = (e: React.FormEvent) => {
  e.preventDefault()
  // Implement search logic
}
```

### User Menu Click
```tsx
const handleUserMenuClick = () => {
  navigate('/profile')
}
```

### Notification Click
```tsx
// Add to component
const handleNotificationClick = () => {
  // Show notifications dropdown
}
```

### Message Click
```tsx
// Add to component
const handleMessageClick = () => {
  // Show messages dropdown
}
```

## Styling Classes

### Main Classes
- `.topbar` - Main container
- `.topbar-left` - Left section
- `.topbar-right` - Right section

### Button Classes
- `.topbar-menu-toggle` - Menu button
- `.topbar-icon-btn` - Icon buttons
- `.topbar-badge` - Notification badge

### Search Classes
- `.topbar-search-bar` - Search container
- `.search-icon` - Search icon

### User Menu Classes
- `.topbar-user-menu` - Menu container
- `.topbar-user-avatar` - Avatar circle
- `.topbar-user-info` - Info wrapper
- `.topbar-user-name` - Name text
- `.topbar-user-role` - Role text

## Best Practices

### 1. Always Pass Sidebar State
```tsx
<Topbar 
  sidebarOpen={sidebarOpen}
  sidebarCollapsed={!sidebarOpen}
/>
```

### 2. Implement Search Functionality
```tsx
const handleSearch = (e: React.FormEvent) => {
  e.preventDefault()
  // Call your search API
  searchAPI(searchQuery)
}
```

### 3. Add Notification Handlers
```tsx
const handleNotificationClick = () => {
  // Open notifications panel
  setNotificationsOpen(true)
}
```

### 4. Update Badge Count Dynamically
```tsx
<span className="topbar-badge">
  {notificationCount}
</span>
```

### 5. Use Real User Data
```tsx
const user = useAppSelector(selectUser)
// Display actual user data from store
```

## Troubleshooting

### Issue: Topbar overlaps content
**Solution:** Ensure main content has `margin-top: 70px`

### Issue: Topbar not adjusting with sidebar
**Solution:** Pass correct `sidebarOpen` and `sidebarCollapsed` props

### Issue: Search not working
**Solution:** Implement `handleSearch` function

### Issue: User initials not showing
**Solution:** Ensure user data is loaded in Redux store

### Issue: Icons not displaying
**Solution:** Ensure emoji support or replace with icon library

## Future Enhancements

- [ ] Dropdown menu for notifications
- [ ] Dropdown menu for messages
- [ ] Dropdown menu for user settings
- [ ] Real-time notification updates
- [ ] Search autocomplete
- [ ] Dark/light theme toggle
- [ ] Language selector
- [ ] Breadcrumb navigation

---

**Status:** ✅ Complete  
**Design:** Matches dashboard.html  
**Responsive:** Mobile-friendly  
**Integrated:** Works with Sidebar and ProtectedLayout
