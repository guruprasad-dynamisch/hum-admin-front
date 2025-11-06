import React from 'react'
import '@styles/components/toggle-switch.scss'

export interface ToggleSwitchProps {
  /** Checked state */
  checked: boolean
  /** onChange handler */
  onChange: (checked: boolean) => void
  /** Disabled state */
  disabled?: boolean
  /** Label */
  label?: string
  /** Description */
  description?: string
}

/**
 * ToggleSwitch Component
 * Toggle switch for boolean settings
 * 
 * @example
 * <ToggleSwitch
 *   checked={enabled}
 *   onChange={setEnabled}
 *   label="SMS Authentication"
 *   description="Receive verification codes via SMS"
 * />
 */
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  description
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  if (label || description) {
    return (
      <div className="security-item">
        <div className="security-info">
          {label && <h4>{label}</h4>}
          {description && <p>{description}</p>}
        </div>
        <div
          className={`toggle-switch ${checked ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={handleClick}
        />
      </div>
    )
  }

  return (
    <div
      className={`toggle-switch ${checked ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
    />
  )
}

export default ToggleSwitch
