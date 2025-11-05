import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser } from '@utils/auth';
import { LoginCredentials, LoginResponse, LoginError } from './types';
import { loginRequest } from '@api/auth';

/**
 * Login user async thunk
 * 
 * SECURITY: Tokens are stored in httpOnly cookies by the backend.
 * We only store user profile data in localStorage/sessionStorage.
 */
export const loginUser = createAsyncThunk<LoginResponse, LoginCredentials, { rejectValue: LoginError }>(
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
            const apiResponse = response.data;
            
            // Validate response structure
            if (!apiResponse || !apiResponse.success || !apiResponse.data) {
                return rejectWithValue({
                    message: apiResponse?.message || 'Invalid response from server',
                    code: 'INVALID_RESPONSE'
                });
            }

            const userData = apiResponse.data;

            // Validate required fields
            if (!userData.id) {
                return rejectWithValue({
                    message: 'Missing required user data',
                    code: 'INVALID_RESPONSE'
                });
            }

            // Map backend user structure to frontend user structure
            const user = {
                id: userData.id,
                name: userData.fullName || userData.email,
                username: userData.email.split('@')[0], // Generate username from email
                email: userData.email,
                userType: userData.role || 'USER'
            };

            // Store only user profile data (NOT tokens - they're in httpOnly cookies)
            setUser(user, credentials.rememberMe);

            return { 
                user
            };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            const errorCode = error.response?.data?.code || error.response?.status || 'LOGIN_ERROR';
            
            return rejectWithValue({
                message: errorMessage,
                code: errorCode
            });
        }
    }
);
