# Page Title System Documentation

## Overview

The page title system automatically updates the browser's document title (`<title>` tag) based on the current route. It follows the format: `[Page Title] - Humanistics AI` or just `Humanistics AI` for routes without a specific title.

## Architecture

### Components

1. **App Constants** (`src/constants/app-constants.ts`)
   - Stores the application name
   - Provides title formatting utilities

2. **Helper Functions** (`src/utils/helpers.ts`)
   - `getRouteTitleByKey(key)` - Retrieves route title by route key
   - Supports nested routes and dynamic paths

3. **Custom Hook** (`src/hooks/usePageTitle.tsx`)
   - `usePageTitle(customTitle?)` - Auto-updates title based on route
   - `useSetPageTitle(title)` - Manually sets page title

4. **PageTitle Component** (`src/components/PageTitle.tsx`)
   - Wrapper component that uses the hook
   - Integrated into routing context

## Usage

### Automatic Title Updates

The system automatically updates page titles for all routes. No additional code needed in individual pages.

**Example:**
```
Route: /login
Title: "Login - Humanistics AI"

Route: /dashboard
Title: "Dashboard - Humanistics AI"

Route: /logout (no title defined)
Title: "Humanistics AI"
```

### Adding Titles to Routes

#### Public Routes (`src/routes/publicRoutes.ts`)

```typescript
export const publicRoutes: PublicRouteConfig[] = [
  {
    key: "login",
    path: "/login",
    title: 'Login',  // ← Add title here
    element: Login,
  },
];
```

#### Protected Routes (`src/routes/protectedRoutes.ts`)

```typescript
export const protectedRoutes: ProtectedRouteConfig[] = [
  {
    key: 'dashboard',
    path: 'dashboard',
    title: 'Dashboard',  // ← Add title here
    element: Dashboard,
    allowedRoles: [Role.SUPER_ADMIN],
  },
];
```

### Manual Title Override

For special cases where you need to override the automatic title:

```typescript
import { usePageTitle } from '@hooks/usePageTitle';

function MyComponent() {
  // Override with custom title
  usePageTitle('Custom Page Title');
  
  return <div>Content</div>;
}
```

Or use the setter hook:

```typescript
import { useSetPageTitle } from '@hooks/usePageTitle';

function MyComponent() {
  useSetPageTitle('Custom Page Title');
  
  return <div>Content</div>;
}
```

### Programmatic Title Retrieval

Get a route's title by its key:

```typescript
import { getRouteTitleByKey } from '@utils/helpers';

const title = getRouteTitleByKey('dashboard'); // Returns 'Dashboard'
const noTitle = getRouteTitleByKey('logout');  // Returns undefined
```

### Format Title with App Name

```typescript
import { formatPageTitle } from '@constants/app-constants';

const fullTitle = formatPageTitle('Dashboard');
// Returns: "Dashboard - Humanistics AI"

const appOnly = formatPageTitle();
// Returns: "Humanistics AI"
```

## Route Types Supported

The system handles all route configurations:

### 1. Simple Routes
```typescript
{
  key: 'login',
  path: '/login',
  title: 'Login',
  element: Login,
}
```

### 2. Nested Routes
```typescript
{
  key: 'parent',
  path: '/parent',
  title: 'Parent Page',
  element: Parent,
  children: [
    {
      key: 'child',
      path: 'child',
      title: 'Child Page',
      element: Child,
    }
  ]
}
```

### 3. Dynamic Routes
```typescript
{
  key: 'userProfile',
  path: '/users/:id',
  title: 'User Profile',
  element: UserProfile,
}
```

### 4. Routes Without Titles
```typescript
{
  key: 'logout',
  path: '/logout',
  // No title - will show just "Humanistics AI"
  element: Logout,
}
```

## Implementation Details

### How It Works

1. **Route Definition**: Each route can optionally include a `title` property
2. **Route Matching**: The `usePageTitle` hook monitors route changes via `useLocation`
3. **Title Lookup**: Searches through flattened routes to find matching path
4. **Title Update**: Updates `document.title` with formatted title
5. **Fallback**: If no title found, uses app name only

