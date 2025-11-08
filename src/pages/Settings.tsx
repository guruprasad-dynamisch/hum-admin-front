import { useState } from 'react'
import { PrimaryBtn, SecondaryBtn } from '@components/buttons'
import { PageTopBar, Tabs } from '@components/common'
import { ProfileHeader } from '@components/profile'
import { PersonalInfoTab, SecurityTab, NotificationsTab, SessionsTab } from '@components/settings'
import { PersonalInfoFormData } from '@validations/profile-validations'
import { getRouteByKey } from '@utils/helpers'
import { useNavigate } from 'react-router-dom'
import '@styles/pages/settings.scss'
import { useAppSelector, useAppDispatch } from '@redux/store'
import { selectUser, updateAvatarUrl } from '@redux/slices/authSlice'
import { getRoleDisplayName, Role } from '@constants/roles'

export default function Settings() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState('personal')
  const user = useAppSelector(selectUser);

  const handleSaveChanges = () => {
    alert('Profile updated successfully!')
  }

  const handleCancelClick = () => {
    navigate(getRouteByKey('dashboard'))
  }

  const handleAvatarChange = (file: File) => {
    const tempUrl = URL.createObjectURL(file)
    dispatch(updateAvatarUrl(tempUrl))
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
      alert('Account deletion initiated')
    }
  }

  const handleNotificationsChange = (settings: any) => {
    console.log('Notification settings changed:', settings)
  }

  const handleRevokeSession = (sessionId: string) => {
    alert(`Session ${sessionId} revoked`)
  }



  // Personal Information Default Values
  const personalInfoDefaultValues = {
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    organization: user?.organization?.name || '',
    role: getRoleDisplayName(user?.role as Role),
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
          <div className='d-flex align-items-center gap-2'>
            <PrimaryBtn onClick={handleSaveChanges}>
              Save Changes
            </PrimaryBtn>
            <SecondaryBtn onClick={handleCancelClick}>
              Cancel
            </SecondaryBtn>
          </div>
        }
      />

      <div className="settings-page">
        <div className="settings-container">
          {/* Profile Header */}
          <ProfileHeader
            user={user}
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
