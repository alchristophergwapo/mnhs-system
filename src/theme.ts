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
          main: "#006666",
          light: "#338484",
          dark: "#004747",
          contrastText: "#ffffff",
        },
        background: {
          default: "#F3F4F6", // Light gray canvas
          paper: "#FFFFFF", // White cards
        },
        text: {
          primary: "#111827", // High-contrast near-black
          secondary: "#4B5563",
        },
        success: {
          main: "#10B981",
          light: "#D1FAE5",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#00F5D4", // Teal
          light: "#70FFEA", // Light teal
          dark: "#00BFA5", // Teal-ish
          contrastText: "#0B1416", // Black
        },
        background: {
          // The deep midnight-teal background seen in the sidebar and main canvas
          default: "#121B1D",
          // Slightly lighter for cards/surfaces
          paper: "#1A2426",
        },
        text: {
          primary: "#E0E7E9", // Soft white/grey
          secondary: "#829394", // Muted teal-grey
        },
        success: {
          main: "#34D399",
          light: "rgba(52, 211, 153, 0.15)", // Muted pill backgrounds for dark mode
        },
        divider: "rgba(255, 255, 255, 0.05)",
        action: {
          hover: "rgba(0, 245, 212, 0.08)",
        },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
    fontSize: 12,
    h6: {
      fontWeight: 600,
      color: "#111827", // Ensures card titles are always prominent
    },
    subtitle2: {
      fontWeight: 500,
      color: "#4B5563",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          backgroundImage: "none", // Removes MUI's default elevation overlay
          backgroundColor: theme.palette.mode === "dark" ? "#1A2426!" : "#fff", // Sets the background color for cards
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)", // Adds a box shadow for better depth
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.03)!important"
              : "none",
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Prevents all-caps buttons for a more modern feel
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
          },
        },
        contained: ({ theme }) => ({
          // Adds that subtle "glow" seen on the Join Class button
          color: theme.palette.mode === "dark" ? "black!important" : "#fff",
          boxShadow: "0 0 15px rgba(0, 245, 212, 0.3)",
          "&:hover": {
            boxShadow: "0 0 25px rgba(0, 245, 212, 0.5)",
          },
        }),
        text: ({ theme }) => ({
          color:
            theme.palette.mode === "dark"
              ? `${theme.palette.primary.main}!important`
              : "inherit",
        }),
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
        notchedOutline: ({ theme }) => ({
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.15)"
              : "1px solid rgba(0, 0, 0, 0.15)",
        }),
        root: ({ theme }) => ({
          color:
            theme.palette.mode === "dark"
              ? "white!important"
              : "black!important",
        }),
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.mode === "dark" ? "white" : "black",
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Svg icons should inherit text color or primary color in dark mode
          color: theme.palette.mode === "dark" ? "inherit" : "black",
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color:
            theme.palette.mode === "dark" ? "inherit" : "rgba(0, 0, 0, 0.7)",
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0B1416", // Darker sidebar
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        },
        bar: {
          borderRadius: 4,
          // Gradient progress bars similar to the dashboard
          background: "linear-gradient(90deg, #00BFA5 0%, #00F5D4 100%)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          padding: "16px",
        },
        head: ({ theme }) => ({
          color: "#829394",
          fontWeight: 600,
          textTransform: "uppercase",
          fontSize: "0.75rem",
          backgroundColor:
            theme.palette.mode === "dark" ? "#1d2729!important" : "inherit",
        }),
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
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "14px",
        },
      },
    },
  },
});

export default theme;
