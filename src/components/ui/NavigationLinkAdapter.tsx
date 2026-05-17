import { MouseEvent, ReactNode, useCallback } from "react";
import Link from "./Link";
import useNavigate from "@hooks/useNavigate";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavigationLinkAdapterProps = {
  children: ReactNode;
  role?: string;
  to?: string;
  href?: string;
  className?: string;
  exact?: boolean;
  activeClassName?: string;
};

/**
 * A component that wraps the Link component from @mui/material.
 * It takes the children, role, to, href, className, exact, and activeClassName props, and passes them to the Link component.
 * It also passes any other props to the Link component.
 * If the exact prop is true, it will check if the current pathname matches the targetUrl.
 * Otherwise, it will check if the current pathname starts with the targetUrl.
 * If the pathname matches or starts with the targetUrl, it will add the activeClassName class to the Link component.
 * @example
 * <NavigationLinkAdapter to="/admin" exact activeClassName="active">
 *   Admin
 * </NavigationLinkAdapter>
 */
export default function NavigationLinkAdapter(
  props: NavigationLinkAdapterProps,
) {
  const {
    children,
    role = "button",
    to,
    href,
    className,
    exact,
    activeClassName = "active",
  } = props;
  const navigate = useNavigate();
  const pathname = usePathname();

  const targetUrl = to || href || "";
  const isActive = exact
    ? pathname === targetUrl
    : pathname.startsWith(targetUrl);

  /**
   * Handles the click event on the navigation link.
   * Prevents the default link behavior and navigates to the targetUrl instead.
   */
  const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(targetUrl);
  }, [])

  return (
    <Link
      role={role}
      onClick={handleClick}
      className={clsx(
        className,
        isActive ? activeClassName : "",
        pathname === targetUrl && "pointer-events-none",
      )}
    >
      {children}
    </Link>
  );
}
