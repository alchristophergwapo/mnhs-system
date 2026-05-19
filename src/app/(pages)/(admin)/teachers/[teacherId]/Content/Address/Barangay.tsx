import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { barangay, barangayRequired } from "./addressValidators";
import Input from "@components/ui/Input";
import { AddressInputProps } from ".";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * Renders a Barangay input field integrated with a form context.
 * Handles asynchronous validation for the barangay field, applying
 * required or optional validation rules based on the `required` prop.
 *
 * @param {AddressInputProps} props - The component props.
 * @param {string} props.target - The target path prefix for the field name in the form state.
 * @param {boolean} props.required - Determines whether the Barangay field is required,
 *                                   which dictates the validation rule applied.
 * @returns {JSX.Element} The rendered Barangay form field component.
 */
function Barangay({ target, required }: AddressInputProps) {
  const form = useFormContext();
  return (
    <form.Field
      name={`${target}.barangay` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: (required
          ? barangayRequired
          : barangay) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Input
          name={field.name}
          label="Barangay"
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

export default memo(Barangay);
