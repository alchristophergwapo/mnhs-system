"use client";

import TeachersPageContent from "./TeachersPageContent";
import { useGetTeachersQuery } from "./TeachersApi";
import PageWrapper from "@components/PageCardedWrapper";
import Headers from "./TeachersPageHeaders";
import { useState } from "react";

/**
 * Teachers component
 *
 * This component renders a page wrapper with a header and content.
 * It fetches the list of teachers from the TeachersApi
 * and displays them in a table.
 *
 * @returns {JSX.Element} - The rendered Teachers component
 */
export default function Teachers() {
  const defaultOptions = {
    q: "",
    page: 0,
    limit: 10,
    type: "non-advisory",
  };
  const [parameters, setParameters] = useState(defaultOptions);

  // Fetch the list of non-advisory teachers from the TeachersApi
  const { data, isFetching, error } = useGetTeachersQuery(parameters);
  const teachers = data?.teachers;
  const total = data?.totalTeachers;

  /**
   * Handles the search event by updating the parameters state with the new parameters.
   * @param {typeof defaultOptions} newoptions - The new parameters to update the state with.
   */
  const handleOptionsChange = (newoptions: typeof defaultOptions) => {
    setParameters(newoptions);
  };

  if (error) return <div>An error occurred</div>;

  return (
    <PageWrapper
      data={teachers || []}
      total={total || 0} 
      isLoading={isFetching}
      className="pt-4"
      header={<Headers parameters={parameters} setParameters={handleOptionsChange} />}
      content={<TeachersPageContent parameters={parameters} setParameters={(newOpt) => handleOptionsChange(newOpt as typeof defaultOptions)} />}
    />
  );
}
