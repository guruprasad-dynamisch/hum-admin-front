import React from 'react'
import { cn } from '@utils/classNames'
import '@styles/components/buttons.scss'

interface TextBtnProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
    loading?: boolean;
    color?: "primary" | "secondary" | "error" | "warning";
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
}

const TextBtn = ({
    children,
    onClick,
    disabled = false,
    type = "button",
    className = "",
    loading = false,
    color = "primary",
    icon,
    iconPosition = "start"
}: TextBtnProps) => {
    const getColorClass = () => {
        switch (color) {
            case "secondary":
                return 'hum-btn-text-secondary';
            case "error":
                return 'hum-btn-text-error';
            case "warning":
                return 'hum-btn-text-warning';
            default:
                return '';
        }
    };

    return (
        <button
            type={type}
            className={cn(
                'hum-btn',
                'hum-btn-text',
                getColorClass(),
                className
            )}
            onClick={onClick}
            disabled={disabled || loading}
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

export default TextBtn;
