import Button, { ButtonProps } from "@mui/material/Button";
import ArrowBack from "@mui/icons-material/ArrowBack";

type PreviousButtonProps = Partial<ButtonProps> & {
    isVisible: boolean;
};

/**
 * A button component that renders a "Previous" button with a white background and
 * an arrow back icon at the start.
 * It accepts an onClick event handler and a isVisible boolean prop.
 * If isVisible is false, the button is not rendered.
 * @param {PreviousButtonProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 */
export default function PreviousButton(props: PreviousButtonProps) {
  const { onClick, isVisible } = props;

  if (!isVisible) return null;

  return (
    <Button
      variant="contained"
      color="inherit"
      sx={{ color: "white!important" }}
      startIcon={
        <ArrowBack
          sx={{
            color: "white!important",
            fontSize: "18px!important",
          }}
        />
      }
      onClick={onClick}
    >
      Previous
    </Button>
  );
}
