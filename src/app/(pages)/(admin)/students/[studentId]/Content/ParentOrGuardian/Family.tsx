import Input from "@components/Input";
import { useFormContext } from "@/src/hooks/useTanstack";
import { FieldAsyncValidateOrFn } from "@tanstack/react-form";
import z from "zod";

function Family({
  nameExtension,
  maidenName,
  title,
  subtitle,
  target,
  required = true,
}: {
  target: string; // "father" | "mother" | "guardian";
  nameExtension?: boolean;
  maidenName?: boolean;
  title: string;
  subtitle?: string;
  required?: boolean;
}) {
  const form = useFormContext();

  return (
    <>
      <div className="text-[16px] font-bold uppercase">{title}</div>
      {subtitle && <div className="text-[12px] text-gray-500">{subtitle}</div>}
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-4">
        {maidenName && (
          <form.Field
            name={`${target}.maidenName` as never}
            validators={{
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: z
                .string()
                .max(50, "Maiden name cannot be greater than 50 characters")
                .regex(/^[a-zA-Z -/]+$/, "Only letters are allowed")
                .or(z.literal(""))
                .nullish() as any,
            }}
            children={(field) => {
              const errors = field.state.meta.errors || [];
              return (
                <Input
                  name={field.name}
                  value={field.state.value || ""}
                  label="Maiden Name"
                  onChange={(e) => field.handleChange(e.target.value as any)}
                  errors={errors as any}
                  error={errors.length > 0}
                />
              );
            }}
          />
        )}
        <form.Field
          name={`${target}.lastName` as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: required
              ? (z
                  .string()
                  .nonempty("Last name is required")
                  .max(50, "Last name cannot be greater than 50 characters")
                  .min(2, "Last name cannot be lesser than 2 characters")
                  .regex(/^[a-zA-Z -/]+$/, "Only letters are allowed") as any)
              : (z
                  .string()
                  .max(50, "Last name cannot be greater than 50 characters")
                  .regex(/^[a-zA-Z -]+$/, "Only letters are allowed")
                  .nullish() as any),
          }}
          children={(field) => {
            const errors = field.state.meta.errors || [];
            return (
              <Input
                name={field.name}
                value={field.state.value}
                label="Last Name"
                onChange={(e) => field.handleChange(e.target.value as any)}
                errors={errors as any}
                error={errors.length > 0}
                required={required}
              />
            );
          }}
        />
        <form.Field
          name={`${target}.firstName` as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: required
              ? (z
                  .string()
                  .nonempty("First name is required")
                  .max(50, "First name cannot be greater than 50 characters")
                  .min(2, "First name cannot be lesser than 2 characters")
                  .regex(/^[a-zA-Z ./]+$/, "Only letters are allowed") as any)
              : (z
                  .string()
                  .max(50, "First name cannot be greater than 50 characters")
                  .regex(/^[a-zA-Z ]+$/, "Only letters are allowed")
                  .nullish() as any),
          }}
          children={(field) => {
            const errors = field.state.meta.errors;
            return (
              <Input
                name={field.name}
                value={field.state.value || ""}
                label="First Name"
                onChange={(e) => field.handleChange(e.target.value as any)}
                required={required}
                error={errors?.length > 0}
                errors={errors as any}
              />
            );
          }}
        />
        <form.Field
          name={`${target}.middleName` as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z
              .string()
              .max(50, "Middle name cannot be greater than 50 characters")
              .regex(/^[- a-zA-Z /]*$/, "Only letters are allowed")
              .nullish() as any,
          }}
          children={(field) => {
            const errors = field.state.meta.errors;
            return (
              <Input
                name={field.name}
                value={field.state.value || ""}
                label="Middle Name"
                onChange={(e) => field.handleChange(e.target.value as any)}
                error={errors?.length > 0}
                errors={errors as any}
              />
            );
          }}
        />
        {nameExtension && (
          <form.Field
            name={`${target}.nameExtension` as never}
            validators={{
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: z
                .string()
                .max(3, "Name extension cannot be greater than 3 characters")
                .regex(/^[. a-zA-Z ]*$/, "Only letters are allowed")
                .nullish() as any,
            }}
            children={(field) => {
              const errors = field.state.meta.errors;
              return (
                <Input
                  name={field.name}
                  value={field.state.value || ""}
                  label="Name extension (Jr., Sr., III, etc.)"
                  onChange={(e) => field.handleChange(e.target.value as any)}
                  error={errors?.length > 0}
                  errors={errors as any}
                />
              );
            }}
          />
        )}

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
                  .max(
                    13,
                    "Contact number cannot be greater than 13 characters",
                  )
                  .refine(
                    (value) => (/^(\+639|09)\d{9}$/.test(value) ? true : false),
                    "Invalid contact number format",
                  )
              : z
                  .string()
                  .regex(/^(\+639|09)\d{9}$/, "Invalid contact number format")
                  .min(11, "Contact number cannot be lesser than 11 characters")
                  .max(
                    13,
                    "Contact number cannot be greater than 13 characters",
                  )
                  .refine(
                    (value) => (/^(\+639|09)\d{9}$/.test(value) ? true : false),
                    "Invalid contact number format",
                  )
                  .nullish()) as FieldAsyncValidateOrFn<
              Record<string, never>,
              never,
              never
            >,
          }}
          children={(field) => (
            <Input
              name={field.name}
              label="Guardian Contact Number"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value as any)}
              errors={field.state.meta.errors as any}
              error={field.state.meta.errors.length > 0}
              required={required}
              helperText="If not applicable, use the student's contact number"
            />
          )}
        />
      </div>
    </>
  );
}

export default Family;
