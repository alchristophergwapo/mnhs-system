import RadioSelect from "@/src/components/RadioSelect";
import { RadioGroupProps } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

/**
 * A component that renders a radio group with a label and children.
 * It accepts a label, a default value, a value, and an onChange function.
 * The children should be Radio components.
 * It is used to input the teacher's gender at birth.
 * @param {RadioGroupProps} props - The props for the component
 * @returns {JSX.Element} - The JSX element for the component
 * @example
 * <Gender />
 */
export default function Gender(
  props: RadioGroupProps & { error: boolean; errors?: { message: string }[] },
) {
  const { value, onChange } = props;

  return (
    <RadioSelect
      label="Gender at birth"
      onChange={onChange}
      value={value}
      required
      name={props.name}
      errors={props.errors}
      error={props.error}
    >
      <FormControlLabel value="MALE" control={<Radio />} label="Male" />
      <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
    </RadioSelect>
  );
}
