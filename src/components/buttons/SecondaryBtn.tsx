import React from 'react'
import { cn } from '@utils/classNames'
import '@styles/components/buttons.scss'

interface SecondaryBtnProps {
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

const SecondaryBtn = ({
    children,
    onClick,
    disabled = false,
    type = "button",
    fullWidth = false,
    className = "",
    loading = false,
    icon,
    iconPosition = "start"
}: SecondaryBtnProps) => {
    return (
        <button
            type={type}
            className={cn(
                'btn',
                'btn-secondary',
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

export default SecondaryBtn;
