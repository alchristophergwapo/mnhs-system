import { useFormContext } from "@hooks/useTanstack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { UpdaterFn } from "@tanstack/react-form";

function FilipinoCitizenship() {
  const form = useFormContext();

  return (
    <form.Field name={"citizenship.filipino" as never}>
      {(field) => (
        <FormControlLabel
          label="Filipino"
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
      )}
    </form.Field>
  );
}

export default FilipinoCitizenship;
