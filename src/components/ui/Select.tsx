import { memo } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MuiSelect, {
  SelectChangeEvent,
  SelectProps,
} from "@mui/material/Select";

type CustomSelectProps = Partial<SelectProps> & {
  errors?: { message: string }[];
  onChange?: (event: SelectChangeEvent<string>) => void;
};

/**
 * A customizable Select component wrapping Material-UI's Select, InputLabel, and FormControl.
 * Provides built-in support for displaying validation errors and integrates seamlessly with form libraries.
 * 
 * @param {CustomSelectProps} props - The properties passed to the Select component.
 * @param {React.ReactNode} props.children - The option elements to be rendered within the select menu.
 * @param {Array<{ message: string }>} [props.errors] - An optional array of error objects to display validation messages.
 * @param {string} [props.value] - The current value of the select element.
 * @param {string} props.label - The label text displayed above the select input.
 * @param {string} props.name - The name attribute of the select element, used for form submission.
 * @param {function} props.onChange - The callback function triggered when the select value changes.
 * @param {boolean} [props.displayEmpty] - If true, the label shrinks even when no value is selected.
 * @param {Object} props.rest - Additional properties spread over the MUI Select component (e.g., `disabled`, `multiple`).
 * @returns {JSX.Element} The rendered Select component with its label and error messages.
 */
function Select(props: CustomSelectProps) {
  const { children, errors, value, label, name, onChange, ...rest } = props;

  return (
    <FormControl fullWidth>
      <InputLabel
        id="position-applying-label"
        size="small"
        required
        error={errors && errors?.length > 0}
        shrink={props.displayEmpty}
      >
        {label}
      </InputLabel>
      <MuiSelect
        labelId="position-applying-label"
        id="position-applying"
        label={label}
        value={value as string}
        onChange={onChange}
        size="small"
        name={name}
        required
        error={errors && errors?.length > 0}
        variant="outlined"
        {...rest}
      >
        {children}
      </MuiSelect>
      {errors && errors?.length > 0
        ? errors.map((error, index) => (
            <FormHelperText key={index} error={errors && errors?.length > 0}>
              {error.message}
            </FormHelperText>
          ))
        : null}
    </FormControl>
  );
}

export default memo(Select);
