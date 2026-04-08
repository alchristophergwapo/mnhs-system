import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";

type MainThemeProviderProps = {
  children: React.ReactNode;
};
export default function MainThemeProvider(props: MainThemeProviderProps) {
  const { children } = props;

  return (
    <AppRouterCacheProvider
      options={{
        enableCssLayer: true,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
