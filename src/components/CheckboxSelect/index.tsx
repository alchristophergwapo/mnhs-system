import { memo } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";

function CheckboxSelect({
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

export default memo(CheckboxSelect);
