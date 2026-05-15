"use client";

import { styled } from "@mui/material/styles";
import React, { memo, useState } from "react";
import Box from "@mui/material/Box";

import NavbarLayout from "./components/NavbarLayout";
import ToolbarLayout from "./components/ToolbarLayout";
import FooterLayout from "./components/FooterLayout";

const RootComponent = styled("div")(() => ({}));

type AdminLayoutProps = {
  children: React.ReactNode;
};

/**
 * A layout component for the admin page.
 * It includes a navbar, a toolbar, and a main content area.
 * The main content area is divided into three sections: a top section with a background color of teal, a middle section for the main content, and a bottom section for the footer.
 * The top section is absolutely positioned and has a height of 200px.
 * The middle section is a flex container and takes up the remaining space.
 * The bottom section is for the footer and is also a flex container.
 * @param {AdminLayoutProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 */
function AdminLayout(props: AdminLayoutProps) {
  const { children } = props;
  const [open, setOpen] = useState(true);

  return (
    <RootComponent className="flex flex-auto w-full">
      <div className="w-full flex flex-auto">
        <NavbarLayout open={open} onClose={() => setOpen(false)}/>
        <main className="relative flex min-h-full min-w-0 flex-col w-full">
          <ToolbarLayout open={open} onOpen={() => setOpen(true)} />
          <Box
            className="relative w-full h-full z-10 flex min-h-0 flex-auto flex-col"
            sx={{
              "::before": {
                backgroundColor: theme => theme.palette.mode === 'dark' ? theme.palette.primary.contrastText: "teal",
                height: "200px",
                content: "''",
                display: "block",
                left: 0,
                top: 0,
                position: "absolute",
                zIndex: 0,
                width: "100%"
              },
            }}
          >
            {children}
          </Box>
          <FooterLayout />
        </main>
      </div>
    </RootComponent>
  );
}

export default memo(AdminLayout);
