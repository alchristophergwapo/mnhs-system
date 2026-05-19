import Input from "@components/ui/Input";
import { FamilyInputProps } from "@features/admin/student/types/student.types";
import { useFormContext } from "@hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import z from "zod";

/**
 * A React component that renders an input field for a person's name extension
 * (e.g., Jr., Sr., III) within a form, integrating with `react-hook-form` (or similar)
 * context and applying asynchronous Zod validation.
 *
 * @param {FamilyInputProps} props - The component props.
 * @param {object} props.target - The target object/path prefix used to resolve the field name in the form context.
 * @returns {JSX.Element} The rendered name extension input field with validation handling.
 */
function NameExtension({ target }: FamilyInputProps) {
  const form = useFormContext();

  return (
    <form.Field
      name={`${target}.nameExtension` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z
          .string()
          .max(3, "Name extension cannot be greater than 3 characters")
          .regex(/^[. a-zA-Z ]*$/, "Only letters are allowed")
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
            label="Name extension (Jr., Sr., III, etc.)"
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

export default NameExtension;
