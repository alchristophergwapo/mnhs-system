import MenuItem from "@mui/material/MenuItem";
import Select from "@components/ui/Select";
import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react"
import { useGetGradeLevelsQuery } from "@app/(pages)/(admin)/GradeLevelApi";
import z from "zod";

function GradeLevel() {

  const form = useFormContext();

  const {data: gradelevels, isFetching, isLoading} = useGetGradeLevelsQuery({query: ""});

  return (
    <form.Field
      name={"gradeLevelId" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z.coerce.number().nonoptional("gradelevel is required") as any,
      }}
      children={(field) => (
        <Select
          label="Grade Level"
          onChange={(e) => field.handleChange(e.target.value as any)}
          value={field.state.value ?? ""}
          errors={field.state.meta.errors}
          error={field.state.meta.errors?.length > 0}
          disabled={isFetching || isLoading}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {gradelevels?.map((gradelevel) => (
            <MenuItem key={gradelevel.id} value={gradelevel.id}>
              {gradelevel.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}

export default memo(GradeLevel)