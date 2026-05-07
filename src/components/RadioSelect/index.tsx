import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import FormHelperText from "@mui/material/FormHelperText";
import { memo } from "react";

type RadioSelectProps = Partial<RadioGroupProps> & {
  label: string;
  required?: boolean;
  error?: boolean;
  errors?: { message: string; [key: string]: string }[];
};

/**
 * A component that renders a radio group with a label and children.
 * It accepts a label, a boolean indicating whether the radio group should be rendered in a row, a default value, a value, and an onChange function.
 * The children should be Radio components.
 * @param {RadioSelectProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 */
function RadioSelect({
  label,
  row = true,
  defaultValue,
  value,
  required = false,
  children,
  error,
  errors,
  onChange,
}: RadioSelectProps) {
  return (
    <FormGroup>
      <FormControl required={required} error={error}>
        <FormLabel id="radio-buttons-group-label" required={required}>
          {label}
        </FormLabel>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          defaultValue={defaultValue}
          name="radio-buttons-group"
          row={row}
          onChange={onChange}
          value={value}
        >
          {children}
        </RadioGroup>

        {errors && errors?.length > 0
          ? errors.map((error, index) => (
              <FormHelperText key={index} error={errors && errors?.length > 0} sx={{mb: 1}}>
                {error.message}
              </FormHelperText>
            ))
          : null}
      </FormControl>
    </FormGroup>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(RadioSelect) as typeof RadioSelect;
