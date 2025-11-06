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
                return 'btn-text-secondary';
            case "error":
                return 'btn-text-error';
            case "warning":
                return 'btn-text-warning';
            default:
                return '';
        }
    };

    return (
        <button
            type={type}
            className={cn(
                'btn',
                'btn-text',
                getColorClass(),
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

export default TextBtn;
