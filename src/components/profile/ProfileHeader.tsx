import React, { useState } from 'react'
import ChangeAvatarModal from './ChangeAvatarModal'
import '@styles/components/profile-header.scss'

export interface ProfileMetaItem {
  label: string
  value: string
}

export interface ProfileHeaderProps {
  /** User's first name */
  firstName: string
  /** User's last name */
  lastName: string
  /** User's email */
  email: string
  /** User's role */
  role: string
  /** Optional profile image URL */
  avatarUrl?: string
  /** Meta information items */
  metaItems?: ProfileMetaItem[]
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
  firstName,
  lastName,
  email,
  role,
  avatarUrl,
  metaItems = [],
  onAvatarChange,
  showChangeAvatar = true
}) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false)

  // Get initials for avatar
  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

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

  return (
    <>
      <div className="profile-header">
        <div className="profile-avatar-section">
          {avatarUrl ? (
            <img src={avatarUrl} alt={`${firstName} ${lastName}`} className="profile-avatar-img" />
          ) : (
            <div className="profile-avatar">{getInitials()}</div>
          )}
          {showChangeAvatar && (
            <button className="change-avatar-btn" onClick={handleAvatarClick}>
              Change Photo
            </button>
          )}
        </div>

        <div className="profile-info">
          <h1 className="profile-name">{`${firstName} ${lastName}`}</h1>
          <p className="profile-email">{email}</p>
          <span className="badge">{role}</span>

          {metaItems.length > 0 && (
            <div className="profile-meta">
              {metaItems.map((item, index) => (
                <div key={index} className="meta-item">
                  <span className="meta-label">{item.label}</span>
                  <span className="meta-value">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showChangeAvatar && (
        <ChangeAvatarModal
          show={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          onAvatarChange={handleAvatarChange}
          currentAvatar={avatarUrl}
        />
      )}
    </>
  )
}

export default ProfileHeader
