import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import authReducer from './slices/authSlice'
import miscReducer from './slices/miscSlice'
import themeReducer from './slices/themeSlice'
import { setUser, clearAuthData } from '@utils/auth'
import { debounce } from '@utils/helpers'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    misc: miscReducer,
    theme: themeReducer,
  },
})

// Debounced localStorage sync to prevent excessive writes
const syncAuthToStorage = debounce((state: RootState) => {
  const { user, isAuthenticated } = state.auth
  
  if (isAuthenticated && user) {
    // Sync authenticated user to localStorage
    // Note: rememberMe preference is handled during login
    setUser(user, true)
  } else {
    // Clear storage when logged out
    clearAuthData()
  }
}, 300)

// Subscribe to store changes and sync auth state to localStorage
store.subscribe(() => {
  const state = store.getState()
  syncAuthToStorage(state)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
