import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { city, cityRequired } from "./addressValidators";
import Input from "@components/ui/Input";
import { AddressInputProps } from ".";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * Renders a city/municipality input field integrated with a form context.
 * Handles asynchronous validation with a debounce, applying a required or
 * optional validation rule based on the `required` prop.
 *
 * @param {AddressInputProps} props - The component props.
 * @param {string} props.target - The target path prefix for the form field name.
 * @param {boolean} props.required - Determines if the city field is mandatory,
 *                                   which switches between `cityRequired` and `city` validators.
 * @returns {JSX.Element} The rendered city input field.
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
