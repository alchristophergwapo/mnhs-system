import { useFormContext } from "@hooks/useTanstack";
import { houseNumber } from "./addressValidators";
import Input from "@components/ui/Input";
import { memo } from "react";
import { AddressInputProps } from ".";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * Renders an input field for a house number, block, or lot number,
 * integrating with a form context to handle state and asynchronous validation.
 *
 * @param {AddressInputProps} props - The component props.
 * @param {object} props.target - The target object path within the form state where the address resides.
 * @returns {JSX.Element} The rendered house number input field with form bindings.
 */
function HouseNumber({ target }: AddressInputProps) {
  const form = useFormContext();

  return (
    <form.Field
      name={`${target}.houseNumber` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: houseNumber as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
      >{(field) => (
        <Input
          name={field.name}
          label="House/Block/Lot No."
          value={field.state.value ?? ""}
          onChange={(e) =>
            field.handleChange(
              e.target.value as unknown as UpdaterFn<never, never>,
            )
          }
          error={field.state.meta.errors.length > 0}
          errors={field.state.meta.errors as { message: string }[]}
        />
      )}
    </form.Field>
  );
}

export default memo(HouseNumber);
