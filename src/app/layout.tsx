import type { Metadata } from "next";
import "./globals.css";
import App from "./App";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth";
import { StyledEngineProvider } from "@mui/material/styles";
import { InitColorSchemeScript } from "@mui/material";

export const metadata: Metadata = {
  title: "MNHS Portal",
  description: "Mantalongon National High School portal",
};

/**
 * The root layout component for the application.
 * It wraps the entire application with the Next.js `<html>` element,
 * and includes the necessary meta tags, stylesheets, and script tags.
 * It also sets up the Next.js `<body>` element with the necessary classes.
 * @param children The children of the component, which is the entire application.
 * @returns The root layout component.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={`h-full antialiased`} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <base href="/" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <noscript id="emotion-insertion-point" />
      </head>
      <body id="root" className="min-h-full flex flex-col">
        <SessionProvider session={session}>
          <StyledEngineProvider injectFirst>
            <InitColorSchemeScript attribute="class" />
            <App>{children}</App>
          </StyledEngineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
