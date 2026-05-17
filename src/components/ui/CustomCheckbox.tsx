import { memo } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";

/**
 * A customizable checkbox group component that renders a row of checkboxes.
 * 
 * @param {Object} props - The component props.
 * @param {Array<{label: string, value: string}>} props.options - An array of option objects to generate the checkboxes. Each object must have a label and a value.
 * @param {string} [props.labelPlacement="end"] - The placement of the label relative to the checkbox. Defaults to "end".
 * @returns {JSX.Element} A FormGroup component containing the rendered checkboxes.
 */
function CustomCheckbox({
  options,
  labelPlacement = "end",
}: Partial<FormControlLabelProps> & {
  options: { label: string; value: string }[];
}) {
  return (
    <FormGroup row>
      {options.map((opt, idx) => (
        <FormControlLabel
          labelPlacement={labelPlacement}
          key={`${opt.value}-${idx}`}
          value={opt.value}
          checked={false}
          onChange={() => {}}
          control={<Checkbox />}
          label={opt.label}
        />
      ))}
    </FormGroup>
  );
}

export default memo(CustomCheckbox);
