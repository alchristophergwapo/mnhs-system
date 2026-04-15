import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import DualCitizenship from "./DualCitizenship";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

/**
 * Component for inputting the teacher's citizenship
 * @param {Object} props - The props for the component
 * @param {Object} props.value - The current value of the citizenship
 * @param {boolean} props.value.filipino - Is the teacher a Filipino?
 * @param {boolean} props.value.dualCitizenship - Does the teacher hold dual citizenship?
 * @param {"By birth" | "By naturalization"} props.value.dualCitizenshipBy - How did the teacher acquire dual citizenship?
 * @param {string} props.value.countryOfDualCitizenship - The country of the teacher's dual citizenship
 * @param {(t: string | any, v: string | any) => void} props.onValueChange - The function to call when the value of the citizenship changes
 * @example
 * const citizenship = {
 *   filipino: true,
 *   dualCitizenship: false,
 *   dualCitizenshipBy: "By birth",
 *   countryOfDualCitizenship: "United States",
 * };
 * <Citizenship value={citizenship} onValueChange={handleValueChange} />
 */
export default function Citizenship(props: {
  value: {
    filipino: boolean;
    dualCitizenship?: boolean;
    dualCitizenshipBy?: "By birth" | "By naturalization";
    countryOfDualCitizenship?: string;
  };
  onValueChange: (t: string | any, v: string | any) => void;
}) {
  const { value, onValueChange } = props;
  const [citizenship, setCitizenship] = useState(value);

  // Debounce and memoize the input change event
  const handleChangeCitizenshipDetails = useMemo(
    () =>
      debounce(
        (target: string, val: boolean) =>
          onValueChange("citizenship", {
            ...citizenship,
            [target]: val,
          }),
        500,
      ),
    [onValueChange],
  );

  // Handle change event for the citizenship inputs.
  // To avoid unnecessary re-renders of the component we use a useCallback
  const handleChangeCitizenship = useCallback(
    (target: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCitizenship({ ...citizenship, [target]: event.target.checked });
      handleChangeCitizenshipDetails(target, event.target.checked);
    },
    [onValueChange],
  );

  // Cleanup the debounce function on unmount
  useEffect(() => {
    return () => {
      handleChangeCitizenshipDetails.cancel();
    };
  }, [handleChangeCitizenshipDetails]);

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">
        <div>Citizenship</div>
        <Typography variant="caption">
          If holder of dual citizenship, please indicate the details
        </Typography>
      </FormLabel>
      <FormGroup row>
        <FormControlLabel
          label="Filipino"
          control={
            <Checkbox
              checked={citizenship?.filipino}
              onChange={handleChangeCitizenship("filipino")}
            />
          }
        />
        <FormControlLabel
          label="Dual Citizenship"
          control={
            <Checkbox
              checked={citizenship?.dualCitizenship}
              onChange={handleChangeCitizenship("dualCitizenship")}
            />
          }
        />
      </FormGroup>
      {citizenship?.dualCitizenship && (
        <DualCitizenship
          value={citizenship}
          handleChangeCitizenshipBy={handleChangeCitizenship}
          onValueChange={(t, v) =>
            onValueChange("citizenship", { ...citizenship, [t]: v })
          }
        />
      )}
    </FormControl>
  );
}
