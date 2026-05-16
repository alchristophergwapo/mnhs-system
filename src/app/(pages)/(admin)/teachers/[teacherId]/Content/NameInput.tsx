import React, { memo } from "react";
import { useFormContext } from "@/src/hooks/useTanstack";
import Input from "@components/ui/Input";
import z from "zod";

/**
 * A component for inputting the teacher's name.
 * It includes fields for the first name, last name, and middle name.
 * It also includes an optional field for the name extension (Jr., Sr., III, etc.).
 * @param {object} props - The props for the component.
 * @param {boolean} props.nameExtension - Whether to include the name extension field.
 * @returns {JSX.Element} - The JSX element for the component.
 */
function NameInput({ nameExtension }: { nameExtension?: boolean }) {
  const form = useFormContext();

  type FieldChildrenType = Parameters<
    React.ComponentProps<typeof form.Field>["children"]
  >[0];

  return (
    <>
      <form.Field
        name={"lastName" as never}
        validators={{
          onChangeAsyncDebounceMs: 300,
          onChangeAsync: z
            .string()
            .nonempty("Last name is required")
            .max(50, "Last name cannot be greater than 50 characters")
            .min(2, "Last name cannot be lesser than 2 characters")
            .regex(/^[a-zA-Z -]+$/, "Only letters are allowed") as any,
        }}
        children={(field: FieldChildrenType) => {
          const errors = field.state.meta.errors || [];
          return (
            <Input
              name={field.name}
              value={field.state.value}
              label="Last Name"
              onChange={(e) => field.handleChange(e.target.value as any)}
              errors={errors as any}
              error={errors.length > 0}
              required
            />
          );
        }}
      />
      <form.Field
        name={"firstName" as never}
        validators={{
          onChangeAsyncDebounceMs: 300,
          onChangeAsync: z
            .string()
            .nonempty("First name is required")
            .max(50, "First name cannot be greater than 50 characters")
            .min(2, "First name cannot be lesser than 2 characters")
            .regex(/^[a-zA-Z ]+$/, "Only letters are allowed") as any,
        }}
        children={(field: FieldChildrenType) => {
          const errors = field.state.meta.errors;
          return (
            <Input
              name={field.name}
              value={field.state.value || ""}
              label="First Name"
              onChange={(e) => field.handleChange(e.target.value as any)}
              required
              error={errors?.length > 0}
              errors={errors as any}
            />
          );
        }}
      />
      <form.Field
        name={"middleName" as never}
        validators={{
          onChangeAsyncDebounceMs: 300,
          onChangeAsync: z
            .string()
            .max(50, "Middle name cannot be greater than 50 characters")
            .regex(/^[- a-zA-Z ]*$/, "Only letters are allowed")
            .nullish() as any,
        }}
        children={(field: FieldChildrenType) => {
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
          name={"nameExtension" as never}
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: z
              .string()
              .max(3, "Name extension cannot be greater than 3 characters")
              .regex(/^[. a-zA-Z ]*$/, "Only letters are allowed")
              .nullish() as any,
          }}
          children={(field: FieldChildrenType) => {
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
    </>
  );
}

export default memo(NameInput);
