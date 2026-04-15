import { memo } from "react";

import AppBar from "@mui/material/AppBar";
import Image from "next/image";
import { teal } from "@mui/material/colors";

/**
 * Footer component for the layout.
 * It displays a sticky footer at the bottom of the page with a logo.
 * @returns {JSX.Element} - The JSX element for the component.
 */
function FooterLayout() {
  return (
    <AppBar
      className="sticky bottom-0 z-20 p-4"
      elevation={0}
      sx={{
        position: "sticky",
        backgroundColor: teal[700],
      }}
    >
      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />
    </AppBar>
  );
}

export default memo(FooterLayout);
