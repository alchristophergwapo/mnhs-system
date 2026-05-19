import Input from "@components/ui/Input";
import { FamilyInputProps } from "@features/admin/student/types/student.types";
import { useFormContext } from "@hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import z from "zod";

/**
 * A React component that renders an input field for a last name with validation.
 * It integrates with a form context to handle state and applies Zod validation rules
 * based on whether the field is required.
 * 
 * @param {FamilyInputProps} props - The props for the component.
 * @param {string} props.target - The target path prefix in the form state where the last name is stored.
 * @param {boolean} props.required - Determines if the last name field is mandatory.
 * @returns {JSX.Element} The rendered last name input field with validation and error handling.
 */
function LastName({ target, required }: FamilyInputProps) {
  const form = useFormContext();

  return (
    <form.Field
      name={`${target}.lastName` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: (required
          ? z
              .string()
              .nonempty("Last name is required")
              .max(50, "Last name cannot be greater than 50 characters")
              .min(2, "Last name cannot be lesser than 2 characters")
              .regex(/^[a-zA-Z -/]+$/, "Only letters are allowed")
          : z
              .string()
              .max(50, "Last name cannot be greater than 50 characters")
              .regex(/^[a-zA-Z -]+$/, "Only letters are allowed")
              .nullish()) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => {
        const errors = field.state.meta.errors || [];
        return (
          <Input
            name={field.name}
            value={field.state.value}
            label="Last Name"
            onChange={(e) =>
              field.handleChange(
                e.target.value as unknown as UpdaterFn<never, never>,
              )
            }
            errors={errors as { message: string }[]}
            error={errors.length > 0}
            required={required}
          />
        );
      }}
    </form.Field>
  );
}

export default LastName;
