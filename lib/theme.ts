import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1D6FA4',
      light: '#E8F1F8',
      dark: '#1C3557',
    },
    secondary: {
      main: '#1C3557',
    },
    background: {
      default: '#0A0A0F',
      paper: '#0D1117',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#9AA5B4',
    },
  },
  typography: {
    fontFamily: 'Inter, Space Grotesk, sans-serif',
    h1: { fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 },
    h2: { fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 },
    h3: { fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #1C3557',
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
  },
});
