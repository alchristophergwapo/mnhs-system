import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import MenuList from '@mui/material/MenuList';
import MenuButton from "../MenuButton";
import Icon from "../Icon";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box
        component="button"
        className="flex flex-row space-x-2 items-center cursor-pointer hover:bg-teal-900 rounded-sm px-2 py-1"
        onClick={handleClick}
      >
        <Avatar src="/next.svg" sx={{width: 32, height: 32}} />
        <div className="flex flex-col">
          <div className="font-bold text-sm text-olive-100">Kryzstof A</div>
          <div className="text-[12px] text-olive-100">
            Administrator
          </div>
        </div>
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuList className="py-2">
          <MenuButton label="Profile">
            <Icon fontSize="small">account_circle</Icon>
          </MenuButton>
          <MenuButton label="Logout">
            <Icon fontSize="small" sx={{"&.MuiIcon-root": {fontSize: "20px!important"}}}>logout</Icon>
          </MenuButton>
        </MenuList>
      </Popover>
    </>
  );
}
