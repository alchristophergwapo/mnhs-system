import { useFormContext } from "@hooks/useTanstack";
import { houseNumber } from "../../validations/addressValidators";
import Input from "@components/ui/Input";
import { memo } from "react";
import { AddressInputProps } from "../../types/student.types";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * A React component that renders an input field for a house number, block, or lot number.
 * It integrates with a form context to handle state, validation, and error display.
 * The field performs asynchronous validation with a 300ms debounce on change events.
 *
 * @param {AddressInputProps} props - The component props.
 * @param {string} props.target - The target path prefix used to resolve the field name within the form context.
 * @returns {JSX.Element} The rendered house number input field.
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
    >
      {(field) => (
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
