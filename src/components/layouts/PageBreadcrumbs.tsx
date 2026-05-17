import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import Link from "../ui/Link";
import { NavigationItemType } from "@layout/components/navigation/types/NavigationItemType";
import useNavigation from "@layout/components/navigation/hooks/useNavigation";
import { useMemo } from "react";

// Function to get the navigation item based on URL
function getNavigationItem(
  url: string,
  navigationItems: NavigationItemType[],
): NavigationItemType | null {
  for (const item of navigationItems) {
    if (item.url === url) {
      return item;
    }

    if (item.children) {
      const childItem = getNavigationItem(url, item.children);
      if (childItem) {
        return childItem;
      }
    }
  }
  return null;
}

/**
 * PageBreadcrumbs component renders a breadcrumb navigation based on the current URL.
 * It uses the `useNavigation` hook to get the navigation tree and the `usePathname` hook to get the current URL.
 * It then maps over the URL path to generate the breadcrumb items, using the navigation item title if available, or the capitalized URL path otherwise.
 * The component returns a `Breadcrumbs` component with the generated breadcrumb items.
 * @returns {JSX.Element} A `Breadcrumbs` component with the generated breadcrumb items.
 */
export default function PageBreadcrumbs() {
  const { navigationTree } = useNavigation();
  const pathname = usePathname();
  const navItemMap = useMemo(() => {
    const map: Record<string, NavigationItemType> = {};
    navigationTree.forEach((item) => {
      if (!item.url) return;
      map[item.url] = item;
    });
    return map;
  }, [navigationTree]);

  const crumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((path, index) => {
      const url = `${pathname.split("/").slice(0, index + 1).join("/")}`;
      const navItem = navItemMap[url];
      return {
        title: navItem?.title || path.replace(/^./, char => char.toUpperCase()),
        path: url,
      };
    });

  return (
    <Breadcrumbs className="flex flex-row-reverse" separator="››" aria-label="breadcrumb">
      {crumbs.map((crumb, index) => (
        <Typography
          key={index}
          component={crumb.path ? Link : "p"}
          to={crumb.path}
          role="button"
          className="text-sm"
        >
          {crumb.title}
        </Typography>
      ))}
    </Breadcrumbs>
  );
}
