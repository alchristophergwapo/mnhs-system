import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { city, cityRequired } from "./addressValidators";
import Input from "@components/ui/Input";
import { AddressInputProps } from ".";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * A React component that renders a City/Municipality input field within a form.
 * Integrates with `useFormContext` to manage form state, validation, and error handling.
 * Supports both optional and required validation schemas based on the `required` prop.
 *
 * @param {AddressInputProps} props - The props for the City component.
 * @param {string} props.target - The target path in the form state where the city value is stored.
 * @param {boolean} props.required - Determines whether the city field is required,
 *                                   which switches the validation schema.
 * @returns {JSX.Element} The rendered City input field.
 */
function City({ target, required }: AddressInputProps) {
  const form = useFormContext();
  return (
    <form.Field
      name={`${target}.city` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: (required
          ? cityRequired
          : city) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Input
          name={field.name}
          label="City/Municipality"
          value={field.state.value ?? ""}
          onChange={(e) =>
            field.handleChange(
              e.target.value as unknown as UpdaterFn<never, never>,
            )
          }
          error={field.state.meta.errors.length > 0}
          errors={field.state.meta.errors as { message: string }[]}
          required={required}
        />
      )}
    </form.Field>
  );
}

export default memo(City);
