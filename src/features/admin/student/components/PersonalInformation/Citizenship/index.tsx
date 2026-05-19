import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import DualCitizenship from "./DualCitizenship";
import FilipinoCitizenship from "./FilipinoCitizenship";

export default function Citizenship() {

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">
        <div>Citizenship</div>
        <Typography variant="caption">
          If holder of dual citizenship, please indicate the details
        </Typography>
      </FormLabel>
      <FormGroup row className="items-start">
        <FilipinoCitizenship />
        <DualCitizenship />
      </FormGroup>
    </FormControl>
  );
}
