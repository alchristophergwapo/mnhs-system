import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { teal } from "@mui/material/colors";

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
export default function VerticalStep(props: VerticalStepProps) {
  const { label, description, icon } = props;

  return (
    <StepLabel
      icon={icon}
      sx={{
        "& .MuiSvgIcon-root": {
          background: teal[800],
          borderRadius: "50%",
          padding: "8px",
          color: "white!important",
          height: "40px",
          width: "40px",
        },
        padding: 0,
      }}
    >
      <div className="text-black font-bold text-[16px]">{label}</div>
      <Typography variant="subtitle2" className="text-black">
        {description}
      </Typography>
    </StepLabel>
  );
}
