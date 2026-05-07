import { useGetGradeLevelsQuery } from "@/src/app/(admin)/GradeLevelApi";
import Select from "@/src/components/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "@/src/hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import z from "zod";
import { ReactNode } from "react";

function LastGradeLevel({
  required = false,
  show = false,
}: {
  required?: boolean;
  show?: boolean;
}) {
  const { data: gradelevels } = useGetGradeLevelsQuery(
    {
      query: "",
    },
    {
      skip: !show,
    },
  );
  const form = useFormContext();

  return (
    <form.Field
      name={"enrollmentBackground.lastGradeLevel" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: (required
          ? z.number().nonoptional("Please select a grade level")
          .superRefine((value, ctx) => {
            console.log(value)
              if(!value) {
                ctx.addIssue({
                  code: "custom",
                  message: "Please select a grade level",
                })
              }
          }
          )
          : z.number().nullish()) as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
      children={(field) => (
        <Select
          required={required}
          label="Last Grade Level Finished"
          value={field.state.value || ""}
          name={field.name}
          displayEmpty
          renderValue={(val: unknown) => {
            if (val) {
              return val as ReactNode;
            }
            return <em>Select grade level</em>;
          }}
          onChange={(e) =>
            field.handleChange(e.target.value as UpdaterFn<never, never>)
          }
          error={field.state.meta.errors.length > 0}
          errors={field.state.meta.errors as { message: string }[]}
        >
          {gradelevels?.map((gradeLevel) => (
            <MenuItem
              key={gradeLevel.id}
              value={gradeLevel.gradeLevelNumber}
              onClick={() => field.handleChange(gradeLevel as any)}
            >
              {gradeLevel.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}

export default LastGradeLevel;
