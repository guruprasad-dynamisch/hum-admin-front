import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import ErrorBoundary from '@components/common/ErrorBoundary'
import ThemeProvider from '@components/ThemeProvider'

// App wrapper component that handles React-specific logic
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App