import MaterialTable, {
  mrtTableInitialState,
} from "@components/table/MaterialTable";
import { useStudentsTable } from "@features/students/hooks/useStudentsTable";
import { StudentPageContentProps } from "@features/students/layout/StudentsPageContent";
import { studentColumns } from "./columns";
import { useMemo } from "react";
import { UserType } from "@types";
import { MRT_TableState } from "material-react-table";

/**
 * Renders a data table for displaying student information with manual pagination and filtering.
 * 
 * @param {StudentPageContentProps} props - The component props.
 * @param {StudentPageContentProps['parameters']} props.parameters - The current query/filter parameters for the student data.
 * @param {StudentPageContentProps['setParameters']} props.setParameters - Callback function to update the query/filter parameters.
 * @param {StudentPageContentProps['data']} props.data - The array of student data to be displayed in the table rows.
 * @param {StudentPageContentProps['isLoading']} props.isLoading - Flag indicating whether the student data is currently being fetched.
 * @param {StudentPageContentProps['total']} props.total - The total number of student records for pagination calculation.
 * @returns {JSX.Element} The rendered MaterialTable component for students.
 */
function StudentsTable({
  parameters,
  setParameters,
  data,
  isLoading,
  total,
}: StudentPageContentProps) {
  const { pagination, setPagination } = useStudentsTable(
    parameters,
    setParameters,
  );

  const columns = useMemo(() => studentColumns, []);

  return (
    <MaterialTable
      tableColumns={columns}
      tableRows={data as unknown as UserType[]}
      // renderRowActions={(props) => <ActionsColumn {...props} />}
      muiPaginationProps={{
        color: "secondary",
        rowsPerPageOptions: [10, 20, 50, 100],
        shape: "rounded",
        showRowsPerPage: true,
        variant: "outlined",
        id: "pagination",
      }}
      manualFiltering
      manualPagination
      onPaginationChange={setPagination}
      state={
        {
          ...mrtTableInitialState,
          isLoading: isLoading,
          showProgressBars: isLoading,
          pagination,
        } as unknown as Partial<MRT_TableState<UserType>>
      }
      paginationDisplayMode="pages"
      rowCount={total}
    />
  );
}

export default StudentsTable;
