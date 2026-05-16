import ArrowForward from "@mui/icons-material/ArrowForward";
import { ButtonProps } from "@mui/material/Button";
import { memo } from "react";
import Button from "../Button";

type NextButtonProps = ButtonProps & {
  label: string;
};

/**
 * A button component that renders a "Next" button with a white background and
 * an arrow forward icon at the end.
 * @param {NextButtonProps} props - The props for the component.
 * @param {string} props.label - The label for the button.
 * @param {function} props.onClick - The click event handler for the button.
 * @returns {JSX.Element} - The JSX element for the component.
 */
function NextButton(props: NextButtonProps) {
  const { label, onClick, ...rest } = props;

  return (
    <Button
      sx={{ color: "white", "& MuiButton-root.Mui-loading": { 
        backgroundColor: "rgba(0, 0, 0, 0.5)!important",
        color: "gray",
       }}}
      endIcon={
        <ArrowForward
          sx={{ color: "white!important", fontSize: "18px!important" }}
          className="dark:text-black!"
        />
      }
      onClick={onClick}
      {...rest}
    >
      {label}
    </Button>
  );
}

export default memo(NextButton);
