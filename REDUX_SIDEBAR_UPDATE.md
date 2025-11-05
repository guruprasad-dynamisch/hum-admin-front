# Redux Sidebar State Management - Update Summary

## ✅ Changes Made

### 1. Created miscSlice for UI State
- **`src/redux/slices/miscSlice.ts`** - New Redux slice for UI state

**Features:**
- Sidebar open/close state
- Theme management (light/dark)
- Notification count
- Message count

### 2. Updated Redux Store
- **`src/redux/store.ts`** - Added miscSlice to store

### 3. Updated Components
- **`src/components/ProtectedLayout.tsx`** - Uses Redux for sidebar state
- **`src/components/dashboard/DashboardHeader.tsx`** - Uses Redux + IconBtn
- **`src/pages/Dashboard.tsx`** - Includes DashboardHeader

## 🎯 Architecture

### Redux State Management
```
Redux Store
├── auth (existing)
│   └── User authentication state
└── misc (new)
    ├── sidebarOpen: boolean
    ├── theme: 'light' | 'dark'
    ├── notifications: number
    └── messages: number
```

### Component Flow
```
Dashboard Page
└── DashboardHeader
    ├── Reads: sidebarOpen, notifications, messages from Redux
    ├── Dispatches: toggleSidebar()
    └── Uses: IconBtn component

ProtectedLayout
└── Sidebar
    ├── Reads: sidebarOpen from Redux
    └── Dispatches: setSidebarOpen()
```

## 📖 Usage

### miscSlice Actions

#### Toggle Sidebar
```tsx
import { useAppDispatch } from '@redux/store'
import { toggleSidebar } from '@redux/slices/miscSlice'

const dispatch = useAppDispatch()
dispatch(toggleSidebar()) // Toggles sidebar open/close
```

#### Set Sidebar State
```tsx
import { setSidebarOpen } from '@redux/slices/miscSlice'

dispatch(setSidebarOpen(true))  // Open sidebar
dispatch(setSidebarOpen(false)) // Close sidebar
```

#### Update Notifications
```tsx
import { setNotifications } from '@redux/slices/miscSlice'

dispatch(setNotifications(5)) // Set notification count
```

#### Update Messages
```tsx
import { setMessages } from '@redux/slices/miscSlice'

dispatch(setMessages(3)) // Set message count
```

#### Change Theme
```tsx
import { setTheme } from '@redux/slices/miscSlice'

dispatch(setTheme('dark'))  // Dark theme
dispatch(setTheme('light')) // Light theme
```

### miscSlice Selectors

#### Read Sidebar State
```tsx
import { useAppSelector } from '@redux/store'
import { selectSidebarOpen } from '@redux/slices/miscSlice'

const sidebarOpen = useAppSelector(selectSidebarOpen)
```

#### Read Notifications
```tsx
import { selectNotifications } from '@redux/slices/miscSlice'

const notificationCount = useAppSelector(selectNotifications)
```

#### Read Messages
```tsx
import { selectMessages } from '@redux/slices/miscSlice'

const messageCount = useAppSelector(selectMessages)
```

#### Read Theme
```tsx
import { selectTheme } from '@redux/slices/miscSlice'

const theme = useAppSelector(selectTheme)
```

## 🎨 DashboardHeader Updates

### Now Uses Redux
```tsx
// Before (props-based)
<DashboardHeader 
  sidebarOpen={sidebarOpen}
  onMenuToggle={handleToggle}
/>

// After (Redux-based)
<DashboardHeader />
```

### Now Uses IconBtn Component
```tsx
// Notifications with badge
<IconBtn
  variant="gold"
  badge={notificationCount}
  onClick={handleNotificationClick}
>
  🔔
</IconBtn>

// Messages with badge
<IconBtn
  variant="default"
  badge={messageCount}
  onClick={handleMessageClick}
>
  💬
</IconBtn>

// Menu toggle
<IconBtn
  variant="gold"
  onClick={handleMenuToggle}
>
  ☰
</IconBtn>
```

## 📁 Files Structure

```
src/
├── redux/
│   ├── store.ts                     ✅ Updated (added miscSlice)
│   └── slices/
│       ├── authSlice.ts             (existing)
│       └── miscSlice.ts             ✅ New (UI state)
├── components/
│   ├── ProtectedLayout.tsx          ✅ Updated (uses Redux)
│   ├── dashboard/
│   │   └── DashboardHeader.tsx      ✅ Updated (Redux + IconBtn)
│   └── buttons/
│       └── IconBtn.tsx              (existing)
└── pages/
    └── Dashboard.tsx                ✅ Updated (includes header)
```

