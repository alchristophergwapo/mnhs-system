import MuiTable, { TableProps } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination, {
  TablePaginationProps,
} from "@mui/material/TablePagination";
import React, { Children, cloneElement } from "react";

type TableComponentProps = TableProps & {
  tableRows?: Array<object>;
  pagination?: TablePaginationProps;
  otherProps: any;
};

export default function Table(props: TableComponentProps) {
  const { children, tableRows = [], pagination, ...otherProps } = props;
  const tableHeaders: Array<React.ReactNode> = [];
  const tableContents: Array<React.ReactNode> = [];

  const childrenArray = Children.toArray(children);
  if (childrenArray?.length) {
    for (let index = 0; index < childrenArray.length; index++) {
      const childElement: any = childrenArray[index];
      tableHeaders.push(
        cloneElement(childElement, {
          key: `table-header-${index}`,
          index,
          isHeader: true,
        }),
      );
    }
    if (tableRows) {
      for (let index = 0; index < tableRows.length; index++) {
        const rowElement: any = tableRows[index];
        tableContents.push(
          cloneElement(rowElement, {
            key: `table-row-${index}`,
            index,
            rowData: rowElement,
          }),
        );
      }
    }
  }

  let tablePagination = null;
  if (pagination) {
    tablePagination = (
      <TablePagination component="div" align="right" {...pagination} />
    );
  }

  return (
    <TableContainer>
      <MuiTable className="w-full" stickyHeader {...otherProps}>
        <TableHead>
          <TableRow>{tableHeaders}</TableRow>
        </TableHead>
        <TableBody>{tableContents}</TableBody>
      </MuiTable>
      {tablePagination}
    </TableContainer>
  );
}
