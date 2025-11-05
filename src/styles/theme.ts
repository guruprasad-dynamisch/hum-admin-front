import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#cca04c',
      light: '#E2C182',
      dark: '#B67D10',
    },
    background: {
      default: '#1a1a1a',
      paper: '#0f0f0f',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.6)',
    },
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '8px',
        },
        contained: {
          backgroundColor: '#cca04c',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#E2C182',
          },
          '&:active': {
            backgroundColor: '#B67D10',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.23)',
          color: '#ffffff',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
        text: {
          color: '#cca04c',
          '&:hover': {
            backgroundColor: 'rgba(212, 165, 116, 0.1)',
          },
        },
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#cca04c',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#cca04c',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#cca04c',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderBottomColor: 'rgba(255, 255, 255, 0.23)',
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&.Mui-focused:after': {
            borderBottomColor: '#cca04c',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0f0f0f',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderColor: 'rgba(255, 255, 255, 0.05)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: 'rgba(255, 255, 255, 0.6)',
          '&.Mui-active': {
            color: '#ffffff',
            fontWeight: 500,
          },
          '&.Mui-completed': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.3)',
          '&.Mui-active': {
            color: '#cca04c',
          },
          '&.Mui-completed': {
            color: '#cca04c',
          },
        },
        text: {
          fill: '#000000',
          fontWeight: 600,
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
        },
        bar: {
          backgroundColor: '#cca04c',
          borderRadius: '4px',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#cca04c',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: '#cca04c',
            '& + .MuiSwitch-track': {
              backgroundColor: '#cca04c',
              opacity: 0.5,
            },
          },
        },
        track: {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.6)',
          '&.Mui-checked': {
            color: '#cca04c',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.6)',
          '&.Mui-checked': {
            color: '#cca04c',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#cca04c',
          textDecoration: 'none',
          transition: 'color 0.2s ease-in-out',
          '&:hover': {
            color: '#c9a05f',
            textDecoration: 'underline',
          },
          '&:visited': {
            color: '#B67D10',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '& a': {
            color: '#cca04c',
            textDecoration: 'none',
            '&:hover': {
              color: '#c9a05f',
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  },
})

export default theme
