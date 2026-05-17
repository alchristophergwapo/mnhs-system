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

/**
 * A wrapper around the NextLink component from next/link.
 * It accepts a to or href prop, which is used as the href of the link.
 * It also accepts any other props that NextLink accepts.
 * It renders the children of the component inside the NextLink.
 * @param {CustomLinkProps} props - The props for the component
 * @returns {JSX.Element} - The JSX element for the component
 */
export default function Link(props: CustomLinkProps) {
  const { children, to, href, ...otherProps } = props;

  return (
    <NextLink href={to || href || ""} {...otherProps}>
      {children}
    </NextLink>
  );
}
