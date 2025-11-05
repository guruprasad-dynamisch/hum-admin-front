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

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

      {/* Top Bar */}
      <DashboardHeader />

      {/* Scrollable Main Content Area */}
      <main className={cn('main-content', {
        'sidebar-collapsed': !sidebarOpen
      })}>
        <Outlet />
      </main>
    </div>
  )
}
