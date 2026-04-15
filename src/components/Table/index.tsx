"use client";

import GlobalStyles from "@mui/material/GlobalStyles";
import MuiTable, { TableProps } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination, {
  TablePaginationProps,
} from "@mui/material/TablePagination";
import React, { Children, cloneElement } from "react";

export type CustomTableRowProps = {
  id: string;
};

type TableComponentProps = TableProps & {
  tableRows?: Array<CustomTableRowProps>;
  pagination?: TablePaginationProps;
  onTableRowClick?: (obj: object) => void | undefined;
  otherProps?: any;
};

const tableGlobalStyles = (
  <GlobalStyles
    styles={() => ({
      "&.MuiTableCell-root": {
        borderBottom: "none!important",
        padding: "10px 16px!important",
      },
    })}
  />
);

/**
 * A reusable table component with material-ui styling.
 *
 * @param {TableComponentProps} props - The props for the component.
 * @param {React.ReactNode[]} props.children - The children elements of the component.
 * @param {Array<CustomTableRowProps>} props.tableRows - The table rows data.
 * @param {TablePaginationProps} props.pagination - The pagination props.
 * @param {(obj: object) => void | undefined} props.onTableRowClick - A callback function to handle table row click event.
 * @param {any} props.otherProps - Additional props for the component.
 *
 * @example
 * const tableRows = []
 * <Table tableRows={tableRows}>
 *   <Name /> - Name column will a custom component you will create with the table header and table cell
 * </Table>
 */
export default function Table(props: TableComponentProps) {
  const {
    children,
    tableRows = [],
    pagination,
    onTableRowClick,
    ...otherProps
  } = props;
  const tableHeaders: Array<React.ReactNode> = [];
  const tableContents: Array<React.ReactNode> = [];

  const handleRowClicked = (row: object) => {
    if (onTableRowClick) {
      onTableRowClick(row);
    }
  };

  const childrenArray = Children.toArray(children);
  if (childrenArray?.length) {
    for (let index = 0; index < childrenArray.length; index++) {
      const childElement: any = childrenArray[index];

      const clonedHeaderElement = cloneElement(childElement, {
        key: `table-header-${index}`,
        index,
        _isheader: true,
      });

      tableHeaders.push(clonedHeaderElement);
    }
  }

  if (childrenArray.length && tableRows) {
    for (let index = 0; index < tableRows.length; index++) {
      const rowElement: any = tableRows[index];
      const tableColumns = [];
      for (let j = 0; j < childrenArray.length; j++) {
        const childRowElement: any = childrenArray[j];

        const clonedTableRow = cloneElement(childRowElement, {
          key: `table-row-${index}-column-${j}`,
          index,
          _rowdata: rowElement,
        });

        tableColumns.push(clonedTableRow);
      }

      tableContents.push(
        <TableRow
          key={
            "id" in tableRows[index]
              ? tableRows[index].id
              : "table-entries-" + index
          }
          className="cursor-pointer"
          hover
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            handleRowClicked(tableRows[index]);
          }}
        >
          {tableColumns}
        </TableRow>,
      );
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
      {tableGlobalStyles}
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
