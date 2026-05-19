"use client";

import PageWrapper from "@components/layouts/PageCardedWrapper";
import useStudentPage from "./hooks/useStudentPage";
import StudentPageHeader from "./layout/StudentPageHeader";
import Content from "./layout/StudentPageContent";

/**
 * @component StudentPage
 * @description Renders the main student page component. It integrates a loading state,
 * breadcrumbs, a header, and a form context to display the student content.
 * 
 * @returns {JSX.Element} The rendered student page layout wrapped in a PageWrapper.
 */
function StudentPage() {
  const { isFetching, form } = useStudentPage();

  return (
    <PageWrapper
      isLoading={isFetching}
      displayBreadcrumbs={true}
      content={
        <form.AppForm>
          <Content />
        </form.AppForm>
      }
      header={<StudentPageHeader />}
    />
  );
}

export default StudentPage;
