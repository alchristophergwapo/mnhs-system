"use client";

import { styled } from "@mui/material/styles";
import React, { memo } from "react";
import Box from "@mui/material/Box";

import NavbarLayout from "./components/NavbarLayout";
import ToolbarLayout from "./components/ToolbarLayout";
import FooterLayout from "./components/FooterLayout";

const RootComponent = styled("div")(() => ({}));

type AdminLayoutProps = {
  children: React.ReactNode;
};

function AdminLayout(props: AdminLayoutProps) {
  const { children } = props;

  return (
    <RootComponent className="flex flex-auto w-full">
      <div className="w-full flex flex-auto">
        <NavbarLayout />
        <main className="relative flex min-h-full min-w-0 flex-col w-full">
          <ToolbarLayout />
          <Box
            className="relative w-full h-full z-10 flex min-h-0 flex-auto flex-col"
            sx={{
              "::before": {
                backgroundColor: "teal",
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
