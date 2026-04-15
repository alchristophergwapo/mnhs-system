import { InputProps } from "../../_types";
import Input from "@/src/components/Input";
import { debounce } from "lodash";
import React, { useEffect, useMemo } from "react";

/**
 * A component that wraps the Input component from @mui/material.
 * It takes the target, value, and onValueChange props, and passes them to the Input component.
 * It also passes any other props to the Input component.
 * @param {InputProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 * @example
 * const target = "lastName";
 * const value = "Doe";
 * const handleValueChange = (target: string, value: string) => console.log(`${target}: ${value}`);
 * <InputField target={target} value={value} onValueChange={handleValueChange} />
 */
function InputField({
  target,
  value,
  onValueChange: handleValueChange,
  ...props
}: InputProps) {
  const [inputValue, setInputValue] = React.useState(value);

  // Debounce and memoize the input change event
  const handleInputChange = useMemo(
    () => debounce((value) => handleValueChange(target, value as string), 500),
    [handleValueChange],
  );

  // Cleanup the debounce function on unmount
  useEffect(() => {
    return () => {
      handleInputChange.cancel();
    };
  }, [handleInputChange]);

  // Handle input change event.
  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(ev.target.value);
      handleInputChange(ev.target.value);
    },
    [handleValueChange],
  );

  return <Input value={inputValue} onChange={handleChange} {...props} />;
}

// Memoize the component to prevent unnecessary re-renders
export default React.memo(
  InputField,
  (prevProps, nextProps) =>
    prevProps.target === nextProps.target &&
    prevProps.value === nextProps.value &&
    prevProps.onValueChange === nextProps.onValueChange &&
    Object.keys(prevProps).length === Object.keys(nextProps).length &&
    Object.keys(prevProps).every(
      (key) =>
        nextProps.hasOwnProperty(key) &&
        (prevProps[key] as any) === nextProps[key],
    ),
) as typeof InputField;
