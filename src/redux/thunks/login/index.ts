import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from '@utils/auth';
import { LoginCredentials, LoginError } from './types';
import { loginRequest } from '@api/auth';
import { ApiResponse, LoginResponse } from '@models/api-types';
import { Role } from '@constants/roles';
import { AUTH_MESSAGES, ERROR_CODES } from '@constants/message-constants';
import { User } from '@redux/slices/authSlice';

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
            const apiResponse: ApiResponse<LoginResponse> = response.data;

            // Validate response structure
            if (!apiResponse || !apiResponse.success || !apiResponse.data) {
                return rejectWithValue({
                    message: apiResponse?.message || AUTH_MESSAGES.invalidResponse,
                    code: ERROR_CODES.INVALID_RESPONSE
                });
            }

            const userData = apiResponse.data;

            // Validate required fields
            if (!userData.id) {
                return rejectWithValue({
                    message: AUTH_MESSAGES.missingUserData,
                    code: ERROR_CODES.MISSING_USER_DATA
                });
            }

            // Map backend user structure to frontend user structure
            const user = {
                id: userData.id,
                fullName: userData.fullName,
                email: userData.email,
                isActive: userData.isActive !== undefined ? userData.isActive : true,
                role: (userData.role as Role) || Role.USER,
            };
            
            console.log('Mapped user:', user)
            
            // Store only user profile data (NOT tokens - they're in httpOnly cookies)
            setUser(user, credentials.rememberMe);

            // Return the user object wrapped for the authSlice
            return { user };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || AUTH_MESSAGES.loginError;
            const errorCode = error.response?.data?.code || error.response?.status || ERROR_CODES.LOGIN_ERROR;
            
            return rejectWithValue({
                message: errorMessage,
                code: errorCode
            });
        }
    }
);
