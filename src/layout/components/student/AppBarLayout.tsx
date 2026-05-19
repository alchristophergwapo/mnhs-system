import { memo, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserMenu from "@components/layouts/UserMenu";
import NavbarToggleButton from "../navbar/NavbarToggleButton";

type AppBarLayoutProps = {
  open: boolean;
  onOpen: () => void;
};

/**
 * Renders the main application bar layout component.
 * This component dynamically adapts to mobile or desktop views by listening
 * to screen width changes (breakpoint at 768px) and conditionally rendering
 * the navbar toggle button. It includes a logo, application title, and user menu.
 *
 * @param {AppBarLayoutProps} props - The props for the component.
 * @param {boolean} props.open - The current open state of the sidebar/navbar.
 * @param {() => void} props.onOpen - Callback function triggered when the navbar toggle button is clicked.
 * @returns {JSX.Element} The rendered AppBar layout component.
 */
function AppBarLayout({ open, onOpen }: AppBarLayoutProps) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false,
  );

  useEffect(() => {
    // Standard mobile breakpoint is often 768px
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Update value when screen size changes
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <div className="flex flex-1 items-center space-x-2">
          <NavbarToggleButton
            open={isMobile ? false : open}
            onClick={() => {
              console.log("clicked");
              onOpen();
            }}
          />
          <img
            src="/assets/images/logo.jpg"
            alt="School logo"
            className="rounded-full mr-4 h-12 w-12"
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="text-white!"
          >
            MNHS
          </Typography>
        </div>

        <div className="flex items-center overflow-x-auto px-2 md:px-4 space-x-1.5">
          <UserMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default memo(AppBarLayout);
