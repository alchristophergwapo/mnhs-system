import AutocompleteSearch from "@components/ui/AutocompleteSearch";
import { useGetTeachersQuery } from "@app/(pages)/(admin)/teachers/TeachersApi";
import { useState } from "react";
import { UserType } from "../../../teachers/_types";
import { useFormContext } from "@hooks/useTanstack";
import { UpdaterFn } from "@tanstack/react-form";

/**
 * AssignAdviser component provides a searchable autocomplete input
 * to find and assign a teacher as an adviser.
 * It utilizes `useGetTeachersQuery` to fetch teacher data based on
 * search input and integrates with `useFormContext` for form state management.
 *
 * @returns {JSX.Element} The rendered autocomplete search field for assigning an adviser.
 */
function AssignAdviser() {
  const defaultOptions = {
    q: "",
    page: 0,
    limit: 10,
    type: "non-advisory",
  };

  const [parameters, setParameters] = useState(defaultOptions);
  const { data, isFetching } = useGetTeachersQuery(parameters, {
    skip: !parameters.q,
  });
  const teachers = data?.teachers;
  const form = useFormContext();

  return (
    <form.Field name={"adviser" as never}>
      {(field) => (
        <AutocompleteSearch
          value={field.state.value}
          options={teachers}
          loading={isFetching}
          getOptionLabel={(option: unknown) => {
            const optionValue = option as UserType;
            return typeof option === "string"
              ? option
              : optionValue?.firstName + " " + optionValue?.lastName;
          }}
          label="Search and assign adviser"
          onInputValueChange={(q) => setParameters({ ...parameters, q })}
          onValueChange={(val: unknown) =>
            field.handleChange(val as UpdaterFn<never, never>)
          }
        />
      )}
    </form.Field>
  );
}

export default AssignAdviser;
