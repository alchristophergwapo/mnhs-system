import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import { MRT_ActionMenuItem } from "material-react-table";
import { ReactNode, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";

export default function ActionsColumn(props): ReactNode {
  const { table } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Icon sx={{ color: "black" }}>more_vert</Icon>
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
            onClick={() => console.info("Edit")}
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
    </>
  );
}
