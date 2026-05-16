import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";

type MainThemeProviderProps = {
  children: React.ReactNode;
};

/**
 * A component that wraps the app with the MUI theme and
 * AppRouterCacheProvider from @mui/material-nextjs/v13-appRouter.
 * It provides a cache layer for server-side rendering (SSR) and
 * static site generation (SSG) to improve performance.
 * It also provides a CssBaseline component to ensure that the
 * app's CSS rules are applied.
 * @param {MainThemeProviderProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 */
export default function MainThemeProvider(props: MainThemeProviderProps) {
  const { children } = props;

  return (
    <AppRouterCacheProvider
      options={{
        enableCssLayer: true,
      }}
    >
      <ThemeProvider
        theme={theme}
        modeStorageKey="mnhs-themeMode"
        defaultMode="dark"
      >
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
