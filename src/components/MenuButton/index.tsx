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

/**
 * A component that renders a MenuItem with a label and an optional icon.
 * The icon can be positioned on the left or right side of the label.
 * The component also accepts a className prop to style the MenuItem.
 * @param {MenuButtonProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 * @example
 * <MenuButton label="Home" iconPosition="left">
 *   <HomeIcon />
 * </MenuButton>
 */
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
