import { MouseEvent, ReactNode } from "react";
import Link from "../Link";
import useNavigate from "@/src/hooks/useNavigate";
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

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    navigate(targetUrl);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(targetUrl);
    }
  };

  return (
    <Link legacyBehavior>
      <a
        role={role}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={clsx(
          className,
          isActive ? activeClassName : "",
          pathname === targetUrl && "pointer-events-none",
        )}
      >
        {children}
      </a>
    </Link>
  );
}
