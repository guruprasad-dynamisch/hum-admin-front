import React, { useState, ReactNode } from 'react'
import '@styles/components/tabs.scss'

export interface TabItem {
  /** Unique key for the tab */
  key: string
  /** Tab label */
  label: string
  /** Tab content */
  content: ReactNode
  /** Optional icon */
  icon?: ReactNode
  /** Disable tab */
  disabled?: boolean
}

export interface TabsProps {
  /** Array of tab items */
  items: TabItem[]
  /** Default active tab key */
  defaultActiveKey?: string
  /** Controlled active tab key */
  activeKey?: string
  /** Callback when tab changes */
  onChange?: (key: string) => void
  /** Additional CSS class */
  className?: string
}

/**
 * Tabs Component
 * Reusable tabs component for organizing content into separate views
 * 
 * @example
 * <Tabs
 *   items={[
 *     { key: 'personal', label: 'Personal Info', content: <PersonalInfo /> },
 *     { key: 'security', label: 'Security', content: <Security /> }
 *   ]}
 *   defaultActiveKey="personal"
 *   onChange={(key) => console.log('Tab changed:', key)}
 * />
 */
const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onChange,
  className = ''
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || items[0]?.key || ''
  )

  // Use controlled or uncontrolled state
  const activeKey = controlledActiveKey !== undefined ? controlledActiveKey : internalActiveKey

  const handleTabClick = (key: string, disabled?: boolean) => {
    if (disabled) return

    if (controlledActiveKey === undefined) {
      setInternalActiveKey(key)
    }

    if (onChange) {
      onChange(key)
    }
  }

  return (
    <div className={`tabs-container ${className}`}>
      {/* Tab Headers */}
      <div className="tabs">
        {items.map((item) => (
          <button
            key={item.key}
            className={`tab ${activeKey === item.key ? 'active' : ''} ${
              item.disabled ? 'disabled' : ''
            }`}
            onClick={() => handleTabClick(item.key, item.disabled)}
            disabled={item.disabled}
          >
            {item.icon && <span className="tab-icon">{item.icon}</span>}
            <span className="tab-label">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tabs-content">
        {items.map((item) => (
          <div
            key={item.key}
            className={`tab-content ${activeKey === item.key ? 'active' : ''}`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tabs
