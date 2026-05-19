import Input from "@components/ui/Input";
import { FamilyInputProps } from "@features/admin/student/types/student.types";
import { useFormContext } from "@hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import z from "zod";

/**
 * A React component that renders an input field for a middle name within a form.
 * It integrates with `react-hook-form` (or similar form context) to handle state,
 * validation, and error messaging asynchronously.
 *
 * @param {FamilyInputProps} props - The component props.
 * @param {object} props.target - The target object/path prefix used to namespace the form field name.
 * @returns {JSX.Element} The rendered middle name input field with asynchronous validation.
 */
function MiddleName({ target }: FamilyInputProps) {
  const form = useFormContext();

  return (
    <form.Field
      name={`${target}.middleName` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z
          .string()
          .max(50, "Middle name cannot be greater than 50 characters")
          .regex(/^[- a-zA-Z /]*$/, "Only letters are allowed")
          .nullish() as unknown as FieldAsyncValidateOrFn<
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
            label="Middle Name"
            onChange={(e) =>
              field.handleChange(
                e.target.value as unknown as UpdaterFn<never, never>,
              )
            }
            error={errors?.length > 0}
            errors={errors as { message: string }[]}
          />
        );
      }}
    </form.Field>
  );
}

export default MiddleName;
