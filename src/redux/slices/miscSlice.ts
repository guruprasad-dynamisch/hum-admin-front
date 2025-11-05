import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface MiscState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  notifications: number
  messages: number
}

const initialState: MiscState = {
  sidebarOpen: true,
  theme: 'dark',
  notifications: 3,
  messages: 0,
}

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
    setNotifications: (state, action: PayloadAction<number>) => {
      state.notifications = action.payload
    },
    setMessages: (state, action: PayloadAction<number>) => {
      state.messages = action.payload
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  setNotifications,
  setMessages,
} = miscSlice.actions

// Selectors
export const selectSidebarOpen = (state: RootState) => state.misc.sidebarOpen
export const selectTheme = (state: RootState) => state.misc.theme
export const selectNotifications = (state: RootState) => state.misc.notifications
export const selectMessages = (state: RootState) => state.misc.messages

export default miscSlice.reducer
