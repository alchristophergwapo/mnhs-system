import { InputProps } from "../../../../_types";
import RadioSelect from "@/src/components/RadioSelect";
import { RadioGroupProps } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

/**
 * A component that renders a radio group with a label and children.
 * It accepts a label, a default value, a value, and an onChange function.
 * The children should be Radio components.
 * @param {InputProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 * @example
 * const target = "gender";
 * const value = "Male";
 * const handleValueChange = (target: string, value: string) => console.log(`${target}: ${value}`);
 * <Gender target={target} value={value} onValueChange={handleValueChange} />
 */
export default function Gender(props: InputProps) {
  const { value, onValueChange } = props;
  const [gender, setGender] = useState(value);

  // Debounce and memoize the input change event
  const handleGenderChange = useMemo(
    () => debounce((nv: string) => onValueChange("gender", nv), 500),
    [onValueChange],
  );

  // Handle change event for the gender input
  const handleValueChange: RadioGroupProps["onChange"] = useCallback(
    (ev) => {
      const newValue = ev.target.value;
      setGender(newValue);
      handleGenderChange(newValue);
    },
    [onValueChange],
  );

  // Cleanup the debounce function on unmount
  useEffect(() => {
    return () => handleGenderChange.cancel();
  }, [handleGenderChange]);

  return (
    <RadioSelect
      label="Gender at birth"
      onChange={handleValueChange}
      value={gender}
    >
      <FormControlLabel value="Male" control={<Radio />} label="Male" />
      <FormControlLabel value="Female" control={<Radio />} label="Female" />
    </RadioSelect>
  );
}
