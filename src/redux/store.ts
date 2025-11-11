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

// Synchronous localStorage sync for immediate writes (e.g., logout)
const syncAuthToStorageImmediate = (state: RootState) => {
  const { user, isAuthenticated } = state.auth
  
  if (isAuthenticated && user) {
    setUser(user, true)
  } else {
    clearAuthData()
  }
}

// Debounced localStorage sync to prevent excessive writes during updates
const syncAuthToStorage = debounce(syncAuthToStorageImmediate, 300)

// Track previous auth state to detect logout events
let previousIsAuthenticated = store.getState().auth.isAuthenticated

// Subscribe to store changes and sync auth state to localStorage
store.subscribe(() => {
  const state = store.getState()
  const currentIsAuthenticated = state.auth.isAuthenticated
  
  // Detect logout: transition from authenticated to unauthenticated
  if (previousIsAuthenticated && !currentIsAuthenticated) {
    // Flush any pending debounced writes and perform synchronous logout
    syncAuthToStorage.flush()
    syncAuthToStorageImmediate(state)
  } else {
    // Use debounced sync for regular updates
    syncAuthToStorage(state)
  }
  
  previousIsAuthenticated = currentIsAuthenticated
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
