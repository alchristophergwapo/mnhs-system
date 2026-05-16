"use client";

import React, { memo, useMemo } from "react";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Loading from "@components/Loading";
import { useSession } from "next-auth/react";
import { useGetUserSessionQuery } from "@app/UserApi";
import AppContext from "@contexts/AppContext";
import MainThemeProvider from "@contexts/MainThemeProvider";

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
function AppContent(props: AppProps) {
  // Destructure children from props
  const { children } = props;
  // Get session data and authentication status
  const { data, status } = useSession();
  // Fetch user session data with conditional query
  const { data: user, isLoading } = useGetUserSessionQuery(
    Number(data?.user.id),
    {
      // Skip query if not authenticated or user ID is not available
      skip: status !== "authenticated" || !data?.user.id,
      // OPTIMIZATION: Only fetch if we don't have the data yet (initial load)
      // or if the data is older than 5 minutes (handled by keepUnusedDataFor).
      // We rely on RTK Query's `isFetching` to distinguish between "loading from network" 
      // and "loading from cache".
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
    },
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ session: data, user }), [data, user]);

  // Show loading state while fetching user data
  if (isLoading) return <Loading />;

  return (
    // Provide app context to child components
    <AppContext value={contextValue}>
      {/* Apply main theme to the application */}
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
    </AppContext>
  );
}

export default memo(AppContent);