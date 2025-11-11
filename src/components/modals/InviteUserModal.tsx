import React, { useState } from 'react'
import Modal from '@components/common/Modal'
import ChipsInput, { ChipItem } from '@components/fields/ChipsInput'
import PrimaryBtn from '@components/buttons/PrimaryBtn'
import SecondaryBtn from '@components/buttons/SecondaryBtn'
import '@styles/components/invite-user-modal.scss'

export interface InviteUserModalProps {
  /** Show/hide modal */
  show: boolean
  /** Callback when modal should close */
  onClose: () => void
  /** Callback when invites are sent */
  onSubmit: (emails: string[]) => void | Promise<void>
  /** Loading state */
  loading?: boolean
}

/**
 * Invite User Modal Component
 * 
 * Allows users to enter multiple email addresses as chips
 * and send invitations to multiple users at once
 */
const InviteUserModal: React.FC<InviteUserModalProps> = ({
  show,
  onClose,
  onSubmit,
  loading = false
}) => {
  const [emails, setEmails] = useState<string[]>([])
  const [error, setError] = useState('')

  const validateEmail = (email: string): boolean | string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    return true
  }

  const handleEmailsChange = (value: string[] | ChipItem[]) => {
    // Extract string values from the union type
    const emailList = value.map(item => typeof item === 'string' ? item : item.value)
    setEmails(emailList)
    setError('')
  }

  const handleSubmit = async () => {
    if (emails.length === 0) {
      setError('Please add at least one email address')
      return
    }

    try {
      await onSubmit(emails)
      handleClose()
    } catch (err) {
      setError('Failed to send invitations. Please try again.')
    }
  }

  const handleClose = () => {
    setEmails([])
    setError('')
    onClose()
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      title="Invite Users"
      size="lg"
      centered
      backdrop="static"
      keyboard={!loading}
    >
      <div className="invite-user-modal-content">
        {/* Email Chips Input */}
        <div className="invite-email-section">
          <ChipsInput
            label="Email Addresses"
            placeholder="Enter email address and press Enter"
            value={emails}
            onChange={handleEmailsChange}
            validation={validateEmail}
            disabled={loading}
            required
            customError={error}
          />
          <p className="invite-hint">
            Enter email addresses and press Enter, Tab, or comma to add multiple recipients
          </p>
        </div>

        {/* Action Buttons */}
        <div className="invite-modal-actions">
          <SecondaryBtn
            onClick={handleClose}
            disabled={loading}
            fullWidth={false}
          >
            Cancel
          </SecondaryBtn>
          <PrimaryBtn
            onClick={handleSubmit}
            disabled={emails.length === 0 || loading}
            loading={loading}
            fullWidth={false}
          >
            {loading ? 'Sending...' : `Send Invite${emails.length !== 1 ? 's' : ''} (${emails.length})`}
          </PrimaryBtn>
        </div>
      </div>
    </Modal>
  )
}

export default InviteUserModal
