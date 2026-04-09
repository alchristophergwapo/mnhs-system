"use client";

import { ReactNode, useMemo } from "react";
import {
  MaterialReactTable,
  MaterialReactTableProps,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from "material-react-table";
import { Theme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";

type MaterialTableProps<T extends Record<string, any>> = {
  tableColumns: MRT_ColumnDef<T>[];
  tableRows: T[];
  renderRowActions: (t: object) => ReactNode;
};

export default function MaterialTable<T extends Record<string, any>>(
  props: MaterialTableProps<T>,
) {
  const { tableColumns, tableRows, ...otherProps } = props;

  const data = useMemo(() => tableRows, [tableRows]);

  //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
  const columns = useMemo<MRT_ColumnDef<T>[]>(
    () => tableColumns,
    [tableColumns],
  );

  const defaults = useMemo((): Partial<MaterialReactTableProps<T>> => {
    return {
      initialState: {
        density: "compact",
        showColumnFilters: false,
        showGlobalFilter: true,
        columnPinning: {
          left: ["mrt-row-select"],
          right: ["mrt-row-actions"],
        },
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      enableGlobalFilter: true,
      enableFullScreenToggle: false,
      enableColumnFilterModes: true,
      enableColumnOrdering: false,
      enableGrouping: false,
      enableColumnPinning: true,
      enableFacetedValues: true,
      enableRowActions: true,
      enableRowSelection: true,
      enableRowDragging: false,
      enableFilters: false,
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
      paginationDisplayMode: "pages",
      positionToolbarAlertBanner: "top",
      muiPaginationProps: {
        color: "secondary",
        rowsPerPageOptions: [10, 20, 30],
        shape: "rounded",
        showRowsPerPage: false,
      },
      muiSearchTextFieldProps: {
        placeholder: "Search",
        className: "rounded-lg",
        size: "small",
      },
      muiFilterTextFieldProps: {
        variant: "outlined",
        size: "small",
        sx: {
          "& .MuiInputBase-root": {
            padding: "0px 8px",
            height: "32px!important",
            minHeight: "32px!important",
          },
        },
      },
      muiSelectAllCheckboxProps: {
        className: "w-12",
        sx: {
          color: "gray",
        },
      },
      muiSelectCheckboxProps: {
        className: "w-12",
        sx: {
          color: "gray",
        },
      },
      muiTableBodyRowProps: ({ table }) => {
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
      muiTableHeadCellProps: ({ column }) => ({
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
      // renderTopToolbar: (_props) => <></>,
      // icons: tableIcons,
      ...otherProps,
    };
  }, [otherProps]);

  console.log(defaults.muiSearchTextFieldProps, otherProps);

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    ...defaults,
  });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />;
}
