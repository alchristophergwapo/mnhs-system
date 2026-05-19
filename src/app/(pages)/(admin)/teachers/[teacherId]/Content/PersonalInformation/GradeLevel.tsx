import MenuItem from "@mui/material/MenuItem";
import Select from "@components/ui/Select";
import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { useGetGradeLevelsQuery } from "@app/(pages)/(admin)/GradeLevelApi";
import z from "zod";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * A React component that renders a dropdown select menu for choosing a grade level.
 * It integrates with a form context to manage the `gradeLevelId` field state and validation.
 * The component fetches the available grade levels dynamically using an API query and disables
 * the select input while the data is loading or fetching. It enforces asynchronous validation
 * to ensure a grade level is selected before form submission.
 *
 * @returns {JSX.Element} The rendered grade level select field component.
 */
function GradeLevel() {
  const form = useFormContext();

  const {
    data: gradelevels,
    isFetching,
    isLoading,
  } = useGetGradeLevelsQuery({ query: "" });

  return (
    <form.Field
      name={"gradeLevelId" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z.coerce
          .number()
          .nonoptional(
            "gradelevel is required",
          ) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Select
          label="Grade Level"
          onChange={(e) =>
            field.handleChange(
              e.target.value as unknown as UpdaterFn<never, never>,
            )
          }
          value={field.state.value ?? ""}
          errors={field.state.meta.errors as { message: string }[]}
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
    </form.Field>
  );
}

export default memo(GradeLevel);
