import React from "react";
import AdminLayout from "@/src/layout/AdminLayout";

type LayoutProps = {
    children: React.ReactNode;
}

/**
 * A wrapper component that wraps the AdminLayout component from @/src/layout/AdminLayout.
 * It takes a children prop, which is the content to be rendered inside the AdminLayout.
 * @param {LayoutProps} props - The props for the component.
 * @example
 * <Layout>
 *   <div>Content</div>
 * </Layout>
 */
export default function Layout(props: LayoutProps) {
    const {children} = props;

    return <AdminLayout>{children}</AdminLayout>
}