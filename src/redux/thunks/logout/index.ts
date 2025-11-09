import { createAsyncThunk } from '@reduxjs/toolkit';
import { LogoutResponse, LogoutError } from './types';
import { clearAuthData } from '@utils/auth';
import { logoutRequest } from '@api/auth';

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
