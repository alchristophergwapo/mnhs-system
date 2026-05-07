import EmptyLayout from "@/src/layout/EmptyLayout";
import React from "react";

type LayoutProps = {
    children: React.ReactNode;
}

export default async function Layout(props: LayoutProps) {
    const {children} = props;

    return <EmptyLayout>{children}</EmptyLayout>
}