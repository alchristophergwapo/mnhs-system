import Avatar from "@mui/material/Avatar";
import MaterialTable, {
  mrtTableInitialState,
} from "@/src/components/MaterialTable";
import { Fragment, useEffect, useState } from "react";
import ActionsColumn from "./columns/ActionsColumn";
import { UserType } from "../_types";
import { SharedPropsType } from "@/src/components/PageWrapper";
import { MRT_PaginationState, MRT_TableState } from "material-react-table";
import TeacherTypeFilter from "./TeacherTypeFilter";
import Loading from "@/src/components/Loading";
import GradeLevelFilter from "./GradeLevelFilter";
import { GetTeachersApiArg } from "../TeachersApi";

type ContentProps = Partial<SharedPropsType<UserType>> & {
  parameters: GetTeachersApiArg;
  setParameters: (parameters: object) => void;
};

/**
 * Renders a table component with columns for the teacher's avatar, name, email, contact number, and gender.
 * The component also includes a pagination component and an actions column with edit and delete buttons.
 * @param {ContentProps} props - The props for the component.
 * @returns {JSX.Element} - The rendered MaterialTable component.
 */
export default function Content(props: ContentProps) {
  const { data = [], isLoading, total, parameters, setParameters } = props;

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
      accessorFn: (row: UserType) =>
        `${row?.firstName} ${row?.middleName || ""} ${row?.lastName}`,
      enableColumnFilter: false,
    },
    {
      accessorKey: "email",
      header: "Email",
      accessorFn: (row: UserType) => row?.email || "N/A",
      enableColumnFilter: false,
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
      accessorFn: (row: UserType) => row?.contactNumber,
      enableColumnFilter: false,
    },
    {
      accessorKey: "gender",
      accessorFn: (row: UserType) =>
        String(row?.gender).replace(/^./, (match) => match.toUpperCase()),
      id: "gender", //id required if you use accessorFn instead of accessorKey
      header: "Gender",
      enableColumnFilter: false,
    },
  ];

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: parameters.page,
    pageSize: parameters.limit,
  });

  const handleChangeOptions = (key: string, value: string | number) => {
    setParameters({ ...parameters, [key]: value });
  };

  // Update the parameters state when the pagination state changes
  useEffect(() => {
    setParameters((prev: object) => ({
      ...prev,
      page: pagination.pageIndex,
      limit: pagination.pageSize,
    }));
  }, [pagination]);

  if (isLoading) {
    return (
      <div className="flex flex-auto justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="flex flex-row-reverse px-2 mt-2 gap-4">
        <TeacherTypeFilter
          type={parameters.type}
          onChangeType={(type) => handleChangeOptions("type", type)}
        />
        <GradeLevelFilter
          gradeLvlId={parameters?.gradeLvl}
          onChangeType={(gradeLvlId) =>
            handleChangeOptions("gradeLvl", gradeLvlId)
          }
        />
      </div>
      <MaterialTable
        tableColumns={columns}
        tableRows={data as UserType[]}
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
          } as Partial<MRT_TableState<UserType>>
        }
        paginationDisplayMode="pages"
        rowCount={total}
      />
    </Fragment>
  );
}
