import React from 'react'
import BaseButton, { BaseButtonProps } from './BaseButton'

/**
 * PrimaryBtn - Wrapper around BaseButton with primary variant
 * Maintained for backward compatibility
 */
interface PrimaryBtnProps extends Omit<BaseButtonProps, 'variant'> {
    /** Icon to display */
    icon?: React.ReactNode;
    /** Icon position (start or end) */
    iconPosition?: "start" | "end";
}

const PrimaryBtn = ({
    children,
    icon,
    iconPosition = "start",
    fullWidth = true,
    ...props
}: PrimaryBtnProps) => {
    return (
        <BaseButton
            variant="primary"
            fullWidth={fullWidth}
            iconLeft={iconPosition === 'start' ? icon : undefined}
            iconRight={iconPosition === 'end' ? icon : undefined}
            {...props}
        >
            {children}
        </BaseButton>
    );
};

export default PrimaryBtn;