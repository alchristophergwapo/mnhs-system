'use client'

import TableCell from "@mui/material/TableCell";
import { ColumnProps } from "./NameColum";

type GenderColumnProps = ColumnProps & {};
export default function GenderColumn(props: GenderColumnProps) {
  const { _isheader, _rowdata } = props;

  if (_isheader) {
    return <TableCell sx={{bgcolor: "rgba(0, 0, 0, .2)", fontWeight: "bold"}}>Gender</TableCell>;
  }
  
  return <TableCell>{String(_rowdata?.sex).replace(/^./, (match) => match.toUpperCase())}</TableCell>;
}
