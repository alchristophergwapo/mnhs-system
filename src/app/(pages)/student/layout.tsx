import StudentLayout from "@layout/StudentLayout";
import AuthGuard from "@server/auth/AuthGuard";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

/**
 * An async layout component that wraps its children within a student-specific layout
 * and an authentication guard restricting access to the "STUDENT" role.
 *
 * @param {LayoutProps} props - The props object for the layout.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the layout.
 * @returns {Promise<JSX.Element>} A promise that resolves to the rendered layout component.
 */
export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <AuthGuard allowedRoles={["STUDENT"]}>
      <StudentLayout>{children}</StudentLayout>
    </AuthGuard>
  );
}
