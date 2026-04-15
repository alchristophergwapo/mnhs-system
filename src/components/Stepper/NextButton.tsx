import ArrowForward from "@mui/icons-material/ArrowForward";
import Button, { ButtonProps } from "@mui/material/Button";

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
export default function NextButton(props: NextButtonProps) {
  const { label, onClick } = props;

  return (
    <Button
      variant="contained"
      sx={{ color: "white" }}
      endIcon={
        <ArrowForward
          sx={{ color: "white!important", fontSize: "18px!important" }}
        />
      }
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
