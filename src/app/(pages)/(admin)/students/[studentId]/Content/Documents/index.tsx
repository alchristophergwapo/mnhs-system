import Input from "@/src/components/Input";
import { useFormContext } from "@/src/hooks/useTanstack";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";
import { ChangeEvent } from "react";
import z from "zod";
import ImagePreview from "./ImagePreview";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];
const ALLOWED_FILE_SIZE = 5000000;

function Documents() {
  const form = useFormContext();

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <form.Field
        name={"enrollment.cardImage" as never}
        validators={{
          onChangeAsyncDebounceMs: 300,
          onChangeAsync: z
            .instanceof(File)
            .nonoptional("Card image is required")
            .refine(
              (file) => file.size <= ALLOWED_FILE_SIZE,
              "File size must be less than 5MB",
            )
            .refine(
              (file) => ALLOWED_FILE_TYPES.includes(file.type),
              "File must be an image",
            ) as FieldAsyncValidateOrFn<Record<string, never>, never, never>,
        }}
        children={(field) => {
          return (
            <div className="flex flex-col gap-4">
              <Input
                name={field.name}
                label="Card image"
                type="file"
                slotProps={{
                  htmlInput: {
                    accept: "image/*",
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const cardImg: unknown = e.target.files?.[0];
                  if (cardImg) {
                    field.handleChange(cardImg as UpdaterFn<never, never>);
                  }
                }}
                required
                error={field.state.meta.errors.length > 0}
                errors={field.state.meta.errors as { message: string }[]}
              />
              {field.state.value && <ImagePreview file={field.state.value} />}
            </div>
          );
        }}
      />
    </div>
  );
}

export default Documents;
