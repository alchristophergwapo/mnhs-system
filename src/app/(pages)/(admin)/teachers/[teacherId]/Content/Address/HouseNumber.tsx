import { useFormContext } from "@/src/hooks/useTanstack";
import { houseNumber } from "./addressValidators";
import Input from "@components/ui/Input";
import { memo } from "react";
import { AddressInputProps } from ".";

function HouseNumber({ target }: AddressInputProps) {
  const form = useFormContext();

  return (
    <form.Field
      name={`${target}.houseNumber` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: houseNumber as any,
      }}
      children={(field) => (
        <Input
          name={field.name}
          label="House/Block/Lot No."
          value={field.state.value ?? ""}
          onChange={(e) => field.handleChange(e.target.value as any)}
          error={field.state.meta.errors.length > 0}
          errors={field.state.meta.errors as { message: string }[]}
        />
      )}
    />
  );
}

export default memo(HouseNumber);
