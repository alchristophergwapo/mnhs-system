import MenuItem from "@mui/material/MenuItem";
import { memo, useMemo } from "react";
import Select from "@components/ui/Select";
import { useFormContext } from "@hooks/useTanstack";
import z from "zod";
import { useGetPositionsQuery } from "../../../TeachersApi";
import { FieldAsyncValidateOrFn, UpdaterFn } from "@tanstack/react-form";

/**
 * Component for selecting the teachers position in the school.
 */
/**
 * Position component renders a dropdown select field for choosing a position.
 * It integrates with `react-hook-form` (or similar form context) for form state management
 * and fetches available positions using an RTK Query hook.
 * Includes asynchronous validation to ensure the field is not left empty.
 *
 * @returns {JSX.Element} The rendered Position select field component.
 */
function Position() {
  const form = useFormContext();

  const { data, isFetching, isLoading } = useGetPositionsQuery({ query: "" });

  const positions = useMemo(() => data, [data]);

  return (
    <form.Field
      name={"positionId" as never}
      validators={{
        onChangeAsyncDebounceMs: 300,
        onChangeAsync: z
          .string()
          .nonempty(
            "Position is required",
          ) as unknown as FieldAsyncValidateOrFn<
          Record<string, never>,
          never,
          never
        >,
      }}
    >
      {(field) => (
        <Select
          label="Position"
          onChange={(e) =>
            field.handleChange(
              e.target.value as unknown as UpdaterFn<never, never>,
            )
          }
          value={field.state.value ?? ""}
          errors={field.state.meta.errors as { message: string }[]}
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
    </form.Field>
  );
}

export default memo(Position);