### Path Matching Logic

The system matches routes using multiple strategies:

1. **Exact match**: `/login` matches `/login`
2. **Trailing slash**: `/users` matches `/users/`
3. **Dynamic params**: `/users/:id` matches `/users/123`
4. **Relative paths**: `dashboard` matches `/dashboard`

### Performance

- Minimal overhead: Only updates on route change
- Efficient lookup: Uses flattened route array
- No re-renders: Component returns `null`

## Configuration

### Change App Name

Edit `src/constants/app-constants.ts`:

```typescript
export const APP_NAME = 'Your App Name';
```

### Change Title Format

Modify the `formatPageTitle` function:

```typescript
export const formatPageTitle = (pageTitle?: string): string => {
  // Custom format: "Your App | Page Title"
  return pageTitle ? `${APP_NAME} | ${pageTitle}` : APP_NAME;
};
```

## Best Practices

1. **Always add titles** to user-facing routes
2. **Keep titles concise** (2-4 words max)
3. **Use descriptive names** that match page content
4. **Omit titles** for utility routes (logout, redirects)
5. **Test dynamic routes** to ensure proper matching

## Examples

### Current Route Titles

| Route | Key | Title |
|-------|-----|-------|
| `/login` | login | Login - Humanistics AI |
| `/register` | register | Registration - Humanistics AI |
| `/forgot-password` | forgotPassword | Forgot Password - Humanistics AI |
| `/reset-password` | resetPassword | Reset Password - Humanistics AI |
| `/dashboard` | dashboard | Dashboard - Humanistics AI |
| `/users` | users | User Management - Humanistics AI |
| `/templates` | templates | Template Management - Humanistics AI |
| `/audit` | audit | Audit Trail - Humanistics AI |
| `/costing` | costing | Cost Reports - Humanistics AI |
| `/settings` | settings | Profile - Humanistics AI |
| `/logout` | logout | Humanistics AI |

## Troubleshooting

### Title Not Updating

1. Check if route has `title` property defined
2. Verify path matching is correct
3. Ensure `PageTitle` component is in routing context
4. Check browser console for errors

### Wrong Title Showing

1. Verify route path matches exactly
2. Check for duplicate route keys
3. Ensure no manual title overrides in component

### Title Shows "undefined"

1. Route likely missing from configuration
2. Check route key spelling
3. Verify route is in `publicRoutes` or `protectedRoutes`

## Migration Guide

If you have existing manual title updates:

### Before
```typescript
function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard - Humanistics AI';
  }, []);
  
  return <div>Dashboard</div>;
}
```

### After
```typescript
// Just add title to route config - no code in component needed!
// In protectedRoutes.ts:
{
  key: 'dashboard',
  path: 'dashboard',
  title: 'Dashboard',
  element: Dashboard,
  allowedRoles: [Role.SUPER_ADMIN],
}
```

## API Reference

### `usePageTitle(customTitle?: string)`
Auto-updates document title based on current route or custom title.

**Parameters:**
- `customTitle` (optional): Override automatic title

**Returns:** `void`

### `useSetPageTitle(title?: string)`
Manually sets document title with app name formatting.

**Parameters:**
- `title` (optional): Page title to set

**Returns:** `void`

### `getRouteTitleByKey(key: string)`
Retrieves route title by route key.

**Parameters:**
- `key`: Route key to look up

**Returns:** `string | undefined`

### `formatPageTitle(pageTitle?: string)`
Formats page title with app name.

**Parameters:**
- `pageTitle` (optional): Specific page title

**Returns:** `string` - Formatted title

## Future Enhancements

Potential improvements:

1. **SEO metadata**: Extend to manage meta descriptions
2. **Dynamic titles**: Support template strings with params
3. **Breadcrumb integration**: Sync with breadcrumb navigation
4. **Analytics**: Track page view events on title change
5. **Localization**: Support translated titles
