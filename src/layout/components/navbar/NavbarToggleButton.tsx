import Icon from "@/src/components/Icon";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

function NavbarToggleButton(props: IconButtonProps) {
  const { children = <Icon>menu</Icon> } = props;

  return <IconButton>{children}</IconButton>;
}

export default NavbarToggleButton;
