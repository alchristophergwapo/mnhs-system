"use client";

import Avatar from "@mui/material/Avatar";
import { CustomTableRowProps } from "@/src/components/Table";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import { TeacherType } from "..";

export type ColumnProps = TableCellProps & {
  _isheader?: boolean;
  _rowdata?: CustomTableRowProps & TeacherType;
};

type NameColumnProps = ColumnProps & {};
export default function NameColumn(props: NameColumnProps) {
  const { _isheader, _rowdata } = props;

  if (_isheader) {
    return (
      <TableCell
        sx={{ bgcolor: "rgba(0, 0, 0, .2)", fontWeight: "bold" }}
        align="left"
      >
        Name
      </TableCell>
    );
  }

  return (
    <TableCell align="left">
      <div className="flex flex-row items-center space-x-2">
        <Avatar src={_rowdata?.avatar} alt="teacher's avatar" />
        <span>
          {_rowdata?.firstName} {_rowdata?.lastName}
        </span>
      </div>
    </TableCell>
  );
}
