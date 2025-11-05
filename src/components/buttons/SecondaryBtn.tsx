import { Button, CircularProgress, Box } from "@mui/material";

interface SecondaryBtnProps {
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

const SecondaryBtn = ({
    children,
    onClick,
    variant = "outlined",
    color = "primary",
    sx = {},
    disabled = false,
    type = "button",
    fullWidth = false,
    className = "",
    loading = false
}: SecondaryBtnProps) => {
    return (
        <Button
            sx={{
                width: fullWidth ? '100%' : 'auto',
                padding: '10px 24px',
                borderRadius: '8px',
                minWidth: '100px',
                borderColor: 'var(--border-default)',
                color: 'var(--text-secondary)',
                '&:hover': {
                    borderColor: 'var(--border-hover)',
                    backgroundColor: 'var(--bg-hover)',
                    color: 'var(--text-white)',
                },
                '&.Mui-disabled': {
                    opacity: 0.5,
                    borderColor: 'var(--border-default)',
                    color: 'var(--text-secondary)',
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

export default SecondaryBtn;
