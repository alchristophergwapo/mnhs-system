import TextField, { TextFieldProps } from "@mui/material/TextField";
import { memo } from "react";

type CustomInputProps = TextFieldProps & {};

/**
 * A custom input component that wraps the Material-UI TextField component.
 * It takes the value and onChange props, and passes them to the TextField component.
 * It also passes any other props to the TextField component.
 * @param {CustomInputProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 */
function Input({ value, onChange, ...otherProps }: CustomInputProps) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      size="small"
      {...otherProps}
    />
  );
}

export default memo(Input);
