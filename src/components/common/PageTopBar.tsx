import React from 'react'
import { useAppSelector } from '@redux/store'
import { selectSidebarOpen } from '@redux/slices/miscSlice'
import { cn } from '@utils/classNames'
import MenuToggleButton from './MenuToggleButton'
import '@styles/components/topbar.scss'

interface PageTopBarProps {
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
  className?: string
}

export default function PageTopBar({ leftContent, rightContent, className }: PageTopBarProps) {
  const sidebarOpen = useAppSelector(selectSidebarOpen)

  return (
    <div className={cn('topbar', {
      'full-width': !sidebarOpen,
      'sidebar-collapsed': !sidebarOpen
    }, className)}>
      {/* Left Section */}
      <div className="topbar-left">
        {/* Menu Toggle Button */}
        <MenuToggleButton className="topbar-menu-toggle" />

        {/* Custom Left Content */}
        {leftContent}
      </div>

      {/* Right Section */}
      <div className="topbar-right">
        {/* Custom Right Content */}
        {rightContent}
      </div>
    </div>
  )
}
