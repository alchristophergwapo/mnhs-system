"use client";

import { useMemo } from "react";
import {
  MaterialReactTable,
  MaterialReactTableProps,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
  type MRT_Column,
  MRT_TableInstance,
  MRT_TableState,
} from "material-react-table";
import { Theme } from "@mui/material/styles";
import _ from "lodash";

type MaterialTableProps<T extends Record<string, unknown>> = {
  tableColumns: MRT_ColumnDef<T>[];
  tableRows: T[];
} & Partial<MaterialReactTableProps<T>>;

type TData = {
  [key: string]: unknown;
};

export const mrtTableInitialState: Partial<MRT_TableState<TData>> = {
  density: "compact",
  showColumnFilters: false,
  showGlobalFilter: false,
  columnPinning: {
    left: ["mrt-row-select"],
    right: ["mrt-row-actions"],
  },
};

/**
 * A Material UI table component that uses MaterialReactTable component from material-react-table.
 * It provides a set of default table options and allows props to override them.
 * The component also provides a set of default CSS classes to style the table.
 *
 * @param {MaterialTableProps<T>} props - The props for the component.
 * @param {MRT_ColumnDef<T>[]} tableColumns - The column definitions for the table.
 * @param {T[]} tableRows - The data for the table.
 * @param {Partial<MaterialReactTableProps<T>>} otherProps - The other props for the component.
 * @returns {JSX.Element} - The rendered MaterialReactTable component.
 */
export default function MaterialTable<T extends Record<string, unknown>>(
  props: MaterialTableProps<T>,
) {
  const { tableColumns, tableRows, ...otherProps } = props;

  const data = useMemo(() => tableRows, [tableRows]);

  //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
  const columns = useMemo<MRT_ColumnDef<T>[]>(
    () => tableColumns,
    [tableColumns],
  );

  // Default table options. Can be overridden by props. We memoize this for performance
  const defaults = useMemo((): Partial<MaterialReactTableProps<T>> => {
    return _.defaults(otherProps, {
      initialState: mrtTableInitialState,
      enableDensityToggle: false,
      enableGlobalFilter: false,
      enableGlobalFilterModes: false,
      enableFullScreenToggle: false,
      enableColumnFilterModes: false,
      enableColumnActions: false,
      enablecolumnFilters: false,
      enableColumnVirtualization: false,
      enableColumnOrdering: false,
      enableGrouping: false,
      enableColumnPinning: true,
      enableSorting: false,
      enableFacetedValues: true,
      enableRowActions: true,
      enableRowSelection: false,
      enableRowDragging: false,
      enableFilters: false,
      enableHiding: false,
      enableTopToolbar: false,
      muiBottomToolbarProps: {
        className: "flex items-center min-h-14 h-14 border-b-lg",
      },
      muiTopToolbarProps: {
        className: "border-t-lg",
        sx: {
          "& .MuiIconButton-root": {
            color: "black",
          },
        },
      },
      muiTablePaperProps: {
        elevation: 0,
        square: true,
        className: "flex flex-col flex-auto h-full",
      },
      muiTableContainerProps: {
        className: "flex-auto",
      },
      enableStickyHeader: true,
      enableStickyFooter: true,
      positionToolbarAlertBanner: "top",
      muiPaginationProps: {
        color: "secondary",
        rowsPerPageOptions: [10, 20, 30],
        shape: "rounded",
        showRowsPerPage: false,
      },
      muiSearchTextFieldProps: {
        slotProps: {
          input: {},
        },
      },
      muiTableBodyRowProps: ({ table }: { table: MRT_TableInstance<T> }) => {
        const { density } = table.getState();

        if (density === "compact") {
          return {
            sx: {
              backgroundColor: "initial",
              opacity: 1,
              boxShadow: "none",
            },
          };
        }

        return {
          sx: {
            backgroundColor: "initial",
            opacity: 1,
            boxShadow: "none",
          },
        };
      },
      muiTableBodyCellProps: {
        sx: {
          borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
        },
      },
      muiTableHeadCellProps: ({ column }: { column: MRT_Column<T> }) => ({
        sx: {
          "& .Mui-TableHeadCell-Content-Labels": {
            flex: 1,
            justifyContent: "space-between",
          },
          "& .Mui-TableHeadCell-Content-Actions": {
            "& > button": {
              marginX: "2px",
            },
          },
          "& .MuiFormHelperText-root": {
            textAlign: "center",
            marginX: 0,
            color: (theme: Theme) => theme.palette.text.disabled,
            fontSize: 11,
          },
          "& .MuiIconButton-root": {
            color: "black",
          },
          backgroundColor: (theme: Theme) =>
            column.getIsPinned() ? theme.palette.background.paper : "#f2f2f7",
          borderBottom: "none",
        },
      }),
      mrtTheme: (theme: Theme) => ({
        baseBackgroundColor: theme.palette.background.paper,
        menuBackgroundColor: theme.palette.background.paper,
        pinnedRowBackgroundColor: "theme.palette.background.paper",
        pinnedColumnBackgroundColor: theme.palette.background.paper,
      }),
    });
  }, [otherProps]);

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    ...defaults, //allow props to override defaults
    ...otherProps,
  });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />;
}
