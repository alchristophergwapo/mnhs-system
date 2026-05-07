"use client";

import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

/**
 * A custom theme for this app
 * You can also override default components from MUI
 * @see https://mui.com/customization/default-theme/
 */
const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#006666',
          light: '#338484',
          dark: '#004747',
          contrastText: '#ffffff',
        },
        background: {
          default: '#F3F4F6', // Light gray canvas
          paper: '#FFFFFF',   // White cards
        },
        text: {
          primary: '#111827', // High-contrast near-black
          secondary: '#4B5563',
        },
        success: {
          main: '#10B981',
          light: '#D1FAE5',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          // A slightly lighter primary teal ensures better readability against dark backgrounds
          main: '#338484',
          light: '#5CA4A4',
          dark: '#006666',
          contrastText: '#ffffff',
        },
        background: {
          default: '#121212', // Standard dark canvas
          paper: '#1E1E1E',   // Elevated dark cards
        },
        text: {
          primary: '#F9FAFB', // Off-white for less eye strain
          secondary: '#9CA3AF',
        },
        success: {
          main: '#34D399',
          light: 'rgba(52, 211, 153, 0.15)', // Muted pill backgrounds for dark mode
        },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
    fontSize: 12,
    h6: {
      fontWeight: 600,
      color: '#111827', // Ensures card titles are always prominent
    },
    subtitle2: {
      fontWeight: 500,
      color: '#4B5563',
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
          padding: '16px',
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevents all-caps buttons for a more modern feel
          borderRadius: 4,
          fontWeight: 500,
          "&.Mui-disabled": {
            ".MuiCircularProgress-root": {
              color: "white!important",
            },
            ".MuiSvgIcon-root": {
              display: "none",
            },
          },
          "&.MuiButton-text": {
            color: "#006666",
          }
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorDefault: "#004d4d",
        colorTransparent: "#ffffff",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "1px solid rgba(0, 0, 0, 0.15)",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: { color: "black!important" },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(0, 0, 0, 0.7)",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "rgba(0, 0, 0, 0.7)",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.15)",
        }
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          "&.MuiAlert-colorError": {
            backgroundColor: red[200],
            display: "flex",
            alignItems: "center",
            color: "red",
            "& .MuiSvgIcon-root": {
              color: "red!important",
            },
          },
          "& .MuiAlert-message": {
            padding: 0,
          },
          "& .MuiAlert-icon": {
            padding: 0,
          },
        }
      }
    }
  },
});

export default theme;
