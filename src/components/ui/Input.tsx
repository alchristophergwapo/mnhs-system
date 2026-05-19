import TextField, { TextFieldProps } from "@mui/material/TextField";
import { memo } from "react";

/**
 * A custom input component that wraps the Material-UI TextField component.
 * It takes the value and onChange props, and passes them to the TextField component.
 * It also passes any other props to the TextField component.
 * @param {CustomInputProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 */
function Input({
  value,
  type = "text",
  errors,
  slotProps = {},
  ...otherProps
}: TextFieldProps & { errors?: { message: string }[] }) {

  return (
    <div className="flex flex-col">
      <TextField
        value={value}
        variant="outlined"
        fullWidth
        size="small"
        slotProps={{
          ...slotProps,
          inputLabel: {
            shrink: type === "date" ? true : false,
            sx: {
              "& .MuiInputLabel-asterisk": {
                color: "red",
                fontSize: "16px!important",
              },
            },
          },
        }}
        type={type}
        {...otherProps}
      />
      {errors?.map((error, index) => (
        <p key={index} className="text-red-500 text-xs mt-1">
          •{error?.message}
        </p>
      ))}
    </div>
  );
}

export default memo(Input);
