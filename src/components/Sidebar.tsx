import { useMemo, useState } from 'react'
import { useAppSelector } from '@redux/store'
import { selectUser } from '@redux/slices/authSlice'
import { Role } from '@constants/roles'
import { getAllNavigationForRole } from '@constants/navigation'
import SidebarSection from './sidebar/SidebarSection'
import SidebarItem from './sidebar/SidebarItem'
import { cn } from '@utils/classNames'
import '@styles/components/sidebar.scss'

interface SidebarProps {
  open?: boolean
  onToggle?: (open: boolean) => void
  mobileOpen?: boolean
}

export default function Sidebar({ open: controlledOpen, onToggle, mobileOpen = false }: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(true)
  const user = useAppSelector(selectUser)

  // Use controlled or internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

  // Get user role, default to USER if not set
  const userRole = (user?.userType as Role) || Role.USER

  // Get navigation items filtered by role
  const { top: topNavItems, bottom: bottomNavItems } = useMemo(() => {
    return getAllNavigationForRole(userRole)
  }, [userRole])

  return (
    <nav className={cn('sidebar', {
      'expanded': isOpen,
      'collapsed': !isOpen,
      'mobile-open': mobileOpen
    })} aria-label="sidebar navigation">
      {/* Logo Section */}
      <div className="sidebar-logo-section">
        <div className="sidebar-logo-container">
          <div className="sidebar-logo-icon">🤖</div>
          {isOpen && <div className="sidebar-logo-text">Humanistic AI</div>}
        </div>
      </div>

      {/* Top Navigation Items */}
      <div className={cn('sidebar-nav-menu', {
        'expanded': isOpen,
        'collapsed': !isOpen
      })}>
        <SidebarSection collapsed={!isOpen}>
          {topNavItems.map((item) => (
            <SidebarItem
              key={item.id}
              label={item.label}
              path={item.path}
              icon={item.icon}
              collapsed={!isOpen}
              popupComponent={item.popupComponent}
            />
          ))}
        </SidebarSection>
      </div>
    </nav>
  )
}
