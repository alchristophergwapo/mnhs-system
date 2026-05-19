import Input from "@components/ui/Input";
import { useFormContext } from "@hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import { JSX } from "react";
import z from "zod";

/**
 * Renders a form section for inputting the maximum capacity.
 * This component integrates with `useFormContext` to manage form state and
 * applies asynchronous Zod validation to ensure the value is a required
 * positive number no greater than 50. It also handles type casting to
 * satisfy strict form field type constraints.
 *
 * @returns {JSX.Element} The rendered form field for maximum capacity.
 */
function SectionMaxCapacity(): JSX.Element {
  const form = useFormContext();

  return (
    <form.Field
      name={"maxCapacity" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z.coerce
          .number()
          .min(1, "Max capacity must be a positive number")
          .max(50, "Max capacity must be no more than 50")
          .nonoptional(
            "Max capacity is required",
          ) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Input
          label="Max capacity"
          placeholder="e.g., 30"
          required
          value={field.state.value || ""}
          onChange={(e) =>
            field.handleChange(
              Number(e.target.value) as unknown as UpdaterFn<never, never>,
            )
          }
          error={field.state.meta.errors.length > 0}
          errors={field.state.meta.errors as { message: string }[]}
        />
      )}
    </form.Field>
  );
}

export default SectionMaxCapacity;
