import MenuItem from "@mui/material/MenuItem";
import { memo, useMemo } from "react";
import Select from "@components/ui/Select";
import { useFormContext } from "@/src/hooks/useTanstack";
import z from "zod";
import { useGetPositionsQuery } from "../../../TeachersApi";

/**
 * Component for selecting the teachers position in the school.
 */
function Position() {
  const form = useFormContext();

  const {data, isFetching, isLoading} = useGetPositionsQuery({query: ""});
  
  const positions = useMemo(() => data, [data]);

  return (
    <form.Field
      name={"positionId" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z.string().nonempty("Position is required") as any,
      }}
      children={(field) => (
        <Select
          label="Position"
          onChange={(e) => field.handleChange(e.target.value as any)}
          value={field.state.value ?? ""}
          errors={field.state.meta.errors}
          error={field.state.meta.errors?.length > 0}
          disabled={isFetching || isLoading}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {positions?.map((position) => (
            <MenuItem key={position.id} value={position.id}>
              {position.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}

export default memo(Position);
