import React from "react";
import AdminLayout from "@/src/layout/AdminLayout";

type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
    const {children} = props;

    return <AdminLayout>{children}</AdminLayout>
}