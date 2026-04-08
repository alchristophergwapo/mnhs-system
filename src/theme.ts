"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark', // Tells MUI to use white text by default
    primary: {
      main: "#006666", 
      light: "#338484",
      dark: "#004747",
      contrastText: "#ffffff",
    },
    background: {
      // The main "canvas" of your app
      default: "#006666",
      paper: "#fff"
    },
    text: {
      primary: "#000000",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    fontFamily: "var(--font-roboto)",
    fontSize: 12,
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          // Since background is #006666, we add a subtle border 
          // to buttons so they don't blend into the background
          backgroundColor: "#006666",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          "&:hover": {
            backgroundColor: "#008080", // Lightens on hover for feedback
            borderColor: "#ffffff",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorDefault: "#004d4d",
        colorTransparent: "#ffffff",
      },
    },
  },
});

export default theme;