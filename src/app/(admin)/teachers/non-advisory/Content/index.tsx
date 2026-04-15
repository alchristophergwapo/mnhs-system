import Avatar from "@mui/material/Avatar";
import MaterialTable, {
  mrtTableInitialState,
} from "@/src/components/MaterialTable";
import { useEffect, useState } from "react";
import ActionsColumn from "../columns/ActionsColumn";
import { TeacherType } from "../../TeachersApi";
import { SharedPropsType } from "@/src/components/PageWrapper";
import { MRT_PaginationState, MRT_TableState } from "material-react-table";

type ContentProps = Partial<SharedPropsType<TeacherType>> & {
  total: number;
  options: { page: number; limit: number };
  setOptions: (options: object) => void;
};

/**
 * Renders a table component with columns for the teacher's avatar, name, email, contact number, and gender.
 * The component also includes a pagination component and an actions column with edit and delete buttons.
 * @param {ContentProps} props - The props for the component.
 * @returns {JSX.Element} - The rendered MaterialTable component.
 */
export default function Content(props: ContentProps) {
  const { data = [], isLoading, total, options, setOptions } = props;

  const columns = [
    {
      accessorKey: "avatar",
      header: "",
      enableColumnFilter: false,
      size: 50,
      maxSize: 50,
      grow: false,
      Cell: ({ row }: { row: any }) => (
        <Avatar
          src={row.original?.avatar}
          alt="teacher's avatar"
          slotProps={{
            img: {
              loading: "lazy",
            },
          }}
        >
          {String(row.original?.lastName).charAt(0)}
        </Avatar>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "",
      id: "name", //id required if you use accessorFn instead of accessorKey
      header: "Name",
      accessorFn: (row: TeacherType) =>
        `${row?.firstName} ${row?.middleName || ""} ${row?.lastName}`,
      enableColumnFilter: false,
    },
    {
      accessorKey: "email",
      header: "Email",
      accessorFn: (row: TeacherType) => row?.email || "N/A",
      enableColumnFilter: false,
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
      accessorFn: (row: TeacherType) => row?.contactNumber,
      enableColumnFilter: false,
    },
    {
      accessorKey: "gender",
      accessorFn: (row: TeacherType) =>
        String(row?.gender).replace(/^./, (match) => match.toUpperCase()),
      id: "gender", //id required if you use accessorFn instead of accessorKey
      header: "Gender",
      enableColumnFilter: false,
    },
  ];

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: options.page,
    pageSize: options.limit,
  });

  // Update the options state when the pagination state changes
  useEffect(() => {
    setOptions((prev: object) => ({
      ...prev,
      page: pagination.pageIndex,
      limit: pagination.pageSize,
    }));
  }, [pagination]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <MaterialTable
      tableColumns={columns}
      tableRows={data}
      renderRowActions={(props) => <ActionsColumn {...props} />}
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
          isLoading: isLoading || false,
          showProgressBars: isLoading || false,
          pagination,
        } as Partial<MRT_TableState<TeacherType>>
      }
      paginationDisplayMode="pages"
      rowCount={total}
    />
  );
}
