import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputProps } from "../../../_types";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

/**
 * Component for selecting the position a teacher is applying for.
 * @param props - The props for the component.
 */
function PositionApplying(props: InputProps) {
  const { value, onValueChange } = props;
  const [position, setPosition] = useState(value);

  // Debounce and memoize the input change event
  const handleValueChange = useMemo(
    () => debounce((nv: string) => onValueChange("position", nv), 500),
    [onValueChange],
  );

  // Handle change event for the position input
  const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const value = event.target.value; // Correctly typed as string
      setPosition(value);
      handleValueChange(value);
    },
    [onValueChange],
  );

  // Cleanup the debounce function on unmount
  useEffect(() => {
    return () => handleValueChange.cancel();
  }, [handleValueChange]);

  return (
    <FormControl fullWidth sx={{ width: "49%" }}>
      <InputLabel id="position-applying-label" size="small">
        Position Applying For
      </InputLabel>
      <Select
        labelId="position-applying-label"
        id="position-applying"
        label="Position Applying For"
        onChange={handleChange}
        value={position as string}
        size="small"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"Math Teacher"}>Math Teacher</MenuItem>
        <MenuItem value={"Science Teacher"}>Science Teacher</MenuItem>
        <MenuItem value={"English Teacher"}>English Teacher</MenuItem>
      </Select>
    </FormControl>
  );
}

export default memo(PositionApplying);