## 🔄 Complete Example

### Dashboard Page
```tsx
import DashboardHeader from '@components/dashboard/DashboardHeader'

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      
      <div style={{ padding: '24px' }}>
        {/* Dashboard content */}
      </div>
    </>
  )
}
```

### DashboardHeader Component
```tsx
import { useAppSelector, useAppDispatch } from '@redux/store'
import { selectSidebarOpen, toggleSidebar, selectNotifications } from '@redux/slices/miscSlice'
import IconBtn from '@components/buttons/IconBtn'

export default function DashboardHeader() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector(selectSidebarOpen)
  const notificationCount = useAppSelector(selectNotifications)

  const handleMenuToggle = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div className="topbar">
      <IconBtn variant="gold" onClick={handleMenuToggle}>
        ☰
      </IconBtn>
      
      <IconBtn variant="gold" badge={notificationCount}>
        🔔
      </IconBtn>
    </div>
  )
}
```

### ProtectedLayout Component
```tsx
import { useAppSelector, useAppDispatch } from '@redux/store'
import { selectSidebarOpen, setSidebarOpen } from '@redux/slices/miscSlice'
import Sidebar from './Sidebar'

export default function ProtectedLayout() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector(selectSidebarOpen)

  const handleToggleSidebar = (open: boolean) => {
    dispatch(setSidebarOpen(open))
  }

  return (
    <div className="protected-layout">
      <Sidebar open={sidebarOpen} onToggle={handleToggleSidebar} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
```

## 💡 Benefits

✅ **Centralized State** - Sidebar state in Redux, accessible everywhere  
✅ **No Prop Drilling** - No need to pass sidebar state through props  
✅ **Persistent State** - State persists across page navigation  
✅ **Easy Testing** - Redux state is easy to test  
✅ **IconBtn Integration** - Consistent button styling  
✅ **Badge Support** - Dynamic notification/message counts  

## 🎯 State Flow

### Opening/Closing Sidebar

1. **User clicks menu button** in DashboardHeader
2. **DashboardHeader dispatches** `toggleSidebar()`
3. **Redux updates** `sidebarOpen` state
4. **ProtectedLayout reads** new state
5. **Sidebar component** receives new `open` prop
6. **Sidebar animates** open/close

### Updating Notifications

1. **API returns** new notification count
2. **Component dispatches** `setNotifications(count)`
3. **Redux updates** `notifications` state
4. **DashboardHeader reads** new count
5. **IconBtn badge** displays new count

## 🔧 Customization

### Add More UI State
```tsx
// In miscSlice.ts
interface MiscState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  notifications: number
  messages: number
  // Add new state
  modalOpen: boolean
  loading: boolean
}

// Add new actions
setModalOpen: (state, action: PayloadAction<boolean>) => {
  state.modalOpen = action.payload
}
```

### Persist State to LocalStorage
```tsx
// In store.ts
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    misc: miscReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})
```

## 🧪 Testing

### Test Redux Actions
```tsx
import { toggleSidebar, setSidebarOpen } from '@redux/slices/miscSlice'
import miscReducer from '@redux/slices/miscSlice'

test('toggleSidebar changes state', () => {
  const initialState = { sidebarOpen: true }
  const newState = miscReducer(initialState, toggleSidebar())
  expect(newState.sidebarOpen).toBe(false)
})
```

### Test Component with Redux
```tsx
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import DashboardHeader from '@components/dashboard/DashboardHeader'

test('renders DashboardHeader', () => {
  render(
    <Provider store={store}>
      <DashboardHeader />
    </Provider>
  )
})
```

## 📚 API Reference

### Actions
- `toggleSidebar()` - Toggle sidebar open/close
- `setSidebarOpen(boolean)` - Set sidebar state
- `setTheme('light' | 'dark')` - Set theme
- `setNotifications(number)` - Set notification count
- `setMessages(number)` - Set message count

### Selectors
- `selectSidebarOpen(state)` - Get sidebar state
- `selectTheme(state)` - Get theme
- `selectNotifications(state)` - Get notification count
- `selectMessages(state)` - Get message count

---

**Status:** ✅ Complete  
**State Management:** Redux  
**Components:** DashboardHeader uses IconBtn  
**Dashboard:** Includes DashboardHeader
