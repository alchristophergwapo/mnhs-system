import Input from "@components/ui/Input";
import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { zipCode, zipCodeRequired } from "./addressValidators";
import { AddressInputProps } from ".";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * A React component for rendering a Zip Code input field integrated with a form context.
 * Handles asynchronous validation with a debounce and supports optional required field enforcement.
 *
 * @param {AddressInputProps} props - The props for the ZipCode component.
 * @param {string} props.target - The target path in the form state where the address object is stored.
 * @param {boolean} props.required - Determines whether the zip code field is required,
 *                                   which dictates the validation logic applied.
 * @returns {JSX.Element} The rendered Zip Code form field.
 */
function ZipCode({ target, required }: AddressInputProps) {
  const form = useFormContext();
  return (
    <form.Field
      name={`${target}.zipCode` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: (required
          ? zipCodeRequired
          : zipCode) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Input
          name={field.name}
          label="Zip Code"
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

export default memo(ZipCode);
