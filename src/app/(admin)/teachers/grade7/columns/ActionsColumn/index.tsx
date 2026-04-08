"use client";

import IconButton from '@mui/material/IconButton'
import TableCell from "@mui/material/TableCell";
import { ColumnProps } from "../NameColum";

type ActionColumnProps = ColumnProps & {};

export default function ActionsColumn(props: ActionColumnProps) {
  const { _isheader, _rowdata } = props;

  if (_isheader) {
    return (
      <TableCell sx={{ bgcolor: "rgba(0, 0, 0, .2)", fontWeight: "bold" }}>
        Actions
      </TableCell>
    );
  }

  return <TableCell>
    <IconButton>
        
    </IconButton>
  </TableCell>;
}
