import Input from "@components/Input";
import { useFormContext } from "@/src/hooks/useTanstack";
import { format, parseISO } from "date-fns";
import { memo } from "react";
import z from "zod";

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
            new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`),
            "Your license is about to expire",
          )
          .nonoptional("License expiry date is required") as any,
      }}
      children={(field) => (
        <Input
          name={field.name}
          type="date"
          value={
            field.state.value
              ? format(parseISO(field.state.value), "yyyy-MM-dd")
              : ""
          }
          label="License Expiry Date"
          onChange={(e) => field.handleChange(e.target.value as any)}
          errors={field.state.meta.errors || []}
          error={field.state.meta.errors?.length > 0}
          required
        />
      )}
    />
  );
}

export default memo(LicenseExpiryDate);
