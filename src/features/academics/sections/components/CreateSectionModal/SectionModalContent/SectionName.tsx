import Input from "@components/ui/Input";
import { useFormContext } from "@hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import z from "zod";

/**
 * Renders a form input field for a section name with asynchronous validation.
 * This component integrates with `useFormContext` to manage form state and 
 * applies Zod validation rules to ensure the input is non-empty and does not 
 * exceed 20 characters. It includes a 300ms debounce on change validation.
 *
 * @returns {JSX.Element} The rendered section name input field.
 */
function SectionName() {
  const form = useFormContext();

  return (
    <form.Field
      name={"name" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z
          .string()
          .nonempty("Section name is required")
          .max(
            20,
            "Section name must be no more than 20 characters",
          ) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Input
          label="Section Name"
          placeholder="e.g., Jasmine, Rose"
          name={field.name}
          required
          value={field.state.value || ""}
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

export default SectionName;
