import React, { useState, useRef } from 'react'
import Modal from '@components/common/Modal'
import { PrimaryBtn, SecondaryBtn } from '@components/buttons'
import '@styles/components/change-avatar.scss'

export interface ChangeAvatarModalProps {
  /** Show/hide modal */
  show: boolean
  /** Callback when modal should close */
  onClose: () => void
  /** Callback when avatar is changed */
  onAvatarChange: (file: File) => void
  /** Current avatar URL */
  currentAvatar?: string
}

/**
 * ChangeAvatarModal Component
 * Modal for uploading and changing user avatar
 * 
 * @example
 * <ChangeAvatarModal
 *   show={showModal}
 *   onClose={() => setShowModal(false)}
 *   onAvatarChange={handleAvatarChange}
 *   currentAvatar="/path/to/avatar.jpg"
 * />
 */
const ChangeAvatarModal: React.FC<ChangeAvatarModalProps> = ({
  show,
  onClose,
  onAvatarChange,
  currentAvatar
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should not exceed 5MB')
      return
    }

    setError('')
    setSelectedFile(file)

    // Create preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleSave = () => {
    if (selectedFile) {
      onAvatarChange(selectedFile)
      handleClose()
    }
  }

  const handleClose = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setError('')
    onClose()
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setError('')
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      title="Change Profile Photo"
      size="sm"
      centered
    >
      <div className="change-avatar-content">
        <div className="avatar-preview">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="preview-image" />
          ) : currentAvatar ? (
            <img src={currentAvatar} alt="Current" className="preview-image" />
          ) : (
            <div className="preview-placeholder">
              <span className="placeholder-icon">📷</span>
              <span className="placeholder-text">No image selected</span>
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        <div className="avatar-info">
          <p className="info-text">
            Upload a profile photo. Recommended size: 400x400px
          </p>
          <p className="info-text-small">
            Accepted formats: JPG, PNG, GIF (Max 5MB)
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        <div className="avatar-actions">
          <PrimaryBtn onClick={handleUploadClick} fullWidth>
            Choose Photo
          </PrimaryBtn>
          
          {selectedFile && (
            <SecondaryBtn onClick={handleRemove} fullWidth>
              Remove
            </SecondaryBtn>
          )}
        </div>

        <div className="modal-footer-actions">
          <SecondaryBtn onClick={handleClose}>
            Cancel
          </SecondaryBtn>
          <PrimaryBtn onClick={handleSave} disabled={!selectedFile}>
            Save Changes
          </PrimaryBtn>
        </div>
      </div>
    </Modal>
  )
}

export default ChangeAvatarModal
