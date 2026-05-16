import { memo } from "react";
import { useGetGradeLevelsQuery } from "@app/(pages)/(admin)/GradeLevelApi";
import Select from "@components/ui/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "@hooks/useTanstack";
import z from "zod";

/**
 * GradeLevel component is a form field for selecting a grade level.
 * It uses React Hook Form for form management and a custom query for fetching grade levels.
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
          .object({
            id: z.string(),
            name: z.string(),
          }, "Grade level is required")
          .nonoptional("Grade level is required") as any,
      }}
      children={(field) => {
        const value = field.state.value as {
          id: string;
          name: string;
          gradeLevelNumber: number | null;
        } | null;

        return (
          <Select
            required
            label="Grade Level"
            value={value || { }}
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
            errors={field.state.meta.errors}
          >
            {/* Map through grade levels and create a menu item for each */}
            {gradelevels?.map((gradeLevel) => (
              <MenuItem
                key={gradeLevel.id}
                value={gradeLevel.id}
                selected={Number(gradeLevel.id) === Number(value?.id)}
                onClick={() => field.handleChange(gradeLevel as any)}
              >
                {gradeLevel.name}
              </MenuItem>
            ))}
          </Select>
        );
      }}
    />
  );
}

export default memo(GradeLevel);
