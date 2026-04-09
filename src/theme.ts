"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark", // Tells MUI to use white text by default
    primary: {
      main: "#006666",
      light: "#338484",
      dark: "#004747",
      contrastText: "#ffffff",
    },
    background: {
      // The main "canvas" of your app
      default: "#006666",
      paper: "#fff",
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
      styleOverrides: {},
    },
    MuiAppBar: {
      styleOverrides: {
        colorDefault: "#004d4d",
        colorTransparent: "#ffffff",
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          border: "1px solid gray",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(0, 0, 0, 0.15)",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: { color: "black" },
      },
    },
  },
});

export default theme;
