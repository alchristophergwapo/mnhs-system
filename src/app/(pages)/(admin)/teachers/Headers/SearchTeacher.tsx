import SearchBox from "@/src/components/SearchBox";
import Search from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

// Props type definition for the SearchTeacher component
type SearchTeacherProps = {
  query: string;
  onSearch: (query: string) => void;
  isLoading: boolean;
};

/**
 * A component for searching teachers.
 * It takes a query string, an onSearch function to call when the search query changes, and a boolean indicating whether the search is loading.
 * It debounces the onSearch function to prevent excessive calls while typing.
 * It also handles the keydown event for the search box input, preventing the default behavior and calling the onSearch function with the current search value when the Enter key is pressed.
 * @example
 * const handleSearch = (query) => console.log(query);
 * <SearchTeacher query="John" onSearch={handleSearch} isLoading={false} />
 */
export default function SearchTeacher(props: SearchTeacherProps) {
  const { query, onSearch, isLoading } = props;
  const [search, setSearch] = useState(query);

  // Debounce the onSearch function to prevent excessive calls while typing
  // useMemo is used to ensure that the debounced function is not recreated on every render
  const handleSearch = useMemo(
    () => debounce((value) => onSearch(value), 500),
    [onSearch],
  );

  // Cleanup the debounce function on unmount
  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  /**
   * Handle change event for the search box input
   * @param {ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newQueryValue = e.target.value;
    setSearch(newQueryValue);
    handleSearch(newQueryValue);
  }, []);

  /**
   * Handle the keydown event for the search box input.
   * If the Enter key is pressed, prevent the default behavior and call the onSearch function with the current search value.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keydown event
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSearch(search);
      }
    },
    [],
  );

  return (
    <SearchBox
      className="w-sm h-10 px-4"
      placeholder="Search teacher..."
      value={search}
      onChange={handleQueryChange}
      onKeyDown={handleKeyDown}
      disabled={isLoading}
    >
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <IconButton
          onClick={() => onSearch(search)}
          size="small"
          color="primary"
          aria-label="search teacher"
        >
          <Search />
        </IconButton>
      )}
    </SearchBox>
  );
}
