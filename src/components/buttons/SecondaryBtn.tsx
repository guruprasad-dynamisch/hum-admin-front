import React from 'react'
import BaseButton, { BaseButtonProps } from './BaseButton'

interface SecondaryBtnProps extends Omit<BaseButtonProps, 'variant' | 'iconLeft' | 'iconRight'> {
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
}

/**
 * SecondaryBtn - Secondary button using BaseButton
 * Backward compatible wrapper for existing code
 */
const SecondaryBtn = ({
    children,
    icon,
    iconPosition = "start",
    fullWidth = false,
    ...props
}: SecondaryBtnProps) => {
    return (
        <BaseButton
            variant="secondary"
            fullWidth={fullWidth}
            iconLeft={iconPosition === 'start' ? icon : undefined}
            iconRight={iconPosition === 'end' ? icon : undefined}
            {...props}
        >
            {children}
        </BaseButton>
    );
};

export default SecondaryBtn;
