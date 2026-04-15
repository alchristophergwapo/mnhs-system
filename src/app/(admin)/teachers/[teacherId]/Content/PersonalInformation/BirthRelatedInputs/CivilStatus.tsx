import { InputProps } from "../../../../_types";
import RadioSelect from "@/src/components/RadioSelect";
import { RadioGroupProps } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Input from "@/src/components/Input";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

/**
 * Component for inputting the teacher's civil status
 * @param {InputProps} props - The props for the component
 * @returns {JSX.Element} - The JSX element for the component
 * @example
 * const civilStatus = "Single";
 * <CivilStatus value={civilStatus} onValueChange={handleValueChange} />
 */
export default function CivilStatus(
  props: InputProps & { civilStatusOther: string },
) {
  const { value, civilStatusOther, onValueChange } = props;
  const [civilStatus, setCivilStatus] = useState(value);
  const [civilStatusOtherValue, setCivilStatusOtherValue] =
    useState(civilStatusOther);

  /**
   * Handle change event for the civil status input
   * To avoid unnecessary re-renders of the component we use a debounce
   * @param {string} nv - The new value
   * @returns {void}
   */
  const handleCivilStatusChange = useMemo(
    () => debounce((nv: string) => onValueChange("civilStatus", nv), 500), // 500ms debounce. Can be changed if needed.
    [],
  );

  /**
   * Handle change event for the civil status input
   * For the selected value to reflect in the component we store it in a local state
   * and call the handleCivilStatusChange function at the same time.
   * handleCivilStatusChange will be the one to actually update the parent state
   * @param {RadioChangeEvent} ev - The change event
   */
  const handleValueChange: RadioGroupProps["onChange"] = useCallback((ev) => {
    const newValue = ev.target.value;
    setCivilStatus(newValue);
    handleCivilStatusChange(newValue);
  }, []);

  // Debounce and memoize the input change event
  const handleCivilStatusChangeOtherValue = useMemo(
    () => debounce((nv: string) => onValueChange("civilStatusOther", nv), 500), // 500ms debounce. Can be changed if needed.
    [],
  );

  // Handle change event for the civil status input
  const handleCivilStatusChangeOther = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const newValue = ev.target.value;
      setCivilStatusOtherValue(newValue);
      handleCivilStatusChangeOtherValue(newValue);
    },
    [],
  );

  // Cleanup the debounce function on unmount
  useEffect(() => {
    return () => {
      handleCivilStatusChange.cancel();
      handleCivilStatusChangeOtherValue.cancel();
    };
  }, [handleCivilStatusChange, handleCivilStatusChangeOtherValue]);

  return (
    <div>
      <RadioSelect
        label="Civil status"
        onChange={(ev: ChangeEvent<HTMLInputElement>, nv: string) =>
          handleValueChange(ev, nv)
        }
        value={civilStatus}
      >
        <FormControlLabel value="Single" control={<Radio />} label="Single" />
        <FormControlLabel value="Married" control={<Radio />} label="Married" />
        <FormControlLabel value="Widowed" control={<Radio />} label="Widowed" />
        <FormControlLabel
          value="Separated"
          control={<Radio />}
          label="Separated"
        />
        <div className="flex flex-row">
          <FormControlLabel
            value="Other"
            control={<Radio />}
            label="Other/s:"
          />
          <Input
            value={civilStatusOtherValue}
            onChange={handleCivilStatusChangeOther}
            id="civilStatusOther"
            name="civilStatusOther"
          />
        </div>
      </RadioSelect>
    </div>
  );
}
