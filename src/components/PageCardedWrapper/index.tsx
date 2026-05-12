"use client";

import Paper from "@mui/material/Paper";
import PageBreadcrumbs from "../PageBreadcrumbs";
import clsx from "clsx";
import { cloneElement, memo, useMemo } from "react";
import Loading from "../Loading";

export type SharedPropsType<T> = {
  data?: T;
  total?: number;
  isLoading?: boolean;
};

type PageWrapperProps<T> = SharedPropsType<T> & {
  children?: React.ReactNode;
  header?: React.ReactElement<SharedPropsType<T>>;
  content: React.ReactNode;
  className?: string;
  displayBreadcrumbs?: boolean;
};

/**
 * Page wrapper component that wraps a page with a header, breadcrumbs, and a content section.
 * It also adds loading state to the header and content sections.
 * @template T
 * @param {PageWrapperProps<T>} props
 * @returns {JSX.Element}
 */
function PageCardedWrapper<T>(props: PageWrapperProps<T>) {
  const {
    children,
    header,
    content,
    className,
    data,
    total,
    isLoading = false,
    displayBreadcrumbs = false,
  } = props;

  // Clone the header elements with the data and isLoading props
  const headerWithData = useMemo(() => {
    if (!header) return null;
    return cloneElement(header as React.ReactElement<SharedPropsType<T>>, {
      data,
      total,
      isLoading,
    });
  }, [data, header, total, isLoading]);

  // Clone the content elements with the data and isLoading props
  const contentWithData = useMemo(() => {
    if (isLoading) return <Loading />;
    return cloneElement(content as React.ReactElement<SharedPropsType<T>>, {
      data,
      total,
      isLoading,
    });
  }, [data, isLoading]);

  return (
    <div className={clsx(className, "w-full z-10 p-8")}>
      <div className="flex flex-row justify-between">
        <div className={clsx("", !displayBreadcrumbs && "w-full")}>{headerWithData}</div>
        <div>{displayBreadcrumbs && <PageBreadcrumbs />}</div>
      </div>
      <Paper className="w-full mt-8 flex flex-col py-2 z-10 gap-6 bg-white min-h-40">
        {contentWithData}
      </Paper>
      {children}
    </div>
  );
}

// Memoize the PageWrapper component to prevent unnecessary re-renders
export default memo(PageCardedWrapper);
