import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { JSX } from "react";
import clsx from "clsx";

type MenuButtonProps = {
  children?: JSX.Element;
  label: string;
  iconPosition?: string;
  className?: string;
};

export default function MenuButton(props: MenuButtonProps) {
  const { children, label, iconPosition = "left", className= "" } = props;

  return (
    <MenuItem className={clsx(className, "flex space-x-2")}>
      {iconPosition === 'left' && children}
      <ListItemText className="text-[12px]">{label}</ListItemText>
      {iconPosition === 'right' && <Typography>{children}</Typography>}
    </MenuItem>
  );
}
