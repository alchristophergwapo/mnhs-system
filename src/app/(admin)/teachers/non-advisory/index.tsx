"use client";

import Content from "./Content";
import { useGetTeachersQuery } from "../TeachersApi";
import PageWrapper from "@/src/components/PageWrapper";
import Headers from "./Headers";
import { useState } from "react";

/**
 * NonAdvisory component
 *
 * This component renders a page wrapper with a header and content.
 * It fetches the list of non-advisory teachers from the TeachersApi
 * and displays them in a table.
 *
 * @returns {JSX.Element} - The rendered NonAdvisory component
 */
export default function NonAdvisory() {
  const defaultOptions = {
    q: "",
    page: 0,
    limit: 10,
    type: "non-advisory",
  };
  const [options, setOptions] = useState(defaultOptions);

  // Fetch the list of non-advisory teachers from the TeachersApi
  const { data, isLoading, isFetching, error } = useGetTeachersQuery(options);
  const teachers = data?.teachers;
  const total = data?.totalTeachers;

  /**
   * Handles the search event by updating the options state with the new options.
   * @param {typeof defaultOptions} newoptions - The new options to update the state with.
   */
  const handleOptionsChange = (newoptions: typeof defaultOptions) => {
    setOptions(newoptions);
  };

  if (error) return <div>An error occurred</div>;

  return (
    <PageWrapper
      data={teachers || []}
      isLoading={isLoading || isFetching}
      className="pt-4"
      header={<Headers options={options} setOptions={handleOptionsChange} />}
      content={<Content total={total || 0} options={options} setOptions={(newOpt) => handleOptionsChange(newOpt as typeof defaultOptions)} />}
    />
  );
}
