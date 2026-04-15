"use client";

import PageWrapper from "@/src/components/PageWrapper";
import Content from "./Content";
import Header from "./Header";

/**
 * Renders a page wrapper with a header and content components.
 * The page wrapper component has isLoading and displayBreadcrumbs props set to false.
 * The header component is passed as a prop to the page wrapper component.
 * The content component is passed as a prop to the page wrapper component.
 * @returns {JSX.Element} - The rendered TeacherForm component
 */
export default function TeacherForm() {
  return (
    <PageWrapper
      isLoading={false}
      displayBreadcrumbs={false}
      header={<Header />}
      content={<Content />}
    />
  );
}
