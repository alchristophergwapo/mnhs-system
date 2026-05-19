import TableCell from "@mui/material/TableCell";
import clsx from "clsx";

type ColumnProps = {
  _isheader?: boolean;
  _rowdata?: Record<string, unknown>;
  header: string;
  target: string;
};

/**
 * Renders a table column cell, conditionally displaying either a header cell or a data cell.
 * If the column is a header, it renders a styled header cell.
 * If the column is data, it renders a cell with conditional styling (red text if the value is less than 75)
 * and falls back to "N/A" if the value is falsy.
 * 
 * @param {ColumnProps} props - The properties passed to the Column component.
 * @param {boolean} props._isheader - Determines if the cell should be rendered as a header cell.
 * @param {Record<string, unknown> | null} props._rowdata - The data object for the current row. Ignored if `_isheader` is true.
 * @param {React.ReactNode} props.header - The content to display in the header cell.
 * @param {string} props.target - The key used to extract the corresponding value from the `_rowdata` object.
 * @returns {JSX.Element} The rendered TableCell component.
 */
function Column(props: ColumnProps) {
  const { _isheader, _rowdata, header, target } = props;

  // If _isheader is true, render a header cell with the provided header content
  if (_isheader) {
    return (
      <TableCell
        align="center"
        className="font-semibold! bg-[#006666]! text-gray-200! text-sm!"
      >
        {header}
      </TableCell>
    );
  }

  // If _isheader is false, render a data cell with the value of the target property
  return (
    <TableCell
      align="center"
      className={clsx(
        "border border-gray-400 bg-white",
        _rowdata![target] && (_rowdata![target] as number) < 75 ? "text-red-500!" : "",
      )}
    >
      {_rowdata![target] as number || "N/A"}
    </TableCell>
  );
}

export default Column;
