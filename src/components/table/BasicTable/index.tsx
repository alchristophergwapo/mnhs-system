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
import React, {
  Children,
  cloneElement,
  ReactElement,
  useCallback,
} from "react";

export type CustomTableRowProps = {
  id: number;
};

type TableComponentProps = TableProps & {
  tableRows: Array<CustomTableRowProps>;
  pagination?: TablePaginationProps;
  onTableRowClick?: (obj: object) => void | undefined;
  otherProps?: unknown;
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
 * A dynamic and customizable Table component that renders tabular data based on
 * provided column definitions (children) and row data. It automatically clones
 * child elements to generate table headers and row contents, passing necessary
 * metadata like row data and index to each cell. It also supports optional
 * row click handling and pagination.
 *
 * @param {TableComponentProps} props - The props for the Table component.
 * @param {React.ReactNode} props.children - The column definition elements (typically TableCell components) used as templates for both headers and rows.
 * @param {Array<object>} [props.tableRows=[]] - An array of data objects representing the rows to be rendered in the table body.
 * @param {object} [props.pagination] - Optional pagination configuration object passed directly to the TablePagination component.
 * @param {function} [props.onTableRowClick] - Optional callback function triggered when a table row is clicked. Receives the clicked row's data object as an argument.
 * @param {...any} props.otherProps - Additional props spread onto the underlying MUI Table component.
 * @returns {React.ReactElement} The rendered Table component.
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

  /**
   * Handles the event when a table row is clicked.
   * If the `onTableRowClick` callback function is provided,
   * it will be invoked with the clicked row's data.
   *
   * @param {object} row - The data object representing the clicked row.
   * @returns {void}
   */
  const handleRowClicked = useCallback(
    (row: object) => {
      if (onTableRowClick) {
        onTableRowClick(row);
      }
    },
    [onTableRowClick],
  );

  const childrenArray = Children.toArray(children);
  if (childrenArray?.length) {
    for (let index = 0; index < childrenArray.length; index++) {
      const childElement = childrenArray[index];

      const clonedHeaderElement = cloneElement(
        childElement as ReactElement<{ index: number; _isheader: boolean }>,
        {
          key: `table-header-${index}`,
          index,
          _isheader: true,
        },
      );

      tableHeaders.push(clonedHeaderElement);
    }
  }

  if (childrenArray.length && tableRows) {
    for (let index = 0; index < tableRows.length; index++) {
      const rowElement = tableRows[index];
      const tableColumns = [];
      for (let j = 0; j < childrenArray.length; j++) {
        const childRowElement = childrenArray[j];

        const clonedTableRow = cloneElement(
          childRowElement as ReactElement<{
            index: number;
            _rowdata: typeof rowElement;
          }>,
          {
            key: `table-row-${index}-column-${j}`,
            index,
            _rowdata: rowElement,
          },
        );

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
