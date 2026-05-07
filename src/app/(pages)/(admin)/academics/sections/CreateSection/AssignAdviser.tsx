import AutocompleteSearch from "@/src/components/AutocompleteSearch";
import { useGetTeachersQuery } from "../../../teachers/TeachersApi";
import { useState } from "react";
import { UserType } from "../../../teachers/_types";
import { useFormContext } from "@/src/hooks/useTanstack";

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
    <form.Field
      name={"adviser" as never}
      children={(field) => (
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
          onValueChange={(val) => {
            console.log(val);
            field.handleChange(val as any);
          }}
        />
      )}
    />
  );
}

export default AssignAdviser;
