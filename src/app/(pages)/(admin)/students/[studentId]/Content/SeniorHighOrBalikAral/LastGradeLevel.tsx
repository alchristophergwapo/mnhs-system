import { useGetGradeLevelsQuery } from "@app/(pages)/(admin)/GradeLevelApi";
import Select from "@components/ui/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "@hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import z from "zod";
import { ReactNode } from "react";

/**
 * A React component that renders a dropdown select field for choosing the last grade level finished.
 * It integrates with a form context and fetches the available grade levels dynamically using an API query.
 * The field supports conditional validation based on the `required` prop.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} [props.required=false] - Determines if the grade level selection is mandatory. 
 *                                           If true, asynchronous validation is applied to ensure a value is selected.
 * @param {boolean} [props.show=false] - Controls whether the grade levels data should be fetched. 
 *                                       If false, the API query is skipped.
 * @returns {JSX.Element} The rendered select field component bound to the form context.
 */
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
          ? z
              .number()
              .nonoptional("Please select a grade level")
              .superRefine((value, ctx) => {
                console.log(value);
                if (!value) {
                  ctx.addIssue({
                    code: "custom",
                    message: "Please select a grade level",
                  });
                }
              })
          : z.number().nullish()) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
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
      )}
    </form.Field>
  );
}

export default LastGradeLevel;
