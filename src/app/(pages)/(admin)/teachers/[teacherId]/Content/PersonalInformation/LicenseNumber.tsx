import Input from "@components/Input";
import { useFormContext } from "@/src/hooks/useTanstack";
import { memo } from "react";
import z from "zod";

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
          .max(7, "License number cannot be greater than 7 characters") as any,
      }}
      children={(field) => (
        <Input
          name={field.name}
          value={field.state.value ?? ""}
          label="License Number"
          onChange={(e) => field.handleChange(e.target.value as any)}
          errors={field.state.meta.errors || []}
          error={field.state.meta.errors?.length > 0}
          required
        />
      )}
    />
  );
}

export default memo(LicenseNumber);
