import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioSelect from "@components/ui/RadioSelect";
import { useFormContext } from "@hooks/useTanstack";
import Input from "@components/ui/Input";
import z from "zod";

/**
 * A component for inputting the teacher's dual citizenship information
 * It renders a RadioSelect component for the teacher's dual citizenship by
 * (either by birth or by naturalization) and an Input component for the country of the teacher's dual citizenship
 * @returns {JSX.Element} - The JSX element for the component
 * @example
 * <DualCitizenship />
 */
export default function DualCitizenship() {
  const form = useFormContext();

  return (
    <form.Field name={"citizenship.dualCitizenship" as never}>
      {(dualCitizenship) => (
        <>
          <form.Field
            name={"citizenship.dualCitizenshipBy" as never}
            validators={{
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: z
                .string()
                .nullish()
                .superRefine((value, ctx) => {
                  if (dualCitizenship.state.value && !value) {
                    ctx.addIssue({
                      code: "custom",
                      message: "Dual citizenship by is required",
                    });
                  }
                }) as any,
            }}
            children={(field) => (
              <RadioSelect
                name={field.name}
                label=""
                onChange={(e) => field.handleChange(e.target.value as any)}
                value={field.state.value ?? ""}
                errors={field.state.meta.errors || []}
                error={field.state.meta.errors?.length > 0}
              >
                <FormControlLabel
                  value="BY_BIRTH"
                  control={<Radio />}
                  label="By birth"
                />
                <FormControlLabel
                  value="BY_NATURALIZATION"
                  control={<Radio />}
                  label="By naturalization"
                />
              </RadioSelect>
            )}
          />
          <form.Field
            name={"citizenship.countryOfDualCitizenship" as never}
            validators={{
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: z
                .string()
                .nullish()
                .superRefine((value, ctx) => {
                  if (dualCitizenship.state.value && !value) {
                    ctx.addIssue({
                      code: "custom",
                      message: "Country of dual citizenship is required",
                    });
                  }
                }) as any,
            }}
            children={(field) => (
              <Input
                name={field.name}
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value as any)}
                label="Please indicate the country"
                errors={field.state.meta.errors || []}
                error={field.state.meta.errors?.length > 0}
                required
              />
            )}
          />
        </>
      )}
    </form.Field>
  );
}
