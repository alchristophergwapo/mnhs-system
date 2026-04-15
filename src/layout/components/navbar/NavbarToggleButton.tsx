import Icon from "@mui/material/Icon";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

/**
 * A component that wraps the IconButton component from @mui/material.
 * It takes the children prop, which should be a JSX element representing the icon to be displayed.
 * If no children prop is provided, it will default to an Icon component with the "menu" text.
 * It passes any other props to the IconButton component.
 * @param {IconButtonProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 * @example
 * <NavbarToggleButton>
 *   <Icon>menu</Icon>
 * </NavbarToggleButton>
 */
function NavbarToggleButton(props: IconButtonProps) {
  const { children = <Icon>menu</Icon> } = props;

  return <IconButton>{children}</IconButton>;
}

export default NavbarToggleButton;
