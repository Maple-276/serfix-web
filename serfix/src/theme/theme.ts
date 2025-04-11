import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    neutral?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
}

// Tema mejorado con énfasis en diseño futurista y experiencia de usuario
const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#b71c1c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2c3e50',
      light: '#546e7a',
      dark: '#263238',
      contrastText: '#ffffff',
    },
    neutral: {
      main: '#64748B',
      light: '#e0e0e0',
      dark: '#334155',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.35,
      letterSpacing: '-0.005em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 6px 12px rgba(0, 0, 0, 0.1)',
    '0px 8px 16px rgba(0, 0, 0, 0.12)',
    '0px 10px 20px rgba(0, 0, 0, 0.15)',
    '0px 12px 24px rgba(0, 0, 0, 0.17)',
    '0px 14px 28px rgba(0, 0, 0, 0.2)',
    '0px 16px 32px rgba(0, 0, 0, 0.22)',
    '0px 18px 36px rgba(0, 0, 0, 0.25)',
    '0px 20px 40px rgba(0, 0, 0, 0.27)',
    '0px 22px 44px rgba(0, 0, 0, 0.3)',
    '0px 24px 48px rgba(0, 0, 0, 0.32)',
    '0px 26px 52px rgba(0, 0, 0, 0.35)',
    '0px 28px 56px rgba(0, 0, 0, 0.37)',
    '0px 30px 60px rgba(0, 0, 0, 0.4)',
    '0px 32px 64px rgba(0, 0, 0, 0.42)',
    '0px 34px 68px rgba(0, 0, 0, 0.45)',
    '0px 36px 72px rgba(0, 0, 0, 0.47)',
    '0px 38px 76px rgba(0, 0, 0, 0.5)',
    '0px 40px 80px rgba(0, 0, 0, 0.52)',
    '0px 42px 84px rgba(0, 0, 0, 0.55)',
    '0px 44px 88px rgba(0, 0, 0, 0.57)',
    '0px 46px 92px rgba(0, 0, 0, 0.6)',
    '0px 48px 96px rgba(0, 0, 0, 0.62)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        '.MuiDataGrid-root .MuiDataGrid-cellContent': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
        },
        outlined: {
          borderWidth: '2px !important',
          '&:hover': {
            borderWidth: '2px !important',
          }
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'box-shadow 0.2s',
            '&:hover:not(.Mui-error):not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d32f2f',
            },
            '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
          },
          '& .MuiFilledInput-root': {
            borderRadius: '8px 8px 0 0',
            '&:before': {
              transition: 'border-bottom-color 0.2s',
            },
            '&:hover:not(.Mui-error):not(.Mui-disabled):before': {
              borderBottomColor: '#d32f2f',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          transition: 'all 0.15s ease-in-out',
          '&.Mui-selected': {
            backgroundColor: 'rgba(211, 47, 47, 0.08)',
            color: '#d32f2f',
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.12)',
            },
            '& .MuiListItemIcon-root': {
              color: '#d32f2f',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            transform: 'translateX(4px)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
        filledPrimary: {
          background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
          boxShadow: '0 2px 8px rgba(211, 47, 47, 0.3)',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root:last-child': {
            '& .MuiTableCell-root': {
              borderBottom: 'none',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #f0f0f0',
          padding: '16px 24px',
        },
        head: {
          background: '#f9fafb',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#374151',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 26,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
              transform: 'translateX(20px)',
              '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#d32f2f',
              },
            },
          },
          '& .MuiSwitch-thumb': {
            width: 22,
            height: 22,
          },
          '& .MuiSwitch-track': {
            opacity: 1,
            borderRadius: 13,
            backgroundColor: '#e0e0e0',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        }
      }
    }
  },
});

export default theme; 