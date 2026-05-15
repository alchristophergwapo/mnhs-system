import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import DualCitizenship from "./DualCitizenship";
import { useFormContext } from "@/src/hooks/useTanstack";

/**
 * A component for inputting the teacher's citizenship information.
 * It includes fields for indicating whether the teacher is a Filipino citizen and whether they hold dual citizenship.
 * If the teacher holds dual citizenship, it also includes fields for indicating the country of dual citizenship and whether the teacher obtained it by birth or by naturalization.
 * @returns {JSX.Element} - The JSX element for the component.
 * @example
 * <Citizenship />
 */
export default function Citizenship() {
  const form = useFormContext();

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel
        component="legend"
        className="dark:text-white!"
        sx={{
          "& .MuiFormLabel-asterisk": {
            color: "red",
            fontSize: "16px!important",
          },
        }}
      >
        <Typography>Citizenship</Typography>
        <Typography variant="caption">
          If holder of dual citizenship, please indicate the details
        </Typography>
      </FormLabel>
      <FormGroup row className="items-start">
        <form.Field
          name={"citizenship.filipino" as never}
          children={(field) => (
            <FormControlLabel
              label="Filipino"
              name={field.name}
              control={
                <Checkbox
                  checked={field.state.value || false}
                  onChange={(e) => field.handleChange(e.target.checked as any)}
                />
              }
            />
          )}
        />
        <form.Field
          name={"citizenship.dualCitizenship" as never}
          children={(field) => (
            <div className="flex flex-col">
              <FormControlLabel
                label="Dual Citizenship"
                name={field.name}
                control={
                  <Checkbox
                    checked={field.state.value || false}
                    onChange={(e) =>
                      field.handleChange(e.target.checked as any)
                    }
                  />
                }
              />
              {field.state.value && <DualCitizenship />}
            </div>
          )}
        />
      </FormGroup>
    </FormControl>
  );
}
