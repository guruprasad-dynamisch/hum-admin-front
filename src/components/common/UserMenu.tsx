import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@redux/store'
import { selectUser } from '@redux/slices/authSlice'
import { getRouteByKey, getUserInitials, ucFirstLetter } from '@utils/helpers'
import { FiSettings, FiLogOut } from 'react-icons/fi'
import '@styles/components/user-menu.scss'
import { getRoleDisplayName, Role } from '@constants/roles'

interface UserMenuProps {
  className?: string
}

export default function UserMenu({ className }: UserMenuProps) {
  const navigate = useNavigate()
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
          {getUserInitials(user?.fullName)}
        </div>
        <div className="user-menu-info">
          <div className="user-menu-name">
            {ucFirstLetter(user?.fullName as string)}
          </div>
          <div className="user-menu-role">
            {getRoleDisplayName(user?.role as Role)}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="user-menu-popover">
          <div className="user-menu-popover-header">
            <div className="user-menu-avatar">
              {getUserInitials(user?.fullName)}
            </div>
            <div className="user-menu-popover-info">
              <div className="user-menu-popover-name">
                {ucFirstLetter(user?.fullName as string)}
              </div>
              <div className="user-menu-popover-email">
                {user?.email}
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
