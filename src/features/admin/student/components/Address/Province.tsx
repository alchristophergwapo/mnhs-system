import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { province, provinceRequired } from "../../validations/addressValidators";
import Input from "@components/ui/Input";
import { AddressInputProps } from "../../types/student.types";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * A React component that renders a province input field integrated with a form context.
 * It handles asynchronous validation for the province field, supporting both required
 * and optional states, and binds the input value to the form's state.
 *
 * @param {AddressInputProps} props - The props for the Province component.
 * @param {string} props.target - The target path/prefix in the form state where the province data is stored.
 * @param {boolean} props.required - Determines whether the province field is mandatory,
 *                                   which dictates the specific validator function to be used.
 * @returns {JSX.Element} The rendered province input field.
 */
function Province({ target, required }: AddressInputProps) {
  const form = useFormContext();
  return (
    <form.Field
      name={`${target}.province` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: (required
          ? provinceRequired
          : province) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Input
          name={field.name}
          label="Province"
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

export default memo(Province);
