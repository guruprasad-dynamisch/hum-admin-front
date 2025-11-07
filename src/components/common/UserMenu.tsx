import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@redux/store'
import { selectUser } from '@redux/slices/authSlice'
import { logoutUser } from '@redux/thunks'
import { getRouteByKey, getUserInitials } from '@utils/helpers'
import { FiSettings, FiLogOut, FiUser } from 'react-icons/fi'
import '@styles/components/user-menu.scss'

interface UserMenuProps {
  className?: string
}

export default function UserMenu({ className }: UserMenuProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSettings = () => {
    setIsOpen(false)
    navigate(getRouteByKey('settings'))
  }

  const handleLogout = () => {
    setIsOpen(false)
    navigate(getRouteByKey('logout'))
  }

  return (
    <div className={`user-menu-wrapper ${className || ''}`} ref={menuRef}>
      <div className="user-menu" onClick={handleToggle}>
        <div className="user-menu-avatar">
          {getUserInitials(user?.name)}
        </div>
        <div className="user-menu-info">
          <div className="user-menu-name">
            {user?.name || 'Admin User'}
          </div>
          <div className="user-menu-role">
            {user?.userType || 'Administrator'}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="user-menu-popover">
          <div className="user-menu-popover-header">
            <div className="user-menu-avatar">
              {getUserInitials(user?.name)}
            </div>
            <div className="user-menu-popover-info">
              <div className="user-menu-popover-name">
                {user?.name || 'Admin User'}
              </div>
              <div className="user-menu-popover-email">
                {user?.email || 'admin@example.com'}
              </div>
            </div>
          </div>

          <div className="user-menu-popover-divider" />

          <div className="user-menu-popover-items">
            <button className="user-menu-popover-item" onClick={handleSettings}>
              <FiSettings className="item-icon" />
              <span>Settings</span>
            </button>
            <button className="user-menu-popover-item logout" onClick={handleLogout}>
              <FiLogOut className="item-icon" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
