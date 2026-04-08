import MuiIcon, { IconProps } from "@mui/material/Icon";

export default function Icon(props: IconProps) {
  const { children, ...otherProps } = props;

  return <MuiIcon {...otherProps}>{children}</MuiIcon>;
}
