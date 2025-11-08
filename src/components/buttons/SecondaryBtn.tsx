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
    style?: React.CSSProperties;
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
    iconPosition = "start",
    style
}: SecondaryBtnProps) => {
    return (
        <button
            type={type}
            className={cn(
                'hum-btn',
                'hum-btn-secondary',
                { 'hum-btn-full-width': fullWidth },
                className
            )}
            onClick={onClick}
            disabled={disabled || loading}
            style={style}
        >
            <div className="hum-btn-content">
                {loading && <span className="hum-btn-spinner" />}
                {!loading && icon && iconPosition === 'start' && (
                    <span className="hum-btn-icon-start">{icon}</span>
                )}
                {children}
                {!loading && icon && iconPosition === 'end' && (
                    <span className="hum-btn-icon-end">{icon}</span>
                )}
            </div>
        </button>
    );
};

export default SecondaryBtn;
