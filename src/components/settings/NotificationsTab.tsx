import React, { useState } from 'react'
import { Card } from '@components/common'
import ToggleSwitch from '@components/common/ToggleSwitch'

interface NotificationSettings {
  newUserRegistration: boolean
  templateUpdates: boolean
  costAlerts: boolean
  securityAlerts: boolean
  browserNotifications: boolean
}

export interface NotificationsTabProps {
  settings?: NotificationSettings
  onChange?: (settings: NotificationSettings) => void
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({
  settings: initialSettings = {
    newUserRegistration: true,
    templateUpdates: true,
    costAlerts: true,
    securityAlerts: true,
    browserNotifications: false
  },
  onChange
}) => {
  const [settings, setSettings] = useState(initialSettings)

  const emailNotifications = [
    {
      key: 'newUserRegistration',
      label: 'New User Registration',
      description: 'Get notified when new users register'
    },
    {
      key: 'templateUpdates',
      label: 'Template Updates',
      description: 'Notifications about template changes'
    },
    {
      key: 'costAlerts',
      label: 'Cost Alerts',
      description: 'Alerts when costs exceed thresholds'
    },
    {
      key: 'securityAlerts',
      label: 'Security Alerts',
      description: 'Suspicious activity notifications'
    }
  ]

  const pushNotifications = [
    {
      key: 'browserNotifications',
      label: 'Browser Notifications',
      description: 'Allow browser push notifications'
    }
  ]

  const handleToggle = (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    if (onChange) {
      onChange(newSettings)
    }
  }

  return (
    <>
      {/* Email Notifications */}
      <Card title="Email Notifications">
        {emailNotifications.map((notification) => (
          <ToggleSwitch
            key={notification.key}
            checked={settings[notification.key as keyof NotificationSettings]}
            onChange={(checked) => handleToggle(notification.key as keyof NotificationSettings, checked)}
            label={notification.label}
            description={notification.description}
          />
        ))}
      </Card>

      {/* Push Notifications */}
      <Card title="Push Notifications">
        {pushNotifications.map((notification) => (
          <ToggleSwitch
            key={notification.key}
            checked={settings[notification.key as keyof NotificationSettings]}
            onChange={(checked) => handleToggle(notification.key as keyof NotificationSettings, checked)}
            label={notification.label}
            description={notification.description}
          />
        ))}
      </Card>
    </>
  )
}

export default NotificationsTab
