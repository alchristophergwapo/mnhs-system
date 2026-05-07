"use client";

import PageWrapper from "@/src/components/PageWrapper";
import { GetStudentsApiArg, useGetStudentsQuery } from "./StudentsApi";
import { useState } from "react";
import Headers from "./Headers";
import Content from "./Content";

export default function GradeVII() {
  const [parameters, setParameters] = useState<GetStudentsApiArg>({
    q: "",
    page: 0,
    limit: 10,
  });
  const { data, isFetching } = useGetStudentsQuery(parameters);
  const students = data?.students;
  const total = data?.totalStudents;

  return (
    <PageWrapper
      data={(students as unknown[] | undefined) || []}
      total={total || 0}
      displayBreadcrumbs={false}
      isLoading={isFetching}
      className="pt-4"
      header={<Headers parameters={parameters} setParameters={setParameters} />}
      content={
        <Content
          parameters={parameters}
          setParameters={(nps) => setParameters(nps as typeof parameters)}
        />
      }
    />
  );
}
