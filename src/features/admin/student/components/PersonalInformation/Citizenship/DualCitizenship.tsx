import { useFormContext } from "@hooks/useTanstack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { UpdaterFn } from "@tanstack/react-form";
import DualCitizenshipBy from "./DualCitizenshipBy";

function DualCitizenship() {
  const form = useFormContext();

  return (
    <form.Field name={"citizenship.dualCitizenship" as never}>
      {(field) => (
        <div className="flex flex-col">
          <FormControlLabel
            label="Dual Citizenship"
            name={field.name}
            control={
              <Checkbox
                checked={field.state.value || false}
                onChange={(e) =>
                  field.handleChange(
                    e.target.checked as unknown as UpdaterFn<never, never>,
                  )
                }
              />
            }
          />
          {field.state.value && <DualCitizenshipBy />}
        </div>
      )}
    </form.Field>
  );
}

export default DualCitizenship;
