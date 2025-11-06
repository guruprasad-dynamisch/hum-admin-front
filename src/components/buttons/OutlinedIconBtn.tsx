import React from 'react'
import { cn } from '@utils/classNames'
import '@styles/components/buttons.scss'

interface OutlinedIconBtnProps {
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const OutlinedIconBtn = ({
  onClick,
  label,
  icon,
  disabled = false,
  className = '',
  startIcon,
  endIcon,
}: OutlinedIconBtnProps) => {
  return (
    <button
      type="button"
      className={cn('hum-btn', 'hum-btn-outlined-icon', className)}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="hum-btn-content">
        {(startIcon || icon) && (
          <span className="hum-btn-icon-start">{startIcon || icon}</span>
        )}
        {label}
        {endIcon && (
          <span className="hum-btn-icon-end">{endIcon}</span>
        )}
      </div>
    </button>
  );
};

export default OutlinedIconBtn;
