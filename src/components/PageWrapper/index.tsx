"use client";

import Paper from "@mui/material/Paper";
import PageBreadcrumbs from "../PageBreadcrumbs";
import clsx from "clsx";
import { cloneElement, memo, useMemo } from "react";

export type SharedPropsType<T> = {
  data?: T[];
  isLoading: boolean;
};

type PageWrapperProps<T> = SharedPropsType<T> & {
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
function PageWrapper<T>(props: PageWrapperProps<T>) {
  const {
    header,
    content,
    className,
    data,
    isLoading,
    displayBreadcrumbs = true,
  } = props;

  // Clone the header elements with the data and isLoading props
  const headerWithData = header
    ? useMemo(
        () =>
          cloneElement(header as React.ReactElement<SharedPropsType<T>>, {
            data,
            isLoading,
          }),
        [data],
      )
    : null;

  // Clone the content elements with the data and isLoading props
  const contentWithData = useMemo(
    () =>
      cloneElement(content as React.ReactElement<SharedPropsType<T>>, {
        data,
        isLoading,
      }),
    [data],
  );

  return (
    <div className={clsx(className, "w-full z-10 p-8")}>
      <div className="w-full">{displayBreadcrumbs && <PageBreadcrumbs />}</div>
      <div className="w-full mt-1">{headerWithData}</div>
      <Paper className="w-full mt-8 flex flex-col py-2 z-10 gap-6 bg-white min-h-40">
        {contentWithData}
      </Paper>
    </div>
  );
}

// Memoize the PageWrapper component to prevent unnecessary re-renders
export default memo(PageWrapper);
