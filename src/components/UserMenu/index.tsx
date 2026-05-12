import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { useContext, useState } from "react";
import MenuList from "@mui/material/MenuList";
import MenuButton from "../MenuButton";
import Icon from "@mui/material/Icon";
import AppContext from "@/src/contexts/AppContext";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

/**
 * A component that renders a user menu with some options like profile and logout. You can add more options to the menu.
 * It uses a Popover from @mui/material to render the menu.
 * The component is a button that contains an avatar and the user's name and role.
 * When the button is clicked, the menu is rendered.
 */
export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { user } = useContext(AppContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    await signOut();
    setAnchorEl(null);
    redirect('/auth/login');
  }

  return (
    <>
      <Box
        component="button"
        className="flex flex-row space-x-2 items-center cursor-pointer hover:text-zinc-200 hover:bg-teal-700 rounded-sm px-2 py-1"
        onClick={handleClick}
      >
        {user?.avatar ? (
          <Avatar src={user.avatar} alt="Profile picture" />
        ) : (
          <Avatar sx={{ width: 32, height: 32 }}>{String(user?.firstName).charAt(0)}</Avatar>
        )}
        <div className="flex flex-col">
          <div className="font-bold text-sm">
            {user?.firstName} {user?.lastName}
          </div>
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
          <MenuButton label="Logout" onClick={handleLogout}>
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
