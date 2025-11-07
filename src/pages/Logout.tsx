import { useEffect, useRef } from 'react'
import { useAuth } from '@hooks/use-auth'
import { FiLogOut } from 'react-icons/fi'
import '@styles/pages/logout.scss'

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
    <div className="logout-page">
      <div className="logout-container">
        <div className="logout-icon-wrapper">
          <FiLogOut className="logout-icon" />
        </div>
        <h1 className="logout-title">Logging Out</h1>
        <p className="logout-message">Please wait while we securely log you out...</p>
        <div className="logout-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
      </div>
    </div>
  )
}

export default Logout
