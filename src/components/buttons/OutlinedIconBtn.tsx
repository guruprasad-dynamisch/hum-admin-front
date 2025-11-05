import { Button } from "@mui/material";
import React from 'react';

interface OutlinedIconBtnProps {
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  sx?: object;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const OutlinedIconBtn = ({
  onClick,
  label,
  icon,
  disabled = false,
  sx = {},
  startIcon,
  endIcon,
}: OutlinedIconBtnProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon || icon}
      endIcon={endIcon}
      sx={{
        color: 'var(--text-secondary)',
        fontSize: '14px',
        fontWeight: 400,
        padding: '8px 16px',
        textTransform: 'none',
        borderRadius: '20px',
        gap: '8px',
        '&:hover': {
          color: 'var(--text-white-70)',
          backgroundColor: 'var(--bg-hover)',
        },
        '&.Mui-disabled': {
          opacity: 0.5,
          color: 'var(--text-secondary)',
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};

export default OutlinedIconBtn;
