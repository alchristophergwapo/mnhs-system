import Select from "@components/ui/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "@hooks/useTanstack";
import z from "zod";
import { ReactNode } from "react";

export default function BloodType() {
  const form = useFormContext();
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""];

  return (
    <form.Field
      name={"bloodType" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z.enum(bloodTypes).nullish() as any,
      }}
      children={(field) => (
        <Select
          value={field.state.value || ""}
          name={field.name}
          onChange={(e) => field.handleChange(e.target.value as any)}
          errors={field.state.meta.errors}
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
    />
  );
}
