import Input from "@components/ui/Input";
import { FamilyInputProps } from "@features/admin/student/types/student.types";
import { useFormContext } from "@hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import { memo } from "react";
import z from "zod";

/**
 * A React component that renders an input field for a user's maiden name,
 * integrated with a form context. It includes asynchronous validation to
 * ensure the input does not exceed 50 characters and only contains allowed
 * characters (letters, spaces, hyphens, and slashes).
 *
 * @param {FamilyInputProps} props - The component props.
 * @param {object} props.target - The target object within the form state where the maiden name is stored.
 * @returns {JSX.Element} The rendered maiden name input field with validation.
 */
function MaidenName({ target }: FamilyInputProps) {
  const form = useFormContext();

  return (
    <form.Field
      name={`${target}.maidenName` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z
          .string()
          .max(50, "Maiden name cannot be greater than 50 characters")
          .regex(/^[a-zA-Z -/]+$/, "Only letters are allowed")
          .or(z.literal(""))
          .nullish() as unknown as FieldAsyncValidateOrFn<
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
            value={field.state.value || ""}
            label="Maiden Name"
            onChange={(e) =>
              field.handleChange(
                e.target.value as unknown as UpdaterFn<never, never>,
              )
            }
            errors={errors as { message: string }[]}
            error={errors.length > 0}
          />
        );
      }}
    </form.Field>
  );
}

export default memo(MaidenName);
