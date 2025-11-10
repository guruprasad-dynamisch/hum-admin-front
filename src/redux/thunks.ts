import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setRememberMeSession, clearAuthData } from '@utils/auth';
import { loginRequest, userInfoRequest, logoutRequest } from '@api/auth';
import { ApiResponse, UserInfoResponse } from '@models/api.types';
import { Role } from '@constants/roles';
import { AUTH_MESSAGES, ERROR_CODES } from '@constants/message-constants';
import { User } from '@models/auth.types';

// ============================================================================
// TYPES
// ============================================================================

export interface LoginCredentials {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export interface LogoutResponse {
  success: boolean;
}

export interface LogoutError {
  message: string;
  code?: string;
}

// ============================================================================
// LOGIN THUNK
// ============================================================================

/**
 * Login user async thunk
 * 
 * SECURITY: Tokens are stored in httpOnly cookies by the backend.
 * We only store user profile data in localStorage/sessionStorage.
 */
export const loginUser = createAsyncThunk<{ user: User }, LoginCredentials, { rejectValue: LoginError }>(
    'auth/loginUser',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            // Call the real login API
            // Backend will set httpOnly cookies with access and refresh tokens
            const response = await loginRequest({
                identifier: credentials.identifier,
                password: credentials.password
            });

            // Backend response structure: { success, message, data: { id, email, fullName, role, ... } }
            const apiResponse: ApiResponse = response.data;

            // Validate response structure
            if (!apiResponse || !apiResponse.success) {
                return rejectWithValue({
                    message: apiResponse?.message || AUTH_MESSAGES.invalidResponse,
                    code: ERROR_CODES.INVALID_RESPONSE
                });
            }

            const userResponse = await userInfoRequest();

            const userInfo: UserInfoResponse | undefined = userResponse.data.data;

            // Validate user info response
            if (!userInfo || !userInfo.id) {
                return rejectWithValue({
                    message: AUTH_MESSAGES.missingUserData,
                    code: ERROR_CODES.MISSING_USER_DATA
                });
            }

            // Map backend user structure to frontend user structure
            const user: User = {
                id: userInfo.id,
                fullName: userInfo.fullName,
                email: userInfo.email,
                isActive: userInfo.isActive,
                role: userInfo.role as Role, // Convert string to Role enum
                // Optional fields
                organizationId: userInfo.organizationId,
                phone: userInfo.phone,
                phoneVerified: userInfo.phoneVerified,
                lastLogin: userInfo.lastLogin,
                passwordChangedAt: userInfo.passwordChangedAt,
                createdAt: userInfo.createdAt,
                updatedAt: userInfo.updatedAt,
                organization: userInfo.organization,
            };

            // Store only user profile data (NOT tokens - they're in httpOnly cookies)
            setUser(user, credentials.rememberMe);

            // Store remember me session with login timestamp
            setRememberMeSession(credentials.rememberMe as boolean);

            // Return the user object wrapped for the authSlice
            return { user };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || AUTH_MESSAGES.loginError;
            const errorCode = error.response?.data?.code || error.response?.status || ERROR_CODES.LOGIN_ERROR;

            return rejectWithValue({
                message: errorMessage,
                code: errorCode,
                errors: error.response?.data?.data?.errors || null,
            });
        }
    }
);

// ============================================================================
// LOGOUT THUNK
// ============================================================================

/**
 * Logout user async thunk
 * 
 * SECURITY: Backend will clear httpOnly cookies containing tokens.
 * We clear local user profile data and remember me session.
 */
export const logoutUser = createAsyncThunk<LogoutResponse, void, { rejectValue: LogoutError }>(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            // Call the logout API to invalidate tokens on the server
            // Backend will clear httpOnly cookies
            await logoutRequest();
            
            // Clear local user data after successful API call
            clearAuthData();
            
            return { success: true };
        } catch (error: any) {
            // Even if the API call fails, clear local user data
            clearAuthData();
            
            const errorMessage = error.response?.data?.message || error.message || 'Logout failed';
            const errorCode = error.response?.data?.code || 'LOGOUT_ERROR';
            
            return rejectWithValue({
                message: errorMessage,
                code: errorCode
            });
        }
    }
);
