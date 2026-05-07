"use client";

import React, { useMemo } from "react";
import AppContext from "../contexts/AppContext";
import MainThemeProvider from "../contexts/MainThemeProvider";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "../store/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type AppProps = {
  children?: React.ReactNode;
};

/**
 * The App component is the root component of the application.
 * It wraps the entire application with the AppContext and the Provider from react-redux.
 * The AppContext is used to provide a context to the entire application, and the Provider is used to connect the application to the Redux store.
 * The App component receives the children as a prop and renders them inside the MainThemeProvider.
 * @param {AppProps} props - The props for the App component.
 * @returns {JSX.Element} - The JSX element for the App component.
 */
export default function App(props: AppProps) {
  const { children } = props;
  const contextValue = useMemo(() => ({}), []);

  return (
    <AppContext value={contextValue}>
      <Provider store={store}>
        <MainThemeProvider>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={5000}
            preventDuplicate
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {children}
            </LocalizationProvider>
          </SnackbarProvider>
        </MainThemeProvider>
      </Provider>
    </AppContext>
  );
}
