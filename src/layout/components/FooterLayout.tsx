import { memo } from "react";

import AppBar from "@mui/material/AppBar";
import Image from "next/image";
function FooterLayout() {
  return (
    <AppBar
      className="sticky bottom-0 relative z-20 p-4"
      color="default"
      elevation={0}
      sx={{
        position: "sticky",
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
