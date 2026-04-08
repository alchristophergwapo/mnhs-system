/**
 * Define App as a client side component
 */
"use client";

import React, { useMemo } from "react";
import AppContext from "../contexts/AppContext";
import MainThemeProvider from "../contexts/MainThemeProvider";

type AppProps = {
  children?: React.ReactNode;
};

export default function App(props: AppProps) {
  const { children } = props;
  const contextValue = useMemo(() => ({}), []);

  return (
    <AppContext value={contextValue}>
      <MainThemeProvider>{children}</MainThemeProvider>
    </AppContext>
  );
}
