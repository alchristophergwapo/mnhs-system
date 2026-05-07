import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import MenuList from "@mui/material/MenuList";
import MenuButton from "../MenuButton";
import Icon from "@mui/material/Icon";

/**
 * A component that renders a user menu with some options like profile and logout. You can add more options to the menu.
 * It uses a Popover from @mui/material to render the menu.
 * The component is a button that contains an avatar and the user's name and role.
 * When the button is clicked, the menu is rendered.
 */
export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box
        component="button"
        className="flex flex-row space-x-2 items-center cursor-pointer hover:text-zinc-200 hover:bg-teal-700 rounded-sm px-2 py-1"
        onClick={handleClick}
      >
        <Avatar sx={{ width: 32, height: 32 }} >K</Avatar>
        <div className="flex flex-col">
          <div className="font-bold text-sm">Kryzstof A</div>
          <div className="text-[12px]">Administrator</div>
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
            <Icon
              fontSize="small"
              sx={{ "&.MuiIcon-root": { fontSize: "20px!important" } }}
            >
              logout
            </Icon>
          </MenuButton>
        </MenuList>
      </Popover>
    </>
  );
}
