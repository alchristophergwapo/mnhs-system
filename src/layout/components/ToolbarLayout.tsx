import { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Image from "next/image";
import Toolbar from "@mui/material/Toolbar";
import NavbarToggleButton from "./navbar/NavbarToggleButton";
import UserMenu from "../../components/UserMenu";

function ToolbarLayout() {
  return (
    <AppBar
      className="sticky top-0 z-20 flex"
      color="default"
      position="static"
      elevation={0}
    >
      <Toolbar >
        <div className="flex flex-1 space-x-2">
          <NavbarToggleButton />
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
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
