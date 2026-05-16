import Input from "@components/ui/Input";
import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { street } from "./addressValidators";
import { AddressInputProps } from ".";

function Street({ target }: AddressInputProps) {
  const form = useFormContext();
  return (
    <form.Field
      name={`${target}.street` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: street as any,
      }}
      children={(field) => (
        <Input
          name={field.name}
          label="Street"
          value={field.state.value ?? ""}
          onChange={(e) => field.handleChange(e.target.value as any)}
          error={field.state.meta.errors.length > 0}
          errors={field.state.meta.errors as { message: string }[]}
        />
      )}
    />
  );
}

export default memo(Street);
