import { useFormContext } from "@hooks/useTanstack";
import { memo } from "react";
import { subdivision } from "../../validations/addressValidators";
import Input from "@components/ui/Input";
import { AddressInputProps } from "../../types/student.types";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * Renders a subdivision or village input field integrated with a form context.
 * This component handles asynchronous validation with a debounce and binds the
 * input value to a nested `subdivision` property within the target form state.
 *
 * @param {AddressInputProps} props - The component props.
 * @param {string} props.target - The base target path in the form state where the subdivision data is nested.
 * @returns {JSX.Element} The rendered subdivision input field.
 */
function Subdivision({ target }: AddressInputProps) {
  const form = useFormContext();
  return (
    <form.Field
      name={`${target}.subdivision` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: subdivision as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Input
          name={field.name}
          label="Subdivision/Village"
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

export default memo(Subdivision);
