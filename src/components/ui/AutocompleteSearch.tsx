import { JSX, memo, useCallback, useEffect, useMemo, useState } from "react";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import Input from "./Input";
import { debounce } from "lodash";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * AutocompleteSearch component
 * @param value - The current value of the input
 * @param onInputValueChange - Callback function to handle input value changes
 * @param onValueChange - Callback function to handle value changes
 * @param options - Array of options to display in the autocomplete dropdown
 * @param rest - Other props to pass to the Autocomplete component
 * This component renders an autocomplete input field that allows users to search and select from a list of options. It uses the Material-UI Autocomplete component and includes debouncing for input value changes to optimize performance.
 */
function AutocompleteSearch<T extends Record<string, unknown>>({
  value,
  onInputValueChange,
  onValueChange,
  loading,
  options = [],
  label,
  ...rest
}: Partial<
  AutocompleteProps<T, boolean, boolean, boolean, (props: unknown) => JSX.Element>
> & {
  onValueChange?: (value: T) => void;
  onInputValueChange: (value: string) => void;
  label?: string;
}) {
  const [inputValue, setInputValue] = useState("");

  /**
   * Handles the value change event from an input component
   * @param value - The new value from the input
   */
  const handleValueChange = useMemo(
    () =>
      debounce((value: string) => {
        // Callback function to process input value changes
        onInputValueChange?.(value); // Invoke the callback function if it exists
      }, 300),
    [onInputValueChange],
  );

  /**
   * Handles the input value change event
   * @param newInputValue - The new input value from the user
   * This function updates the local state with the new input value and calls the debounced handleValueChange function to process the change.
   */
  const handleInputValueChange = useCallback((newInputValue: string) => {
    setInputValue(newInputValue);
    handleValueChange(newInputValue);
  }, []);

  // Cleanup the debounce function on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      handleValueChange.cancel();
    };
  }, [handleValueChange]);

  return (
    <Autocomplete
      freeSolo={true}
      options={options as T[]}
      autoComplete
      includeInputInList
      filterSelectedOptions
      filterOptions={(x) => x}
      value={value}
      loading={loading}
      onChange={(
        _,
        newValue: T | NonNullable<string | T> | (string | T)[] | null,
      ) => {
        if (onValueChange) onValueChange(newValue as T);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) =>
        handleInputValueChange(newInputValue)
      }
      renderInput={(params) => {
        return (
          <Input
            {...params}
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps?.input,
                endAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={16} />}
                    {params.slotProps?.input?.endAdornment}
                  </>
                ),
              },
            }}
            label={label ? label : "Search..."}
            size="small"
          />
        );
      }}
      {...rest}
    />
  );
}

export default memo(AutocompleteSearch);
