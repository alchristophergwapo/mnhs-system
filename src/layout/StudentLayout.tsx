"use client";

import { styled } from "@mui/material/styles";
import React, { memo, useState } from "react";
import AppBarLayout from "./components/student/AppBarLayout";
import StudentNavbarLayout from "./components/student/StudentNavbarLayout";
import Toolbar from "@mui/material/Toolbar";

const RootComponent = styled("div")(() => ({}));

type StudentLayoutProps = {
  children: React.ReactNode;
};

function StudentLayout(props: StudentLayoutProps) {
  const { children } = props;
  const [open, setOpen] = useState(true);

  return (
    <RootComponent className="flex flex-auto w-full">
      <AppBarLayout open={open} onOpen={() => setOpen(!open)} />
      <StudentNavbarLayout
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
      <div className="w-full flex flex-auto">
        <main className="relative flex min-h-full min-w-0 flex-col w-full">
          <Toolbar />
          {children}
        </main>
      </div>
    </RootComponent>
  );
}

export default memo(StudentLayout);
