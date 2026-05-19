import { memo } from "react";
import { useGetGradeLevelsQuery } from "@app/(pages)/(admin)/GradeLevelApi";
import Select from "@components/ui/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "@hooks/useTanstack";
import z from "zod";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import { GradeLevelType } from "@types";

/**
 * A React component that renders a grade level selection dropdown.
 * It fetches available grade levels using a custom query and integrates
 * with React Hook Form for state management and asynchronous validation.
 * The field requires a grade level to be selected, debouncing the
 * validation check by 300ms for performance optimization.
 *
 * @returns {JSX.Element} The rendered grade level select component.
 */
function GradeLevel() {
  // Fetches grade levels data using a custom query
  const { data: gradelevels } = useGetGradeLevelsQuery({
    query: "",
  });
  // Gets access to the form context from React Hook Form
  const form = useFormContext();

  return (
    <form.Field
      name={"gradeLevel" as never}
      validators={{
        // Debounce validation to 300ms for performance
        onChangeAsyncDebounceMs: 300,
        // Validate that the grade level is a required number
        onChangeAsync: z
          .object(
            {
              id: z.string(),
              name: z.string(),
            },
            "Grade level is required",
          )
          .nonoptional(
            "Grade level is required",
          ) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => {
        const value = field.state.value as GradeLevelType | null;

        return (
          <Select
            required
            label="Grade Level"
            value={value || {}}
            name={field.name}
            displayEmpty
            renderValue={(val) => {
              const selectedGradeLevel = value;
              if (selectedGradeLevel?.name) {
                return selectedGradeLevel.name;
              }
              return <em>Select grade level</em>;
            }}
            error={field.state.meta.errors.length > 0}
            errors={field.state.meta.errors as { message: string }[]}
          >
            {/* Map through grade levels and create a menu item for each */}
            {gradelevels?.map((gradeLevel: GradeLevelType) => (
              <MenuItem
                key={gradeLevel.id}
                value={gradeLevel.id}
                selected={Number(gradeLevel.id) === Number(value?.id)}
                onClick={() =>
                  field.handleChange(
                    gradeLevel as unknown as UpdaterFn<never, never>,
                  )
                }
              >
                {gradeLevel.name}
              </MenuItem>
            ))}
          </Select>
        );
      }}
    </form.Field>
  );
}

export default memo(GradeLevel);
