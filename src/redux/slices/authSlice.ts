import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from '../thunks';
import { getErrorMessage } from '@constants/errorHandling';
import type { RootState } from '../store';
import { User, AuthState } from '@models/auth.types';

// Helper functions for state updates
const setLoading = (state: AuthState, loading: boolean) => {
  state.isLoading = loading;
  if (loading) state.error = null;
};

const setAuthSuccess = (state: AuthState, user: User) => {
  state.user = user;
  state.isAuthenticated = true;
  state.isLoading = false;
  state.error = null;
};

const setAuthFailure = (state: AuthState, error: string) => {
  state.user = null;
  state.isAuthenticated = false;
  state.isLoading = false;
  state.error = error;
};

const clearAuth = (state: AuthState) => {
  state.user = null;
  state.isAuthenticated = false;
  state.error = null;
};

// Auth slice
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAuthState: (state, action: PayloadAction<{ user: User }>) => {
      setAuthSuccess(state, action.payload.user);
    },
    updateAvatarUrl: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatarUrl = action.payload;
      }
    },
    clearAuthState: (state) => {
      clearAuth(state);
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => setLoading(state, true))
      .addCase(loginUser.fulfilled, (state, action) => { setAuthSuccess(state, action.payload.user); })
      .addCase(loginUser.rejected, (state, action) => { setAuthFailure(state, getErrorMessage(action.payload)); })
      // Logout cases
      .addCase(logoutUser.pending, (state) => setLoading(state, true))
      .addCase(logoutUser.fulfilled, (state) => { clearAuth(state); state.isLoading = false; })
      .addCase(logoutUser.rejected, (state, action) => { setAuthFailure(state, getErrorMessage(action.payload)); });
  },
});

export const { clearError, setAuthState, clearAuthState, updateAvatarUrl } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
