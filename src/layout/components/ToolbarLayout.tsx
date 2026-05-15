import { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Image from "next/image";
import Toolbar from "@mui/material/Toolbar";
import NavbarToggleButton from "./navbar/NavbarToggleButton";
import UserMenu from "../../components/UserMenu";

/**
 * A custom toolbar component for the application.
 * It includes a navbar toggle button, the Next.js logo, and a user menu.
 * The toolbar is sticky and has a z-index of 20 to ensure it is always on top of other elements.
 * The toolbar also has a default color and a static position with an elevation of 0.
 * The inner toolbar component is a flex container with a max width of 1280px and a horizontal padding of 2px on mobile devices and 4px on larger devices.
 * The user menu is a flex container with a horizontal overflow and a padding of 2px on mobile devices and 4px on larger devices.
 * There is also a gap of 1.5 between each item in the user menu.
 */
function ToolbarLayout({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <AppBar
      className="sticky top-0 z-20 flex dark:bg-[#1a2426]!"
      color="default"
      position="static"
      elevation={0}
    >
      <Toolbar>
        <div className="flex flex-1 items-center space-x-2">
          <NavbarToggleButton open={open} onClick={onOpen} />
          <Image
            className="invert dark:to-black"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            style={{ width: 100, height: 20 }}
            priority
          />
        </div>
        <div className="flex items-center overflow-x-auto px-2 md:px-4 space-x-1.5">
          <UserMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default memo(ToolbarLayout);
