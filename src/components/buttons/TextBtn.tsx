import React from 'react'
import BaseButton, { BaseButtonProps } from './BaseButton'
import { cn } from '@utils/classNames'

interface TextBtnProps extends Omit<BaseButtonProps, 'variant' | 'iconLeft' | 'iconRight'> {
    color?: "primary" | "secondary" | "error" | "warning";
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
}

/**
 * TextBtn - Text-style button using BaseButton
 * Backward compatible wrapper for existing code
 */
const TextBtn = ({
    children,
    color = "primary",
    icon,
    iconPosition = "start",
    className,
    ...props
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
        <BaseButton
            variant="text"
            iconLeft={iconPosition === 'start' ? icon : undefined}
            iconRight={iconPosition === 'end' ? icon : undefined}
            className={cn(getColorClass(), className)}
            {...props}
        >
            {children}
        </BaseButton>
    );
};

export default TextBtn;
