import { useFormContext } from "@/src/hooks/useTanstack";
import { memo } from "react";
import z from "zod";
import { UpdaterFn } from "@tanstack/react-form";
import DateInput from "@components/ui/DateInput";

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
          .nonoptional("License expiry date is required") as any,
      }}
      children={(field) => (
        <DateInput
          name={field.name}
          value={
            field.state.value || undefined
          }
          onChange={(newValue) => {
            const value: unknown = newValue;
            field.handleChange(value as UpdaterFn<never, never>);
          }}
          label="License Expiry Date"
          errors={field.state.meta.errors || []}
          error={field.state.meta.errors?.length > 0}
          required
        />
      )}
    />
  );
}

export default memo(LicenseExpiryDate);
