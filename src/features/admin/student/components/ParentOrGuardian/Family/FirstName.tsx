import Input from "@components/ui/Input";
import { FamilyInputProps } from "@features/admin/student/types/student.types";
import { useFormContext } from "@hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import z from "zod";

/**
 * Renders a First Name input field integrated with a form context.
 * Handles both optional and required validation logic asynchronously using Zod.
 *
 * @param {FamilyInputProps} props - The component props.
 * @param {string} props.target - The target path prefix in the form state to bind the field (e.g., 'parent' or 'child').
 * @param {boolean} props.required - Determines if the field is mandatory. Affects validation rules.
 * @returns {JSX.Element} A form field component containing the First Name input.
 */
function FirstName({ target, required }: FamilyInputProps) {
  const form = useFormContext();

  return (
    <form.Field
      name={`${target}.firstName` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: (required
          ? z
              .string()
              .nonempty("First name is required")
              .max(50, "First name cannot be greater than 50 characters")
              .min(2, "First name cannot be lesser than 2 characters")
              .regex(/^[a-zA-Z ./]+$/, "Only letters are allowed")
          : z
              .string()
              .max(50, "First name cannot be greater than 50 characters")
              .regex(/^[a-zA-Z ]+$/, "Only letters are allowed")
              .nullish()) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => {
        const errors = field.state.meta.errors;
        return (
          <Input
            name={field.name}
            value={field.state.value || ""}
            label="First Name"
            onChange={(e) =>
              field.handleChange(
                e.target.value as unknown as UpdaterFn<never, never>,
              )
            }
            required={required}
            error={errors?.length > 0}
            errors={errors as { message: string }[]}
          />
        );
      }}
    </form.Field>
  );
}

export default FirstName;
