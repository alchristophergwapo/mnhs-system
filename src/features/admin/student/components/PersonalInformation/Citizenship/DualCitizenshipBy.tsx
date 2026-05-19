import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioSelect from "@components/ui/RadioSelect";
import { useFormContext } from "@hooks/useTanstack";
import z from "zod";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import CountryOfDualCitizenship from "./CountryOfDualCitizenship";

function DualCitizenshipBy() {
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
                }) as unknown as FieldAsyncValidateOrFn<
                Record<string, never>,
                never,
                never
              >,
            }}
          >
            {(field) => (
              <RadioSelect
                name={field.name}
                label=""
                onChange={(e) =>
                  field.handleChange(
                    e.target.value as unknown as UpdaterFn<never, never>,
                  )
                }
                value={field.state.value ?? ""}
                errors={field.state.meta.errors as { message: string }[]}
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
          </form.Field>
          <CountryOfDualCitizenship dualCitizenship={dualCitizenship.state.value} />
        </>
      )}
    </form.Field>
  );
}

export default DualCitizenshipBy;
