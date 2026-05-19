"use client";

import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import { MRT_ActionMenuItem, MRT_RowData, MRT_TableInstance  } from "material-react-table";
import { ReactNode, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import useNavigate from "@hooks/useNavigate";
import { UserType } from "../../_types";

type ActionsColumnProps = {
  row?: MRT_RowData;
  table?: MRT_TableInstance<UserType>;
}

/**
 * A component that renders a row of actions for a table.
 * It accepts a table prop from material-react-table.
 * It renders a popover with a menu list containing two items: Edit and Delete.
 * The Edit item will trigger the onClick function with the key "edit" when clicked.
 * The Delete item will trigger the onClick function with the key "delete" when clicked.
 * @param {ActionsColumnProps} props - The props for the component.
 * @returns {ReactNode} - The JSX element for the component.
 */
export default function ActionsColumn(props: ActionsColumnProps): ReactNode {
  const { row, table } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  /**
   * Handles the click event for the action button.
   * It sets the anchor element for the popover to the element that triggered the event.
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event.
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Closes the popover by setting the anchor element to null.
   * This is called when the popover is closed, either by clicking outside of it or by clicking on the "Edit" or "Delete" items.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="flex flex-row justify-center items-center">
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Icon sx={{ color: theme => theme.palette.mode === 'dark' ? "white": "black" }}>more_vert</Icon>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuList>
          <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
            icon={<Edit />}
            key="edit"
            label="Edit"
            onClick={() => navigate(`/teachers/${row.original.id}`)}
            table={table}
          />
          <MRT_ActionMenuItem
            icon={<Delete />}
            key="delete"
            label="Delete"
            onClick={() => console.info("Delete")}
            table={table}
          />
        </MenuList>
      </Popover>
    </div>
  );
}
