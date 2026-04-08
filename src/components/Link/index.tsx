import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

type CustomLinkProps = Omit<NextLinkProps, "href"> & {
  to?: string;
  href?: string;
  children?: ReactNode;
  className?: string;
  role?: string;
  ref?: React.RefObject<HTMLAnchorElement>;
};

export default function Link(props: CustomLinkProps) {
  const { children, to, href, ...otherProps } = props;

  return (
    <NextLink href={to || href || ""} {...otherProps}>
      {children}
    </NextLink>
  );
}
