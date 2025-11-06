import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@redux/store'
import { selectSidebarOpen, setSidebarOpen } from '@redux/slices/miscSlice'
import { cn } from '@utils/classNames'
import Sidebar from './Sidebar'
import DashboardHeader from './dashboard/DashboardHeader'
import '@styles/components/protected-layout.scss'

export default function ProtectedLayout() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector(selectSidebarOpen)
  const [isMobile, setIsMobile] = useState(false)

  // Set initial sidebar state based on screen size (only on mount)
  useEffect(() => {
    const mobile = window.innerWidth <= 768
    setIsMobile(mobile)

    // Collapse sidebar initially if on mobile
    if (mobile) {
      dispatch(setSidebarOpen(false))
    }
  }, [dispatch])

  // Check if mobile on resize and auto-toggle sidebar based on screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      const wasMobile = isMobile

      setIsMobile(mobile)

      // Auto-close sidebar when transitioning from desktop to mobile
      if (mobile && !wasMobile && sidebarOpen) {
        dispatch(setSidebarOpen(false))
      }
      // Auto-open sidebar when transitioning from mobile to desktop
      else if (!mobile && wasMobile && !sidebarOpen) {
        dispatch(setSidebarOpen(true))
      }
    }

    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [isMobile, sidebarOpen, dispatch])

  const handleToggleSidebar = (open: boolean) => {
    dispatch(setSidebarOpen(open))
  }

  return (
    <div className="protected-layout">
      {/* Fixed Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onToggle={handleToggleSidebar}
        mobileOpen={isMobile && sidebarOpen}
      />

      {/* Scrollable Main Content Area */}
      <main className={cn('main-content', {
        'sidebar-collapsed': !sidebarOpen
      })}>
        <Outlet />
      </main>
    </div>
  )
}
