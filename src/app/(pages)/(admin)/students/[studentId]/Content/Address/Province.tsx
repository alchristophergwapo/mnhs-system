import { useFormContext } from "@/src/hooks/useTanstack";
import { memo } from "react";
import { province, provinceRequired } from "./addressValidators";
import Input from "@/src/components/Input";
import { AddressInputProps } from ".";

function Province({
  target,
  required,
}: AddressInputProps) {
  const form = useFormContext();
  return (
    <form.Field
      name={`${target}.province` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: (required ? provinceRequired : province) as any,
      }}
      children={(field) => (
        <Input
          name={field.name}
          label="Province"
          value={field.state.value ?? ""}
          onChange={(e) => field.handleChange(e.target.value as any)}
          error={field.state.meta.errors.length > 0}
          errors={field.state.meta.errors as { message: string }[]}
          required={required}
        />
      )}
    />
  );
}

export default memo(Province);
