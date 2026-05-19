import Input from "@components/ui/Input";
import { FamilyInputProps } from "@features/admin/student/types/student.types";
import { useFormContext } from "@hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import z from "zod";

/**
 * A React component that renders an input field for a family member's or guardian's contact number.
 * It integrates with `useFormContext` to manage form state and applies asynchronous Zod validation
 * to ensure the contact number follows Philippine mobile number formats (e.g., +639XXXXXXXXX or 09XXXXXXXXX).
 *
 * @param {FamilyInputProps} props - The props for the component.
 * @param {string} props.target - The target path in the form state where the contact number is stored.
 * @param {boolean} props.required - Determines if the contact number field is mandatory.
 * @returns {JSX.Element} The rendered contact number input field.
 */
function FamilyContactNumber({ target, required }: FamilyInputProps) {
  const form = useFormContext();

  return (
    <form.Field
      name={`${target}.contactNumber` as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: (required
          ? z
              .string()
              .nonempty("Contact number is required")
              .regex(/^(\+639|09)\d{9}$/, "Invalid contact number format")
              .min(11, "Contact number cannot be lesser than 11 characters")
              .max(13, "Contact number cannot be greater than 13 characters")
              .refine(
                (value) => (/^(\+639|09)\d{9}$/.test(value) ? true : false),
                "Invalid contact number format",
              )
          : z
              .string()
              .regex(/^(\+639|09)\d{9}$/, "Invalid contact number format")
              .min(11, "Contact number cannot be lesser than 11 characters")
              .max(13, "Contact number cannot be greater than 13 characters")
              .refine(
                (value) => (/^(\+639|09)\d{9}$/.test(value) ? true : false),
                "Invalid contact number format",
              )
              .nullish()) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Input
          name={field.name}
          label="Guardian Contact Number"
          value={field.state.value || ""}
          onChange={(e) =>
            field.handleChange(
              e.target.value as unknown as UpdaterFn<never, never>,
            )
          }
          errors={field.state.meta.errors as { message: string }[]}
          error={field.state.meta.errors.length > 0}
          required={required}
          helperText="If not applicable, use the student's contact number"
        />
      )}
    </form.Field>
  );
}

export default FamilyContactNumber;
