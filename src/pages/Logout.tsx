import { useEffect, useRef } from 'react'
import { useAuth } from '@hooks/use-auth'

const Logout: React.FC = () => {
  const { handleLogout } = useAuth()
  const hasLoggedOut = useRef(false)

  useEffect(() => {
    if (!hasLoggedOut.current) {
      handleLogout()
      hasLoggedOut.current = true
    }
  }, [handleLogout])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '18px'
    }}>
      Logging out...
    </div>
  )
}

export default Logout
