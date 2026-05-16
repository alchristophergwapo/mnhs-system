"use client";

import React, { memo } from "react";
import { Provider } from "react-redux";
import store from "@store/store";
import AppContent from "@components/App/AppContent";

type AppProps = {
  children?: React.ReactNode;
};

/**
 * The main application component that wraps its children with necessary
 * global providers (such as the Redux store) and renders the main content.
 *
 * @param {AppProps} props - The props object for the App component.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the AppContent.
 * @returns {JSX.Element} The rendered component tree wrapped by the Provider.
 */
function App({ children }: React.PropsWithChildren<AppProps>) {
  return (
    <Provider store={store}>
      <AppContent>{children}</AppContent>
    </Provider>
  );
}

export default memo(App);
