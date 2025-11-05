import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './styles/theme'

// App wrapper component that handles React-specific logic
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App