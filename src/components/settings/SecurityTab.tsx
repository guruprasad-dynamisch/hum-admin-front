import React, { useState } from 'react'
import { Card } from '@components/common'
import ToggleSwitch from '@components/common/ToggleSwitch'
import DynamicForm from '@components/forms/DynamicForm'
import { PrimaryBtn } from '@components/buttons'
import { FieldConfig } from '@components/forms/types'
import { z } from 'zod'

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type PasswordFormData = z.infer<typeof passwordSchema>

interface TwoFactorSettings {
  sms: boolean
  email: boolean
  authenticator: boolean
}

export interface SecurityTabProps {
  twoFactorSettings?: TwoFactorSettings
  onPasswordChange?: (data: PasswordFormData) => void
  onTwoFactorChange?: (settings: TwoFactorSettings) => void
  onDeleteAccount?: () => void
}

const SecurityTab: React.FC<SecurityTabProps> = ({
  twoFactorSettings: initialTwoFactor = { sms: true, email: false, authenticator: false },
  onPasswordChange,
  onTwoFactorChange,
  onDeleteAccount
}) => {
  const [twoFactor, setTwoFactor] = useState(initialTwoFactor)

  const passwordFields: FieldConfig[] = [
    {
      name: 'currentPassword',
      label: 'Current Password',
      type: 'password',
      placeholder: 'Enter current password',
      colSpan: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
    },
    {
      name: 'newPassword',
      label: 'New Password',
      type: 'password',
      placeholder: 'Enter new password',
      colSpan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm new password',
      colSpan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }
    }
  ]

  const twoFactorOptions = [
    {
      key: 'sms',
      label: 'SMS Authentication',
      description: 'Receive verification codes via SMS'
    },
    {
      key: 'email',
      label: 'Email Authentication',
      description: 'Receive verification codes via email'
    },
    {
      key: 'authenticator',
      label: 'Authenticator App',
      description: 'Use Google Authenticator or similar apps'
    }
  ]

  const handlePasswordSubmit = (data: PasswordFormData) => {
    if (onPasswordChange) {
      onPasswordChange(data)
    }
  }

  const handleTwoFactorToggle = (key: keyof TwoFactorSettings, value: boolean) => {
    const newSettings = { ...twoFactor, [key]: value }
    setTwoFactor(newSettings)
    if (onTwoFactorChange) {
      onTwoFactorChange(newSettings)
    }
  }

  return (
    <>
      {/* Change Password */}
      <Card title="Change Password">
        <DynamicForm
          mode="react-hook-form"
          fields={passwordFields}
          schema={passwordSchema}
          defaultValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
          onSubmit={handlePasswordSubmit}
          layout="grid"
          gridColumns={12}
          submitButtonText="Update Password"
          showSubmitButton={true}
          showCancelButton={false}
        />
      </Card>

      {/* Two-Factor Authentication */}
      <Card title="Two-Factor Authentication">
        {twoFactorOptions.map((option) => (
          <ToggleSwitch
            key={option.key}
            checked={twoFactor[option.key as keyof TwoFactorSettings]}
            onChange={(checked) => handleTwoFactorToggle(option.key as keyof TwoFactorSettings, checked)}
            label={option.label}
            description={option.description}
          />
        ))}
      </Card>

      {/* Danger Zone */}
      <Card title="Danger Zone">
        <div className="security-item danger-zone">
          <div className="security-info">
            <h4>Delete Account</h4>
            <p>Permanently delete your account and all data</p>
          </div>
          <PrimaryBtn
            onClick={onDeleteAccount}
            className="hum-btn-danger"
          >
            Delete Account
          </PrimaryBtn>
        </div>
      </Card>
    </>
  )
}

export default SecurityTab
