"use client";

import { styled } from "@mui/material/styles";
import React, { memo } from "react";

const RootComponent = styled("div")(() => ({}));

type EmptyLayoutProps = {
  children: React.ReactNode;
};

function EmptyLayout(props: EmptyLayoutProps) {
  const { children } = props;

  return (
    <RootComponent className="flex flex-auto w-full">
      <div className="w-full flex flex-auto">
        <main className="relative flex min-h-full min-w-0 flex-col w-full">
          {children}
        </main>
      </div>
    </RootComponent>
  );
}

export default memo(EmptyLayout);
