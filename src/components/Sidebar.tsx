import React, { useMemo, useState } from 'react'
import { useAppSelector } from '@redux/store'
import { selectUser } from '@redux/slices/authSlice'
import { Role } from '@constants/roles'
import { getAllNavigationForRole } from '@constants/navigation'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { MEDIA_QUERIES } from '@constants/breakpoint-constants'
import SidebarSection from './sidebar/SidebarSection'
import SidebarItem from './sidebar/SidebarItem'
import { cn } from '@utils/classNames'
import '@styles/components/sidebar.scss'

interface SidebarProps {
  open?: boolean
  onToggle?: (open: boolean) => void
  mobileOpen?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ open: controlledOpen, onToggle, mobileOpen = false }) => {
  const [internalOpen, setInternalOpen] = useState(true)
  const user = useAppSelector(selectUser)
  
  // Use custom hook for media query
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile)

  // Use controlled or internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

  // Get user role, default to USER if not set
  const userRole = (user?.role as Role) || Role.USER

  // Get navigation items filtered by role
  const { top: topNavItems, bottom: bottomNavItems } = useMemo(() => {
    return getAllNavigationForRole(userRole)
  }, [userRole])

  // Handle nav item click on mobile - close sidebar
  const handleNavItemClick = () => {
    if (isMobile && onToggle) {
      onToggle(false)
    }
  }

  return (
    <nav className={cn('sidebar', {
      'expanded': isOpen,
      'collapsed': !isOpen,
      'mobile-open': mobileOpen
    })} aria-label="Main navigation" role="navigation">
      {/* Logo Section */}
      <div className="sidebar-logo-section">
        <div className="sidebar-logo-container">
          {isOpen && <img
            src="/assets/humanistics_logo_transparent.webp"
            alt="Humanistics AI logo"
            className="sidebar-logo-image"
            loading="lazy"
            onError={(e) => {
              // Fallback to a default logo or hide if image fails to load
              e.currentTarget.style.display = 'none'
            }}
          />}
        </div>
      </div>

      {/* Top Navigation Items */}
      <div className={cn('sidebar-nav-menu', {
        'expanded': isOpen,
        'collapsed': !isOpen
      })} role="menu" aria-label="Primary navigation menu">
        <SidebarSection collapsed={!isOpen}>
          {topNavItems.map((item) => (
            <SidebarItem
              key={item.id}
              label={item.label}
              path={item.path}
              icon={item.icon}
              collapsed={!isOpen}
              popupComponent={item.popupComponent}
              onNavClick={handleNavItemClick}
            />
          ))}
        </SidebarSection>
      </div>
    </nav>
  )
}

// Memoize component to prevent unnecessary re-renders
export default React.memo(Sidebar)
