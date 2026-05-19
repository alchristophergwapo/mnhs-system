import Input from "@components/ui/Input";
import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { street } from "../../validations/addressValidators";
import { AddressInputProps } from "../../types/student.types";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * Renders a street address input field integrated with a form context.
 * Handles asynchronous validation with a debounce and binds the input
 * value and error states to the form's state.
 *
 * @param {AddressInputProps} props - The component props.
 * @param {string} props.target - The target path prefix used to resolve the field name within the form context.
 * @returns {JSX.Element} The rendered street input field.
 */
function Street({ target }: AddressInputProps) {
  const form = useFormContext();
  return (
    <form.Field
      name={`${target}.street` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: street as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Input
          name={field.name}
          label="Street"
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

export default memo(Street);
