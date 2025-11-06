import { useState } from 'react'
import { useAppSelector } from '@redux/store'
import { selectSidebarOpen, selectNotifications, selectMessages } from '@redux/slices/miscSlice'
import { cn } from '@utils/classNames'
import IconBtn from '@components/buttons/IconBtn'
import MenuToggleButton from '@components/common/MenuToggleButton'
import UserMenu from '@components/common/UserMenu'
import InputField from '@components/fields/InputField'
import '@styles/components/topbar.scss'

export default function DashboardHeader() {
  const sidebarOpen = useAppSelector(selectSidebarOpen)
  const notificationCount = useAppSelector(selectNotifications)
  const messageCount = useAppSelector(selectMessages)
  const [searchQuery, setSearchQuery] = useState('')

  const handleNotificationClick = () => {
    console.log('Notifications clicked')
    // TODO: Open notifications panel
  }

  const handleMessageClick = () => {
    console.log('Messages clicked')
    // TODO: Open messages panel
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery)
    }
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }


  return (
    <div className={cn('topbar', {
      'full-width': !sidebarOpen,
      'sidebar-collapsed': !sidebarOpen
    })}>
      {/* Left Section */}
      <div className="topbar-left">
        {/* Menu Toggle Button */}
        <MenuToggleButton className="topbar-menu-toggle" />

        {/* Search Bar */}
        <div className="topbar-search-bar">
          <InputField
            name="search"
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(value: string | number) => setSearchQuery(value as string)}
            showLabel={false}
            icon="🔍"
            iconPosition="start"
            className="topbar-search-input"
            onKeyPress={handleSearchKeyPress}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="topbar-right">
        {/* Notifications Button */}
        <IconBtn
          variant="gold"
          size="md"
          badge={notificationCount > 0 ? notificationCount : undefined}
          onClick={handleNotificationClick}
          aria-label="Notifications"
        >
          🔔
        </IconBtn>

        {/* Messages Button */}
        <IconBtn
          variant="default"
          size="md"
          badge={messageCount > 0 ? messageCount : undefined}
          onClick={handleMessageClick}
          aria-label="Messages"
        >
          💬
        </IconBtn>

        {/* User Menu */}
        <UserMenu />
      </div>
    </div>
  )
}
