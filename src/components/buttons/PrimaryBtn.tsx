import { Button, CircularProgress, Box } from "@mui/material";

interface PrimaryBtnProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "contained" | "outlined" | "text";
    color?: "primary" | "secondary" | "warning" | "error" | "info" | "success";
    sx?: object;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    fullWidth?: boolean;
    className?: string;
    loading?: boolean;
}

const PrimaryBtn = ({
    children,
    onClick,
    variant = "contained",
    color = "warning",
    sx = {},
    disabled = false,
    type = "button",
    fullWidth = true,
    className = "",
    loading = false
}: PrimaryBtnProps) => {
    return (
        <Button
            sx={{
                width: fullWidth ? '100%' : 'auto',
                padding: fullWidth ? '8px' : '10px 24px',
                borderRadius: '8px',
                minWidth: fullWidth ? 'auto' : '100px',
                backgroundColor: 'var(--primary-orange)',
                color: 'var(--text-black)',
                '&:hover': {
                    backgroundColor: 'var(--primary-gold)',
                },
                '&:active': {
                    backgroundColor: 'var(--link-visited)',
                },
                '&.Mui-disabled': {
                    opacity: 0.5,
                    backgroundColor: 'var(--primary-orange)',
                    color: 'var(--text-black)',
                },
                ...sx
            }}
            className={className}
            variant={variant}
            color={color}
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
                {children}
            </Box>
        </Button>
    );
};

export default PrimaryBtn;