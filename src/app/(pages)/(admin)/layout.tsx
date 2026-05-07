import React, { useMemo } from "react";
import AdminLayout from "@/src/layout/AdminLayout";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

type LayoutProps = {
  children: React.ReactNode;
};

/**
 * A wrapper component that wraps the AdminLayout component from @/src/layout/AdminLayout.
 * It takes a children prop, which is the content to be rendered inside the AdminLayout.
 * @param {LayoutProps} props - The props for the component.
 * @example
 * <Layout>
 *   <div>Content</div>
 * </Layout>
 */
export default async function Layout(props: LayoutProps) {
  const { children } = props;
  const { data, status } = useSession();

  const session = useMemo(() => data, [data, status]);

  if (!session) {
    redirect("/auth/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}
