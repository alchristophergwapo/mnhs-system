"use client";

import PageWrapper from "@components/layouts/PageCardedWrapper";
import { useMemo, useState } from "react";
import { GetStudentsApiArg } from "../api/students.types";
import { useGetStudentsQuery } from "../api/students.api";
import StudentsPageHeaders from "./StudentPageHeaders";
import StudentsPageContent from "./StudentsPageContent";

/**
 * The Students component renders a paginated list of students.
 * It utilizes the `useGetStudentsQuery` hook to fetch student data based on
 * the current search, pagination, and limit parameters.
 * It manages the query parameters (search query, page number, and limit) via React state
 * and passes them down to the `Headers` and `Content` child components.
 * @returns {JSX.Element} The rendered student list page wrapped in a `PageWrapper` component.
 */
function StudentsPage() {
  const [parameters, setParameters] = useState<GetStudentsApiArg>({
    q: "",
    page: 0,
    limit: 10,
  });
  const { data, isFetching } = useGetStudentsQuery(parameters);
  const students = useMemo(() => data?.students, [data?.students]);
  const total = useMemo(() => data?.totalStudents, [data?.totalStudents]);

  return (
    <PageWrapper
      data={(students as unknown[] | undefined) || []}
      total={total || 0}
      displayBreadcrumbs={false}
      isLoading={isFetching}
      className="pt-4"
      header={
        <StudentsPageHeaders
          parameters={parameters}
          setParameters={setParameters}
        />
      }
      content={
        <StudentsPageContent
          parameters={parameters}
          setParameters={(nps) => setParameters(nps as typeof parameters)}
        />
      }
    />
  );
}

export default StudentsPage;
