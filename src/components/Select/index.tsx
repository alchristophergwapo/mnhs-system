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
