import Avatar from "@mui/material/Avatar";
import { GradeLevelType, StudentType, UserType } from "@types";

export const studentColumns = [
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
    accessorKey: "",
    id: "gradeLevel",
    header: "Grade Level",
    accessorFn: (row: UserType & {student: StudentType & {gradeLevel: GradeLevelType}}) => row?.student?.gradeLevel?.name || "N/A",
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
