import MuiButton, { ButtonProps } from "@mui/material/Button";
import { memo } from "react";

/**
 * A button component that renders a button
 * @param {ButtonProps} props - The props for the component.
 * @param {string} props.label - The label for the button.
 * @param {function} props.onClick - The click event handler for the button.
 * @returns {JSX.Element} - The JSX element for the component.
 */
function Button({ children, sx = {}, ...props }: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      sx={{
        textTransform: "capitalize",
        color: "white",
        "& .MuiSvgIcon-root": {
          color: "white!important",
          fontSize: "17px",
        },
        ...sx,
      }}
      disableFocusRipple
      disableRipple
      {...props}
    >
      {children}
    </MuiButton>
  );
}

export default memo(Button);
