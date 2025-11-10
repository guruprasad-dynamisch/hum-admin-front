import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import ErrorBoundary from '@components/common/ErrorBoundary'

// App wrapper component that handles React-specific logic
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App