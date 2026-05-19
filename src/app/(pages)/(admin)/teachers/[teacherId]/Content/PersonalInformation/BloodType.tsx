import Select from "@components/ui/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "@hooks/useTanstack";
import z from "zod";
import { ReactNode } from "react";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * A React component that renders a dropdown selection menu for blood types.
 * Integrates with `react-hook-form` (or a similar form context) to manage
 * form state and asynchronously validates the selected blood type against
 * a predefined list using Zod.
 *
 * @returns {JSX.Element} The rendered blood type selection field.
 */
export default function BloodType() {
  const form = useFormContext();
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""];

  return (
    <form.Field
      name={"bloodType" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z
          .enum(bloodTypes)
          .nullish() as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Select
          value={field.state.value || ""}
          name={field.name}
          onChange={(e) =>
            field.handleChange(
              e.target.value as unknown as UpdaterFn<never, never>,
            )
          }
          errors={field.state.meta.errors as { message: string }[]}
          label="Blood Type"
          displayEmpty
          renderValue={(value: string | unknown) => {
            if (value !== "") {
              return value as ReactNode;
            }
            return <em>Select blood type</em>;
          }}
        >
          <MenuItem value={""}>
            <em>No idea</em>
          </MenuItem>
          {bloodTypes.map((bloodType, index) => (
            <MenuItem value={bloodType} key={index}>
              {bloodType}
            </MenuItem>
          ))}
        </Select>
      )}
    </form.Field>
  );
}
