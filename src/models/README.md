# Models Directory

This directory contains all TypeScript type definitions and interfaces used throughout the application.

## File Structure

### `api.types.ts`
API-related types for requests and responses.
- **ApiResponse<T>**: Generic API response wrapper
- **ApiErrorResponse**: Error response structure
- **LoginRequest/Response**: Authentication endpoints
- **UserInfoResponse**: User information from API
- **RefreshTokenResponse**: Token refresh
- **CreateUserRequest/UpdateUserRequest**: User management
- **OrganizationResponse**: Organization data

### `auth.types.ts`
Authentication and user-related types.
- **User**: Complete user model with all fields
- **AuthState**: Redux authentication state
- **LoginCredentials**: Login form data
- **PhoneVerificationData**: Phone verification
- **PasswordResetData**: Password reset flow

### `state.types.ts`
Redux state management types.
- **AuthState**: Re-exported from auth.types.ts
- **MiscState**: Miscellaneous UI state (sidebar, theme, etc.)
- **RootState**: Complete Redux store state
- **ThunkError**: Error handling for async thunks

### `form.types.ts`
Form data types derived from Zod validation schemas.
- Login/Registration forms
- Profile management forms
- User management forms
- Template forms
- Generic form handlers

### `navigation.types.ts`
Navigation and routing types.
- **NavigationItem**: Menu/sidebar items
- **NavigationHandlers**: Navigation callbacks
- **BreadcrumbItem**: Breadcrumb navigation

### `costing.ts`
Costing page specific types.
- **CostStat**: Cost statistics
- **CostItem**: Individual cost items
- **OrganizationCost**: Organization-level costs
- **CostTrendData**: Cost trend charts

## Usage

Import types from the central index:

```typescript
import { User, ApiResponse, LoginFormData } from '@models';
```

Or import from specific files:

```typescript
import { User } from '@models/auth.types';
import { ApiResponse } from '@models/api.types';
```

## Best Practices

1. **No Duplication**: Each type should be defined in only one place
2. **Single Responsibility**: Each file has a clear purpose
3. **Proper Naming**: Use descriptive names that indicate purpose
4. **Documentation**: Add JSDoc comments for complex types
5. **Exports**: Always export types, never values (except type guards)

## Type Organization Rules

- **API Types**: If it comes from or goes to the backend → `api.types.ts`
- **User/Auth**: If it's about users or authentication → `auth.types.ts`
- **Redux State**: If it's Redux state structure → `state.types.ts`
- **Forms**: If it's form data → `form.types.ts`
- **UI/Navigation**: If it's UI-specific → appropriate file

## Migration Notes

- **Removed**: `api-types.ts` (duplicate of `api.types.ts`)
- **Consolidated**: `AuthState` now only in `auth.types.ts`
- **Standardized**: All imports use `api.types.ts` (not `api-types.ts`)
