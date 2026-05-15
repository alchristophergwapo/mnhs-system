import Paper from "@mui/material/Paper";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import clsx from "clsx";
import { memo } from "react";

type SearchBoxProps = Partial<InputBaseProps> & {
  placeholder?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
};

/**
 * A search box component that wraps a Paper component with an InputBase component.
 * It accepts the following props:
 * - value: the current value of the input field
 * - onChange: the function to call when the value of the input field changes
 * - placeholder: the placeholder text to display in the input field
 * - className: the className to add to the Paper component
 * - leftIcon: a React node to render as the left icon of the search box
 * - children: a React node to render as the children of the search box
 * - onKeyDown: the function to call when a key is pressed in the input field
 * @example
 * <SearchBox
 *   value="John Doe"
 *   onChange={(e) => console.log(e.target.value)}
 *   placeholder="Search for a user"
 *   leftIcon={<Icon icon="search" />}
 *   children={<div>Search results</div>}
 * />
 */
function SearchBox({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  leftIcon,
  children,
  onKeyDown,
}: SearchBoxProps) {
  return (
    <Paper
      component="form"
      className={clsx(
        className,
        "flex items-center w-full rounded-md bg-gray-100",
      )}
    >
      {leftIcon && <div>{leftIcon}</div>}
      <InputBase
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full px-4 py-2"
      />
      {children}
    </Paper>
  );
}

export default memo(SearchBox);
