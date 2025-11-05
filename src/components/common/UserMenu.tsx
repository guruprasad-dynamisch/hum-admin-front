import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@redux/store'
import { selectUser } from '@redux/slices/authSlice'
import { getUserInitials } from '@utils/helpers'
import '@styles/components/user-menu.scss'

interface UserMenuProps {
  onClick?: () => void
  className?: string
}

export default function UserMenu({ onClick, className }: UserMenuProps) {
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate('/profile')
    }
  }

  return (
    <div className={`user-menu ${className || ''}`} onClick={handleClick}>
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
  )
}
