"use client";

import Avatar from "@mui/material/Avatar";
import MaterialTable from "@/src/components/MaterialTable";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { createRandomTeacher } from "../grade7";
import { faker } from "@faker-js/faker";
import { ReactNode } from "react";
import ActionsColumn from "./columns/ActionsColumn";

type GradeVIIProps = {};

export default function GradeVIII(props: GradeVIIProps) {
  const teachers = faker.helpers.multiple(createRandomTeacher, { count: 10 });

  const columns = [
    {
      accessorKey: "avatar",
      id: "avatar", //id required if you use accessorFn instead of accessorKey
      header: "",
      enableColumnFilter: false,
      size: 50,
      maxSize: 50,
      grow: false,
      Cell: ({ row }) => (
        <Avatar src={row.original?.avatar} alt="teacher's avatar" />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "",
      id: "name", //id required if you use accessorFn instead of accessorKey
      header: "Name",
      accessorFn: (row) => `${row?.firstName} ${row?.lastName}`,
      enableColumnFilter: false,
    },
    {
      accessorKey: "sex",
      accessorFn: (row) =>
        String(row?.sex).replace(/^./, (match) => match.toUpperCase()),
      id: "gender", //id required if you use accessorFn instead of accessorKey
      header: "Gender",
      // enableColumnFilter: false,
    },
  ];

  const actions = (args): ReactNode[] => [
    <MenuItem key="edit" onClick={() => console.info("Edit")}>
      Edit
    </MenuItem>,
    <MenuItem key="delete" onClick={() => console.info("Delete")}>
      Delete
    </MenuItem>,
  ];

  return (
    <div className="w-full z-10 p-8">
      <Paper className="w-full mt-8 flex flex-col py-2 z-10 gap-6 bg-white min-h-40">
        <MaterialTable
          tableColumns={columns}
          tableRows={teachers}
          renderRowActions={(props) => <ActionsColumn {...props} />}
        />
      </Paper>
    </div>
  );
}
