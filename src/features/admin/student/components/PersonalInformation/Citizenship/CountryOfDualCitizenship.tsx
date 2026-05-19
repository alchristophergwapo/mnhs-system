import Input from "@components/ui/Input";
import { useFormContext } from "@hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import z from "zod";

function CountryOfDualCitizenship({
  dualCitizenship,
}: {
  dualCitizenship: boolean;
}) {
  const form = useFormContext();

  return (
    <form.Field
      name={"citizenship.countryOfDualCitizenship" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z
          .string()
          .nullish()
          .superRefine((value, ctx) => {
            if (dualCitizenship && !value) {
              ctx.addIssue({
                code: "custom",
                message: "Country of dual citizenship is required",
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
        <Input
          name={field.name}
          value={field.state.value || ""}
          onChange={(e) =>
            field.handleChange(
              e.target.value as unknown as UpdaterFn<never, never>,
            )
          }
          label="Please indicate the country"
          errors={field.state.meta.errors as { message: string }[]}
          error={field.state.meta.errors?.length > 0}
          required
        />
      )}
    </form.Field>
  );
}

export default CountryOfDualCitizenship;
