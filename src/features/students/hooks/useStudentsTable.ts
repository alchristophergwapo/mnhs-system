import { SetStateAction, useCallback, useEffect, useState } from "react";
import { GetStudentsApiArg } from "../api/students.types";
import { MRT_PaginationState } from "material-react-table";

/**
 * A custom hook to manage the state and logic for a students table.
 * It handles pagination state and provides a way to dynamically update
 * API query parameters, synchronizing pagination changes back to the parameters.
 *
 * @param {GetStudentsApiArg} parameters - The current API query parameters (e.g., page, limit, filters).
 * @param {(parameters: Record<string, string | number | boolean>) => void} setParameters - The state setter function to update the API query parameters.
 * @returns {Object} An object containing the table state and handlers.
 * @returns {MRT_PaginationState} return.pagination - The current pagination state (pageIndex and pageSize).
 * @returns {React.Dispatch<React.SetStateAction<MRT_PaginationState>>} return.setPagination - The setter function to update the pagination state.
 * @returns {(key: string, value: string | number) => void} return.handleChangeOptions - A callback function to dynamically update a specific parameter key.
 */
export function useStudentsTable(
  parameters: GetStudentsApiArg,
  setParameters: (parameters: SetStateAction<GetStudentsApiArg>) => void,
) {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: parameters.page,
    pageSize: parameters.limit,
  });

  /**
   * Handles changes to parameter options by updating the state.
   * Dynamically sets a specific parameter key to a new value.
   *
   * @param {string} key - The key of the parameter to update.
   * @param {string | number} value - The new value for the parameter.
   * @returns {void}
   */
  const handleChangeOptions = useCallback(
    (key: string, value: string | number) => {
      setParameters((prev: GetStudentsApiArg) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  // Update the parameters state when the pagination state changes
  useEffect(() => {
    setParameters((prev: GetStudentsApiArg) => ({
      ...prev,
      page: pagination.pageIndex,
      limit: pagination.pageSize,
    }));
  }, [pagination]);

  return {
    pagination,
    setPagination,
    handleChangeOptions,
  };
}
