import Input from "@components/ui/Input";
import { useFormContext } from "@hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import { memo } from "react";
import z from "zod";

/**
 * A React component that renders a form field for a License Number input.
 * It integrates with `useFormContext` to manage form state and applies
 * asynchronous Zod validation to ensure the input meets specific criteria:
 * - Must not be empty.
 * - Must only contain numbers, spaces, or hyphens.
 * - Must be exactly 7 characters long.
 * - Validation is debounced by 300ms on change.
 *
 * @returns {JSX.Element} The rendered License Number input field.
 */
function LicenseNumber() {
  const form = useFormContext();
  return (
    <form.Field
      name={"licenseNumber" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z
          .string()
          .nonempty("License number is required")
          .regex(/^[0-9 -]+$/, "Only letters and numbers are allowed")
          .min(7, "License number must be at least 7 characters")
          .max(
            7,
            "License number cannot be greater than 7 characters",
          ) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Input
          name={field.name}
          value={field.state.value ?? ""}
          label="License Number"
          onChange={(e) =>
            field.handleChange(
              e.target.value as unknown as UpdaterFn<never, never>,
            )
          }
          errors={field.state.meta.errors as { message: string }[]}
          error={field.state.meta.errors?.length > 0}
          required
        />
      )}
    </form.Field>
  );
}

export default memo(LicenseNumber);
