import StepLabel from "@mui/material/StepLabel";
import { grey, teal } from "@mui/material/colors";
import { cloneElement, memo } from "react";
import { StepContentStyled } from "./styledComponents";
import { useTheme } from "@mui/material/styles";
import { IconContainerProps } from "@mui/material";

type VerticalStepProps = {
  label: string;
  description?: string;
  icon?: React.ReactNode;
};

/**
 * A component that renders a step with a label, description, and icon.
 * The icon is wrapped in a teal background circle.
 * The label and description are rendered in black text.
 * The label is rendered in a bold font, and the description is rendered in a subtitle2 font.
 * The component is meant to be used within a Stepper component.
 * @param {VerticalStepProps} props - The props for the component.
 * @param {string} props.label - The label for the step.
 * @param {string} [props.description] - The description for the step.
 * @param {React.ReactNode} [props.icon] - The icon for the step.
 * @returns {JSX.Element} - The JSX element for the component.
 */
function VerticalStep(
  props: VerticalStepProps & { active: boolean; completed: boolean },
) {
  const { label, description, icon, active = false, completed = false } = props;
  const theme = useTheme();
  const isDoneOrActive = completed || active;
  const iconComponent = icon
    ? cloneElement(icon as React.ReactElement<IconContainerProps>, {
        className:
          isDoneOrActive && theme.palette.mode === "dark"
            ? "shadow-md shadow-teal-300"
            : "",
      })
    : null;

  return (
    <>
      <StepLabel
        icon={iconComponent}
        sx={{
          "& .MuiSvgIcon-root": {
            background:
              isDoneOrActive && theme.palette.mode === "light"
                ? teal[800]
                : isDoneOrActive && theme.palette.mode === "dark"
                  ? theme.palette.primary.main
                  : grey[500],
            borderRadius: "50%",
            padding: "8px",
            color:
              theme.palette.mode === "dark" && active
                ? grey[900]
                : "white!important",
            height: "40px",
            width: "40px",
          },
          padding: 0,
        }}
      >
        <div className="dark:text-shadow-white! font-bold text-[15px]">
          {label}
        </div>
      </StepLabel>
      <StepContentStyled>{description}</StepContentStyled>
    </>
  );
}

export default memo(VerticalStep);
