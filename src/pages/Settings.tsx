import { useState } from 'react'
import { PrimaryBtn, SecondaryBtn } from '@components/buttons'
import { PageTopBar, Tabs } from '@components/common'
import { ProfileHeader } from '@components/profile'
import {
  PersonalInfoTab,
  SecurityTab,
  NotificationsTab,
  SessionsTab
} from '@components/settings'
import { PersonalInfoFormData } from '@validations/profile-validations'
import { getRouteByKey } from '@utils/helpers'
import { useNavigate } from 'react-router-dom'
import '@styles/pages/settings.scss'

export default function Settings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('personal')

  const handleSaveChanges = () => {
    alert('Profile updated successfully!')
  }

  const handleCancelClick = () => {
    navigate(getRouteByKey('dashboard'))
  }

  const handleAvatarChange = (file: File) => {
    console.log('Avatar changed:', file.name)
    // TODO: Upload avatar to server
  }

  const handlePersonalInfoSubmit = (data: PersonalInfoFormData) => {
    console.log('Personal info submitted:', data)
    alert('Profile updated successfully!')
  }

  const handlePasswordChange = (data: any) => {
    console.log('Password changed:', data)
    alert('Password updated successfully!')
  }

  const handleTwoFactorChange = (settings: any) => {
    console.log('Two-factor settings changed:', settings)
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion requested')
      alert('Account deletion initiated')
    }
  }

  const handleNotificationsChange = (settings: any) => {
    console.log('Notification settings changed:', settings)
  }

  const handleRevokeSession = (sessionId: string) => {
    console.log('Revoking session:', sessionId)
    alert(`Session ${sessionId} revoked`)
  }

  // Sample user data - replace with actual user data from context/store
  const userData = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    role: 'Administrator',
    metaItems: [
      { label: 'Member Since', value: 'January 2025' },
      { label: 'Organization', value: 'Acme Inc' },
      { label: 'Last Login', value: '2 minutes ago' }
    ]
  }

  // Personal Information Default Values
  const personalInfoDefaultValues = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: '+1 123-456-7890',
    organization: 'Acme Inc',
    role: userData.role,
    bio: ''
  }

  // Tab configuration with modular components
  const tabConfigs = [
    {
      key: 'personal',
      label: 'Personal Info',
      component: (
        <PersonalInfoTab
          defaultValues={personalInfoDefaultValues}
          onSubmit={handlePersonalInfoSubmit}
        />
      )
    },
    {
      key: 'security',
      label: 'Security',
      component: (
        <SecurityTab
          onPasswordChange={handlePasswordChange}
          onTwoFactorChange={handleTwoFactorChange}
          onDeleteAccount={handleDeleteAccount}
        />
      )
    },
    {
      key: 'notifications',
      label: 'Notifications',
      component: (
        <NotificationsTab
          onChange={handleNotificationsChange}
        />
      )
    },
    {
      key: 'sessions',
      label: 'Active Sessions',
      component: (
        <SessionsTab
          onRevokeSession={handleRevokeSession}
        />
      )
    }
  ]

  // Map tab configs to tab items for Tabs component
  const tabItems = tabConfigs.map(tab => ({
    key: tab.key,
    label: tab.label,
    content: tab.component
  }))

  return (
    <>
      {/* Top Bar with Page Title and Actions */}
      <PageTopBar
        leftContent={
          <div className="page-title">Profile & Settings</div>
        }
        rightContent={
          <>
            <PrimaryBtn onClick={handleSaveChanges}>
              Save Changes
            </PrimaryBtn>
            <SecondaryBtn onClick={handleCancelClick}>
              Cancel
            </SecondaryBtn>
          </>
        }
      />

      <div className="settings-page">
        <div className="settings-container">
          {/* Profile Header */}
          <ProfileHeader
            firstName={userData.firstName}
            lastName={userData.lastName}
            email={userData.email}
            role={userData.role}
            metaItems={userData.metaItems}
            onAvatarChange={handleAvatarChange}
          />

          {/* Tabs */}
          <Tabs
            items={tabItems}
            activeKey={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </div>
    </>
  )
}
