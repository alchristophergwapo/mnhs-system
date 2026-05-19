import Avatar from "@mui/material/Avatar";
import MaterialTable, { mrtTableInitialState } from "@components/table/MaterialTable";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import ActionsColumn from "./columns/ActionsColumn";
import { UserType } from "../_types";
import { SharedPropsType } from "@components/PageCardedWrapper";
import { MRT_PaginationState, MRT_TableState } from "material-react-table";
import TeacherTypeFilter from "./TeacherTypeFilter";
import { GetTeachersApiArg } from "../TeachersApi";
import GradeLevelFilter from "@components/Filters/GradeLevelFilter";

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
export default function TeachersPageContent(props: ContentProps) {
  const { data = [], isLoading, total, parameters, setParameters } = props;

  const columns = useMemo(
    () => [
      {
        accessorKey: "avatar",
        header: "",
        enableColumnFilter: false,
        size: 50,
        maxSize: 50,
        grow: false,
        Cell: ({ row }: { row: unknown }) => (
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
    ],
    [],
  );

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: parameters.page,
    pageSize: parameters.limit,
  });

  /**
   * Handles changes to the options by updating the corresponding key in the parameters state.
   *
   * @param {string} key - The property name to be updated in the parameters object.
   * @param {string | number} value - The new value to assign to the specified key.
   */
  const handleChangeOptions = useCallback(
    (key: string, value: string | number) => {
      setParameters({ ...parameters, [key]: value });
    },
    [],
  );

  // Update the parameters state when the pagination state changes
  useEffect(() => {
    setParameters((prev: object) => ({
      ...prev,
      page: pagination.pageIndex,
      limit: pagination.pageSize,
    }));
  }, [pagination]);

  return (
    <Fragment>
      <div className="flex flex-row-reverse px-2 mt-2 gap-4">
        <TeacherTypeFilter
          type={parameters.type}
          onChangeType={(type) => handleChangeOptions("type", type)}
        />
        <GradeLevelFilter
          gradeLvlId={parameters?.gradeLvl}
          onChange={(gradeLvlId) => handleChangeOptions("gradeLvl", gradeLvlId)}
        />
      </div>
      <MaterialTable
        tableColumns={columns}
        tableRows={data as UserType[]}
        renderRowActions={(props) => <ActionsColumn {...props} />}
        muiPaginationProps={{
          color: "primary",
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
          } as unknown as Partial<MRT_TableState<UserType>>
        }
        paginationDisplayMode="pages"
        rowCount={total}
      />
    </Fragment>
  );
}
