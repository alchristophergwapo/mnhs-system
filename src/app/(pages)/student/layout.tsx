import StudentLayout from "@/src/layout/StudentLayout";
import React from "react";

type LayoutProps = {
    children: React.ReactNode;
}

export default async function Layout(props: LayoutProps) {
    const {children} = props;

    return <StudentLayout>{children}</StudentLayout>
}