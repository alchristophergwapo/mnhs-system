"use client";

import AppContext from "@/src/contexts/AppContext";
import StudentLayout from "@/src/layout/StudentLayout";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout(props: LayoutProps) {
  const { children } = props;
  const { session } = useContext(AppContext);
  
  if (!session) redirect("/auth/login");

  if (session?.user?.role !== "STUDENT") {
    redirect(
      session?.user?.role === "ADMIN" || session?.user?.role === "SUPERADMIN"
        ? "/student"
        : "/teacher",
    );
  }

  return <StudentLayout>{children}</StudentLayout>;
}
