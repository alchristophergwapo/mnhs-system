import Input from "@components/ui/Input";
import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { street } from "./addressValidators";
import { AddressInputProps } from ".";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * A React component that renders a street address input field integrated with a form context.
 * It handles asynchronous validation with a debounce and binds the input state to the form's state.
 *
 * @param {AddressInputProps} props - The props for the component.
 * @param {string} props.target - The target path prefix in the form state where the street data is stored.
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
