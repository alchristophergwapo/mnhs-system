import RadioSelect from "@components/RadioSelect";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useFormContext } from "@hooks/useTanstack";
import z from "zod";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import LastGradeLevel from "./LastGradeLevel";
import Input from "@components/ui/Input";
import { StudentEntryType } from "@/prisma/generated/prisma";

function EntryType({ required }: { required: boolean }) {
  const form = useFormContext();

  return (
    <form.Field
      name={"enrollmentBackground.entryType" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: (required
          ? z.string().nonoptional("Entry type is required")
          : z.string().nullish()) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
      children={(parentField) => {
        const isTransferee =
          parentField.state.value === StudentEntryType.TRANSFER;
        return (
          <>
            <RadioSelect
              label="You are enrolling as?"
              onChange={(e) => parentField.handleChange(e.target.value as any)}
              value={parentField.state.value || ""}
              required={required}
              name={parentField.name}
              errors={
                (parentField.state.meta.errors || []) as { message: string }[]
              }
              error={parentField.state.meta.errors.length > 0}
            >
              <FormControlLabel
                value={StudentEntryType.BALIK_ARAL}
                control={<Radio />}
                label="Balik-Aral"
              />
              <FormControlLabel
                value={StudentEntryType.TRANSFER}
                control={<Radio />}
                label="Transferee"
              />
            </RadioSelect>
            <div className="grid grid-cols-4 gap-4">
              <LastGradeLevel
                required={parentField.state.value}
                show={isTransferee}
              />

              <form.Field
                name={"enrollmentBackground.lastSchoolYear" as never}
                validators={{
                  onChangeAsyncDebounceMs: 300,
                  onChangeAsync: (isTransferee
                    ? z.coerce
                        .number("Last school must be a valid year")
                        .nonnegative("Only possitive numbers are allowed")
                        .max(
                          new Date().getFullYear() - 2,
                          "Last school year cannot be equal to present or future or last year",
                        )
                    : z.coerce
                        .number()
                        .max(
                          new Date().getFullYear() - 2,
                          "Last school year cannot be equal to present or future or last year",
                        )
                        .nullish()) as unknown as FieldAsyncValidateOrFn<
                    Record<string, never>,
                    never,
                    never
                  >,
                }}
                children={(field) => (
                  <Input
                    name={field.name}
                    value={field.state.value || ""}
                    onChange={(e) => {
                      const value: unknown = e.target.value;
                      field.handleChange(value as UpdaterFn<never, never>);
                    }}
                    label="Last School Year"
                    required={isTransferee}
                    errors={
                      (field.state.meta.errors || []) as {
                        message: string;
                      }[]
                    }
                    error={field.state.meta.errors.length > 0}
                  />
                )}
              />
              {isTransferee && (
                <>
                  <form.Field
                    name={"enrollmentBackground.lastSchoolID" as never}
                    validators={{
                      onChangeAsyncDebounceMs: 300,
                      onChangeAsync: z
                        .string()
                        .min(6, "School ID is a 6 digit code")
                        .max(6, "School ID is a 6 digit code")
                        .regex(
                          /^[0-9]+$/,
                          "School ID should only contain numbers",
                        )
                        .nullish() as unknown as FieldAsyncValidateOrFn<
                        Record<string, never>,
                        never,
                        never
                      >,
                    }}
                    children={(field) => (
                      <Input
                        name={field.name}
                        value={field.state.value || ""}
                        onChange={(e) =>
                          field.handleChange(e.target.value as any)
                        }
                        label="Last School ID"
                        error={field.state.meta.errors.length > 0}
                        errors={
                          field.state.meta.errors as { message: string }[]
                        }
                      />
                    )}
                  />
                  <div className="col-span-2">
                    <form.Field
                      name={"enrollmentBackground.lastSchoolName" as never}
                      validators={{
                        onChangeAsyncDebounceMs: 300,
                        onChangeAsync: (isTransferee
                          ? z
                              .string()
                              .nonempty("School name is required")
                              .min(
                                2,
                                "School name should be at least 2 characters",
                              )
                              .max(
                                50,
                                "School name should be at most 50 characters",
                              )
                          : z
                              .string()
                              .max(
                                50,
                                "School name should be at most 50 characters",
                              )
                              .nullish()) as unknown as FieldAsyncValidateOrFn<
                          Record<string, never>,
                          never,
                          never
                        >,
                      }}
                      children={(field) => (
                        <Input
                          name={field.name}
                          value={field.state.value || ""}
                          onChange={(e) => {
                            const value: unknown = e.target.value;
                            field.handleChange(
                              value as UpdaterFn<never, never>,
                            );
                          }}
                          label="Last school name"
                          required={isTransferee}
                          error={field.state.meta.errors.length > 0}
                          errors={
                            field.state.meta.errors as { message: string }[]
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="col-span-2">
                    <form.Field
                      name={"enrollmentBackground.lastSchoolAddress" as never}
                      validators={{
                        onChangeAsyncDebounceMs: 300,
                        onChangeAsync: (isTransferee
                          ? z
                              .string()
                              .nonempty("School address is required")
                              .min(
                                2,
                                "School address should be at least 2 characters",
                              )
                              .max(
                                50,
                                "School address should be at most 50 characters",
                              )
                          : z
                              .string()
                              .max(
                                50,
                                "School address should be at most 50 characters",
                              )
                              .nullish()) as unknown as FieldAsyncValidateOrFn<
                          Record<string, never>,
                          never,
                          never
                        >,
                      }}
                      children={(field) => (
                        <Input
                          name={field.name}
                          value={field.state.value || ""}
                          onChange={(e) => {
                            const value: unknown = e.target.value;
                            field.handleChange(
                              value as UpdaterFn<never, never>,
                            );
                          }}
                          label="Last school address"
                          required={isTransferee}
                          error={field.state.meta.errors.length > 0}
                          errors={
                            field.state.meta.errors as { message: string }[]
                          }
                        />
                      )}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        );
      }}
    />
  );
}

export default EntryType;
