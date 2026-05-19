import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Role } from "@/prisma/generated";

/**
 * AuthGuard component - A route protection component that checks user authentication and role
 * It redirects unauthenticated users to login page and admin users to dashboard
 * @param children - React components to be rendered if authentication checks pass
 */
export default async function AuthGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: Partial<Role>[];
}) {
  // Get the current user session
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  if (!allowedRoles.includes(session.user?.role)) {
    redirect("/unauthorized"); // Or redirect to a safe default route based on their actual role
  }

  return <>{children}</>;
}
