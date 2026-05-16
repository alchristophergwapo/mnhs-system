import { useFormContext } from "@/src/hooks/useTanstack";
import { memo } from "react";
import { barangay, barangayRequired } from "./addressValidators";
import Input from "@components/ui/Input";
import { AddressInputProps } from ".";

function Barangay({ target, required }: AddressInputProps) {
  const form = useFormContext();
  return (
    <form.Field
      name={`${target}.barangay` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: (required ? barangayRequired : barangay) as any,
      }}
      children={(field) => (
        <Input
          name={field.name}
          label="Barangay"
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

export default memo(Barangay);
