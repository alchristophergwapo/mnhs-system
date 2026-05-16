import { useFormContext } from "@/src/hooks/useTanstack";
import { memo } from "react";
import { subdivision } from "./addressValidators";
import Input from "@components/ui/Input";
import { AddressInputProps } from ".";

function Subdivision({target}: AddressInputProps) {
  const form = useFormContext();
  return (
    <form.Field
      name={`${target}.subdivision` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: subdivision as any,
      }}
      children={(field) => (
        <Input
          name={field.name}
          label="Subdivision/Village"
          value={field.state.value ?? ""}
          onChange={(e) => field.handleChange(e.target.value as any)}
          error={field.state.meta.errors.length > 0}
          errors={field.state.meta.errors as { message: string }[]}
        />
      )}
    />
  );
}

export default memo(Subdivision);
