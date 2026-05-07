import Input from "@/src/components/Input";
import { useFormContext } from "@/src/hooks/useTanstack";
import { memo } from "react";
import { zipCode, zipCodeRequired } from "./addressValidators";
import { AddressInputProps } from ".";

function ZipCode({ target, required }: AddressInputProps) {
  const form = useFormContext();
  return (
    <form.Field
      name={`${target}.zipCode` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: required ? zipCodeRequired : zipCode as any,
      }}
      children={(field) => (
        <Input
          name={field.name}
          label="Zip Code"
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

export default memo(ZipCode);
