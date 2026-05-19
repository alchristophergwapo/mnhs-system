import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import z from "zod";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import DateInput from "@components/ui/DateInput";

/**
 * A React component that renders a date input field for the user's license expiry date.
 * It integrates with `useFormContext` to manage form state and applies asynchronous
 * Zod validation to ensure the date is valid, non-optional, and not about to expire
 * (must be later than the first day of the current month).
 *
 * @returns {JSX.Element} The rendered license expiry date form field.
 */
function LicenseExpiryDate() {
  const form = useFormContext();
  return (
    <form.Field
      name={"licenseExpiryDate" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z.coerce
          .date("License expiry date must be a valid date")
          .min(
            new Date(
              `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`,
            ),
            "Your license is about to expire",
          )
          .nonoptional(
            "License expiry date is required",
          ) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <DateInput
          name={field.name}
          value={field.state.value || undefined}
          onChange={(newValue) => {
            const value: unknown = newValue;
            field.handleChange(value as UpdaterFn<never, never>);
          }}
          label="License Expiry Date"
          errors={field.state.meta.errors as { message: string }[]}
          error={field.state.meta.errors?.length > 0}
          required
        />
      )}
    </form.Field>
  );
}

export default memo(LicenseExpiryDate);
