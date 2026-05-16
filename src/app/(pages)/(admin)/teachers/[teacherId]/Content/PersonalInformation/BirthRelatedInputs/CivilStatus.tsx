import RadioSelect from "@components/RadioSelect";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Input from "@components/ui/Input";
import { ChangeEvent } from "react";
import { useFormContext } from "@hooks/useTanstack";
import z from "zod";

/**
 * A component that renders a radio group with a label and children.
 * It accepts a label, a default value, a value, and an onChange function.
 * The children should be Radio components.
 * It is used to input the teacher's civil status.
 * @example
 * <CivilStatus />
 */
export default function CivilStatus() {
  const form = useFormContext();

  return (
    <form.Field
      name={"civilStatus" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z.string().nonempty('Gender is required') as any,
      }}
      children={(field) => (
        <RadioSelect
          label="Civil status"
          onChange={(ev: ChangeEvent<HTMLInputElement>, nv: string) =>
            field.handleChange(ev.target.value as any)
          }
          name={field.name}
          value={field.state.value}
          required
          error={field.state.meta.errors.length > 0}
          errors={field.state.meta.errors || []}
        >
          <FormControlLabel value="SINGLE" control={<Radio />} label="Single" />
          <FormControlLabel
            value="MARRIED"
            control={<Radio />}
            label="Married"
          />
          <FormControlLabel
            value="WIDOWED"
            control={<Radio />}
            label="Widowed"
          />
          <FormControlLabel
            value="SEPARATED"
            control={<Radio />}
            label="Separated"
          />
          <div className="flex flex-row">
            <FormControlLabel
              value="OTHER"
              control={<Radio />}
              label="Other/s:"
            />
            {field.state.value === "OTHER" && (
              <form.Field
                name={"civilStatusOther" as never}
                validators={{
                  onChangeAsyncDebounceMs: 300,
                  onChangeAsync: z
                    .string()
                    .nullish()
                    .superRefine((value, ctx) => {
                      if (field.state.value === "OTHER" && !value) {
                        ctx.addIssue({ code: "custom", message: "This field is required when civil status is 'Other'"})
                       }
                    }) as any,
                }}
                children={(subfield) => (
                  <Input
                    value={subfield.state.value ?? ""}
                    onChange={(e) =>
                      subfield.handleChange(e.target.value as any)
                    }
                    name={subfield.name}
                    errors={subfield.state.meta.errors || []}
                    error={subfield.state.meta.errors?.length > 0}
                    placeholder="Please specify"
                  />
                )}
              />
            )}
          </div>
        </RadioSelect>
      )}
    />
  );
}
