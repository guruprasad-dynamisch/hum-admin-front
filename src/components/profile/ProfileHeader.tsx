import React, { useState } from 'react'
import ChangeAvatarModal from './ChangeAvatarModal'
import '@styles/components/profile-header.scss'
import { getUserInitials, ucFirstLetter } from '@utils/helpers'
import { User } from '@models/auth.types'
import { getRoleDisplayName } from '@constants/roles'
import { DateFormat, parseDateTimeString } from '@utils/dateUtils'
import { SecondaryBtn } from '@components/buttons'

export interface ProfileMetaItem {
  label: string
  value: string
}

export interface ProfileHeaderProps {
  /** User object containing all user information */
  user: User | null
  /** Callback when avatar is changed */
  onAvatarChange?: (file: File) => void
  /** Show change avatar button */
  showChangeAvatar?: boolean
}

/**
 * ProfileHeader Component
 * Displays user profile information with avatar and metadata
 * 
 * @example
 * <ProfileHeader
 *   firstName="Admin"
 *   lastName="User"
 *   email="admin@example.com"
 *   role="Administrator"
 *   metaItems={[
 *     { label: 'Member Since', value: 'January 2025' },
 *     { label: 'Organization', value: 'Acme Inc' }
 *   ]}
 *   onAvatarChange={handleAvatarChange}
 * />
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onAvatarChange,
  showChangeAvatar = true
}) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false)

  // Construct meta items from user data
  const metaItems: ProfileMetaItem[] = [
    { 
      label: 'Member Since', 
      value: user?.createdAt ? parseDateTimeString(user.createdAt, DateFormat.MONTH_YEAR) : '-'
    },
    { 
      label: 'Organization', 
      value: user?.organization?.name || '-' 
    },
    { 
      label: 'Last Login', 
      value: user?.lastLogin ?parseDateTimeString(user.createdAt, DateFormat.MONTH_YEAR): 'Never' 
    }
  ];

  const handleAvatarClick = () => {
    if (showChangeAvatar) {
      setShowAvatarModal(true)
    }
  }

  const handleAvatarChange = (file: File) => {
    if (onAvatarChange) {
      onAvatarChange(file)
    }
    setShowAvatarModal(false)
  }

  if (!user) return null;

  return (
    <>
      <div className="profile-header">
        <div className="profile-avatar-section">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.fullName} className="profile-avatar-img" />
          ) : (
            <div className="profile-avatar">{getUserInitials(user.fullName)}</div>
          )}
          {showChangeAvatar && (
            <SecondaryBtn className='change-avatar-btn' onClick={handleAvatarClick}>
              Change Photo
            </SecondaryBtn>
          )}
        </div>

        <div className="profile-info">
          <h1 className="profile-name">{ucFirstLetter(user.fullName)}</h1>
          <p className="profile-email">{user.email}</p>
          <span className="badge">{getRoleDisplayName(user.role)}</span>

          <div className="profile-meta">
            {metaItems.map((item: ProfileMetaItem, index: number) => (
              <div key={index} className="meta-item">
                <span className="meta-label">{item.label}</span>
                <span className="meta-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showChangeAvatar && (
        <ChangeAvatarModal
          show={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          onAvatarChange={handleAvatarChange}
          currentAvatar={user.avatarUrl}
        />
      )}
    </>
  )
}

export default ProfileHeader
