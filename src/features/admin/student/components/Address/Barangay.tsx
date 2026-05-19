import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { barangay, barangayRequired } from "../../validations/addressValidators";
import Input from "@components/ui/Input";
import { AddressInputProps } from "../../types/student.types";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * Renders a Barangay input field integrated with a form context.
 * Handles asynchronous validation for the barangay field, applying a required
 * validator or an optional validator based on the `required` prop.
 *
 * @param {AddressInputProps} props - The component props.
 * @param {string} props.target - The target path prefix in the form state for the address object.
 * @param {boolean} props.required - Determines whether the barangay field is required.
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
