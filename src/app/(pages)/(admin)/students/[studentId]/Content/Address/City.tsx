import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { city, cityRequired } from "./addressValidators";
import Input from "@components/ui/Input";
import { AddressInputProps } from ".";

function City({ target, required }: AddressInputProps) {
  const form = useFormContext();
  return (
    <form.Field
      name={`${target}.city` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: (required ? cityRequired : city) as any,
      }}
      children={(field) => (
        <Input
          name={field.name}
          label="City/Municipality"
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

export default memo(City);
