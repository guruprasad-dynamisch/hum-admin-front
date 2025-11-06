import React from 'react'
import { cn } from '@utils/classNames'
import '@styles/components/buttons.scss'

interface PrimaryBtnProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean;
    className?: string;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
}

const PrimaryBtn = ({
    children,
    onClick,
    disabled = false,
    type = "button",
    fullWidth = true,
    className = "",
    loading = false,
    icon,
    iconPosition = "start"
}: PrimaryBtnProps) => {
    return (
        <button
            type={type}
            className={cn(
                'btn',
                'btn-primary',
                { 'btn-full-width': fullWidth },
                className
            )}
            onClick={onClick}
            disabled={disabled || loading}
        >
            <div className="btn-content">
                {loading && <span className="btn-spinner" />}
                {!loading && icon && iconPosition === 'start' && (
                    <span className="btn-icon-start">{icon}</span>
                )}
                {children}
                {!loading && icon && iconPosition === 'end' && (
                    <span className="btn-icon-end">{icon}</span>
                )}
            </div>
        </button>
    );
};

export default PrimaryBtn;