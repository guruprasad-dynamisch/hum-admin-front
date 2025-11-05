import { Button, CircularProgress, Box } from "@mui/material";
import React from 'react';

interface TextBtnProps {
    children: React.ReactNode;
    onClick?: () => void;
    sx?: object;
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
    sx = {},
    disabled = false,
    type = "button",
    className = "",
    loading = false,
    color = "primary",
    icon,
    iconPosition = "start"
}: TextBtnProps) => {
    const getColorStyles = () => {
        switch (color) {
            case "primary":
                return {
                    color: 'var(--primary-orange)',
                    '&:hover': {
                        backgroundColor: 'var(--bg-light-orange) !important',
                    },
                };
            case "secondary":
                return {
                    color: 'var(--text-secondary)',
                    '&:hover': {
                        backgroundColor: 'var(--bg-hover)',
                    },
                };
            case "error":
                return {
                    color: 'var(--error-red)',
                    '&:hover': {
                        backgroundColor: 'var(--error-red-light)',
                    },
                };
            case "warning":
                return {
                    color: 'var(--warning-yellow)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    },
                };
            default:
                return {
                    color: 'var(--primary-orange)',
                    '&:hover': {
                        backgroundColor: 'var(--bg-light-orange)',
                    },
                };
        }
    };

    return (
        <Button
            variant="text"
            sx={{
                fontSize: '14px',
                fontWeight: 500,
                padding: '8px 16px',
                textTransform: 'none',
                ...getColorStyles(),
                '&.Mui-disabled': {
                    opacity: 0.5,
                },
                ...sx
            }}
            className={className}
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {loading && (
                    <CircularProgress
                        size={16}
                        sx={{
                            color: 'currentColor',
                        }}
                    />
                )}
                {!loading && icon && iconPosition === 'start' && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {icon}
                    </Box>
                )}
                {children}
                {!loading && icon && iconPosition === 'end' && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {icon}
                    </Box>
                )}
            </Box>
        </Button>
    );
};

export default TextBtn;
