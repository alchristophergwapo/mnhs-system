import CalendarToday from "@mui/icons-material/CalendarToday";
import { DateField, DateFieldProps } from "@mui/x-date-pickers/DateField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

function DateInput({
  size,
  errors,
  error = false,
  ...rest
}: DateFieldProps & { errors?: { message: string }[] }) {
  return (
    <FormControl error={error}>
      <DateField
        size={size ?? "small"}
        endAdornment={<CalendarToday fontSize="small" />}
        error={error}
        {...rest}
      />
      {errors && errors?.length > 0
        ? errors.map((error, index) => (
            <FormHelperText
              key={index}
              error={errors && errors?.length > 0}
              sx={{ mb: 1 }}
            >
              {error.message}
            </FormHelperText>
          ))
        : null}
    </FormControl>
  );
}

export default DateInput;
