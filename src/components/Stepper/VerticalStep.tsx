import StepLabel from "@mui/material/StepLabel";
import { teal } from "@mui/material/colors";
import { memo } from "react";
import { StepContentStyled } from "./styledComponents";

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
function VerticalStep(props: VerticalStepProps & { active: boolean, completed: boolean }) {
  const { label, description, icon, active = false, completed = false } = props;

  return (
    <>
      <StepLabel
        icon={icon}
        sx={{
          "& .MuiSvgIcon-root": {
            background: active || completed ? teal[800] : "gray",
            borderRadius: "50%",
            padding: "8px",
            color: "white!important",
            height: "40px",
            width: "40px",
          },
          padding: 0,
        }}
      >
        <div className="text-black font-bold text-[15px]">{label}</div>
      </StepLabel>
      <StepContentStyled>{description}</StepContentStyled>
    </>
  );
}

export default memo(VerticalStep);
