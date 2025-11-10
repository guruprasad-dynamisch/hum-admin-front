# Architecture Improvements Guide

This document provides usage examples for all the architectural improvements implemented in the codebase.

## 📋 Table of Contents

1. [Theme Switching](#theme-switching)
2. [BaseButton Component](#basebutton-component)
3. [CSS Variables for Theming](#css-variables-for-theming)
4. [Auth Persistence](#auth-persistence)
5. [Code-Splitting](#code-splitting)
6. [Performance Optimization](#performance-optimization)
7. [Accessibility](#accessibility)
8. [Token Refresh Service](#token-refresh-service)

---

## 🎨 Theme Switching

### Basic Usage

```tsx
import { useAppDispatch } from '@redux/store';
import { toggleTheme, setTheme } from '@redux/slices/themeSlice';

function MyComponent() {
  const dispatch = useAppDispatch();

  // Toggle between light and dark
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  // Set specific theme
  const handleSetLight = () => {
    dispatch(setTheme('light'));
  };

  const handleSetDark = () => {
    dispatch(setTheme('dark'));
  };

  return (
    <button onClick={handleToggle}>Toggle Theme</button>
  );
}
```

### Using ThemeToggleBtn Component

```tsx
import { ThemeToggleBtn } from '@components/buttons';

function Topbar() {
  return (
    <div className="topbar">
      <ThemeToggleBtn size="md" />
    </div>
  );
}
```

### Reading Current Theme

```tsx
import { useAppSelector } from '@redux/store';
import { selectTheme } from '@redux/slices/themeSlice';

function MyComponent() {
  const currentTheme = useAppSelector(selectTheme);
  
  return <div>Current theme: {currentTheme}</div>;
}
```

---

## 🔘 BaseButton Component

### Standard Usage

```tsx
import { BaseButton } from '@components/buttons';

function MyComponent() {
  return (
    <>
      {/* Primary button */}
      <BaseButton variant="primary" onClick={handleClick}>
        Save
      </BaseButton>

      {/* Secondary button */}
      <BaseButton variant="secondary" onClick={handleClick}>
        Cancel
      </BaseButton>

      {/* Text button */}
      <BaseButton variant="text" onClick={handleClick}>
        Learn More
      </BaseButton>

      {/* Danger button */}
      <BaseButton variant="danger" onClick={handleDelete}>
        Delete
      </BaseButton>
    </>
  );
}
```

### With Icons

```tsx
import { BaseButton } from '@components/buttons';
import { FaSave, FaTrash } from 'react-icons/fa';

function MyComponent() {
  return (
    <>
      {/* Icon on left */}
      <BaseButton 
        variant="primary" 
        iconLeft={<FaSave />}
        onClick={handleSave}
      >
        Save
      </BaseButton>

      {/* Icon on right */}
      <BaseButton 
        variant="danger" 
        iconRight={<FaTrash />}
        onClick={handleDelete}
      >
        Delete
      </BaseButton>

      {/* Icon only (requires aria-label) */}
      <BaseButton 
        variant="primary" 
        iconLeft={<FaSave />}
        aria-label="Save document"
        onClick={handleSave}
      />
    </>
  );
}
```

### Loading State

```tsx
import { BaseButton } from '@components/buttons';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await submitForm();
    setIsLoading(false);
  };

  return (
    <BaseButton 
      variant="primary" 
      loading={isLoading}
      onClick={handleSubmit}
    >
      Submit
    </BaseButton>
  );
}
```

### Sizes and Full Width

```tsx
import { BaseButton } from '@components/buttons';

function MyComponent() {
  return (
    <>
      {/* Small button */}
      <BaseButton variant="primary" size="sm">Small</BaseButton>

      {/* Medium button (default) */}
      <BaseButton variant="primary" size="md">Medium</BaseButton>

      {/* Large button */}
      <BaseButton variant="primary" size="lg">Large</BaseButton>

      {/* Full width button */}
      <BaseButton variant="primary" fullWidth>
        Full Width Button
      </BaseButton>
    </>
  );
}
```

### Backward Compatible Wrappers

```tsx
// These still work and now use BaseButton internally
import { PrimaryBtn, SecondaryBtn, TextBtn } from '@components/buttons';

function MyComponent() {
  return (
    <>
      <PrimaryBtn onClick={handleSave}>Save</PrimaryBtn>
      <SecondaryBtn onClick={handleCancel}>Cancel</SecondaryBtn>
      <TextBtn onClick={handleLearnMore}>Learn More</TextBtn>
    </>
  );
}
```

---

## 🎨 CSS Variables for Theming

### Using CSS Variables in Components

```scss
// Instead of SCSS variables
.my-component {
  // ❌ Old way (static)
  background: $bg-primary;
  color: $text-primary;
  border: 1px solid $border-default;

  // ✅ New way (dynamic, theme-aware)
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}
```

### Available CSS Variables

```css
/* Background Colors */
--bg-primary
--bg-secondary
--bg-tertiary
--bg-input
--bg-hover

/* Text Colors */
--text-primary
--text-secondary
--text-tertiary

/* Border Colors */
--border-default
--border-input
--border-hover

/* Primary Colors */
--color-primary
--color-primary-dark
--color-primary-light
--color-primary-hover

/* Status Colors */
--status-success
--status-error
--status-warning
--status-info
```

### Inline Styles with CSS Variables

```tsx
function MyComponent() {
  return (
    <div style={{ 
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-default)'
    }}>
      Theme-aware content
    </div>
  );
}
```

---

## 🔐 Auth Persistence

### How It Works

Auth state is automatically persisted to `localStorage` and restored on app startup. No manual intervention needed!

```tsx
// ✅ Just use Redux as normal
import { useAppSelector } from '@redux/store';

function MyComponent() {
  const { user, isAuthenticated } = useAppSelector(state => state.auth);

  // User data persists across page reloads automatically
  return (
    <div>
      {isAuthenticated && <p>Welcome, {user?.fullName}</p>}
    </div>
  );
}
```

### Manual Control (if needed)

```tsx
import { setUser, clearAuthData, getUser } from '@utils/auth';

// Get user from storage
const storedUser = getUser();

// Clear auth data manually
clearAuthData();

// Set user manually (usually done by login thunk)
setUser(userData, rememberMe);
```

---

## ⚡ Code-Splitting

### Lazy Loading Pages

All pages are automatically lazy-loaded. No changes needed!

```tsx
// ✅ Already implemented in routes
// Pages load on-demand, reducing initial bundle size

// If you add a new page:
// 1. Create the page component
// 2. Add to routes with lazy import

// In protectedRoutes.ts or publicRoutes.ts:
const NewPage = lazy(() => import('@pages/NewPage'));

export const protectedRoutes = [
  // ...
  {
    key: 'newPage',
    path: 'new-page',
    title: 'New Page',
    element: NewPage,
    allowedRoles: [Role.SUPER_ADMIN],
  },
];
```

### Lazy Loading Components

```tsx
import { lazy, Suspense } from 'react';
import PageLoader from '@components/PageLoader';

// Lazy load heavy components
const HeavyChart = lazy(() => import('@components/HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<PageLoader />}>
      <HeavyChart data={chartData} />
    </Suspense>
  );
}
```

---

## 🚀 Performance Optimization

### Using Memoized Components

```tsx
// Components are already memoized: DataTable, DashboardChart, StatCard
// They won't re-render unless their props change

import DataTable from '@components/common/DataTable';

function MyComponent() {
  const [otherState, setOtherState] = useState(0);

  // ✅ DataTable won't re-render when otherState changes
  return (
    <>
      <DataTable columns={columns} data={data} />
      <button onClick={() => setOtherState(s => s + 1)}>
        Update Other State
      </button>
    </>
  );
}
```

### Creating Your Own Memoized Components

```tsx
import React, { memo, useCallback, useMemo } from 'react';

// Memoize the component
const MyExpensiveComponent = memo(({ data, onItemClick }) => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => expensiveTransform(item));
  }, [data]);

  // Stabilize callbacks
  const handleClick = useCallback((id: string) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});

MyExpensiveComponent.displayName = 'MyExpensiveComponent';
```

---

## ♿ Accessibility

### Icon Buttons

```tsx
import { IconBtn } from '@components/buttons';
import { FaTrash } from 'react-icons/fa';

function MyComponent() {
  return (
    <>
      {/* ✅ Always provide aria-label for icon-only buttons */}
      <IconBtn 
        aria-label="Delete item"
        onClick={handleDelete}
      >
        <FaTrash />
      </IconBtn>

      {/* ❌ Missing aria-label - screen readers won't know what it does */}
      <IconBtn onClick={handleDelete}>
        <FaTrash />
      </IconBtn>
    </>
  );
}
```

### Modals

```tsx
import Modal from '@components/common/Modal';

function MyComponent() {
  return (
    <Modal
      show={isOpen}
      onClose={handleClose}
      title="Confirm Action"
      // ✅ Modal automatically has:
      // - role="dialog"
      // - aria-modal="true"
      // - aria-labelledby pointing to title
      // - Focus trap with returnFocus
    >
      <p>Are you sure?</p>
    </Modal>
  );
}
```

---

## 🔄 Token Refresh Service

### How It Works

Token refresh is automatic and concurrency-safe. Multiple failed requests will only trigger one refresh.

```tsx
// ✅ No manual intervention needed!
// The axios interceptor handles everything

import apiClient from '@api/axiosInstance';

async function fetchData() {
  try {
    // If token is expired (401), it will:
    // 1. Automatically refresh the token
    // 2. Retry the original request
    // 3. Return the data
    const response = await apiClient.get('/api/data');
    return response.data;
  } catch (error) {
    // Only reaches here if refresh fails
    // User will be redirected to login
    console.error('Request failed:', error);
  }
}
```

### Manual Control (Advanced)

```tsx
import { tokenRefreshService } from '@services/TokenRefreshService';

// Check if refresh is in progress
if (tokenRefreshService.isRefreshing()) {
  console.log('Token refresh in progress...');
}

// Manually trigger refresh (rarely needed)
try {
  await tokenRefreshService.refresh();
} catch (error) {
  console.error('Refresh failed:', error);
}

// Reset service state (useful for logout)
tokenRefreshService.reset();
```

---

## 🧪 Testing Examples

### Testing Theme Switching

```tsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { setTheme } from '@redux/slices/themeSlice';

test('theme switches correctly', () => {
  render(
    <Provider store={store}>
      <MyComponent />
    </Provider>
  );

  // Set theme
  store.dispatch(setTheme('light'));
  
  // Check document attribute
  expect(document.documentElement.getAttribute('data-theme')).toBe('light');
});
```

### Testing Memoized Components

```tsx
import { render } from '@testing-library/react';
import DataTable from '@components/common/DataTable';

test('DataTable does not re-render unnecessarily', () => {
  const renderSpy = jest.fn();
  
  const { rerender } = render(
    <DataTable 
      columns={columns} 
      data={data}
      onRender={renderSpy}
    />
  );

  // Re-render with same props
  rerender(
    <DataTable 
      columns={columns} 
      data={data}
      onRender={renderSpy}
    />
  );

  // Should only render once
  expect(renderSpy).toHaveBeenCalledTimes(1);
});
```

---

## 📚 Additional Resources

- **React 18 Documentation**: https://react.dev/
- **Redux Toolkit**: https://redux-toolkit.js.org/
- **Accessibility Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Performance Best Practices**: https://react.dev/learn/render-and-commit

---

## 🐛 Troubleshooting

### Theme not applying?
- Check that `ThemeProvider` is wrapping your app in `App.tsx`
- Verify `data-theme` attribute is on `<html>` element
- Ensure CSS variables are defined in `globals.scss`

### Button styles not working?
- Check that `src/styles/components/index.scss` is imported in `main.tsx`
- Verify button SCSS files exist in `src/styles/components/`
- Clear browser cache and rebuild

### Code-splitting not working?
- Ensure pages are imported with `lazy()` in route files
- Check that `<Suspense>` wrapper exists in route config
- Verify `PageLoader` component exists

### Token refresh failing?
- Check that `withCredentials: true` is set in axios config
- Verify backend is sending httpOnly cookies
- Check network tab for refresh endpoint calls
- Ensure `@services` path alias is configured in `tsconfig.json`

---

**Last Updated**: November 2025
