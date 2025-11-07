import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

// App wrapper component that handles React-specific logic
const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App