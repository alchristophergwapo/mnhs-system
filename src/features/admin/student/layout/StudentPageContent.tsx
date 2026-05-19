import Stepper from "@components/ui/Stepper";
import Typography from "@mui/material/Typography";
import { getSteps } from "./steps";
import { SharedPropsType } from "@components/layouts/PageCardedWrapper";
import { StudentDataType } from "../types/student.types";

/**
 * Content component that renders a form with a stepper navigation
 * @returns {JSX.Element} The rendered component with form instructions and stepper
 */
function Content({isLoading}: Partial<SharedPropsType<StudentDataType>>) {
  // Get the steps for the stepper component
  const stepperSteps = getSteps();

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      {/* Container for form instructions */}
      <div className="flex flex-col mb-2">
        <Typography>Please fill out the student information form.</Typography>
        <Typography>
          Fields marked with an asterisk (*) are required.
        </Typography>
      </div>
      {/* Stepper component for form navigation */}
      <Stepper steps={stepperSteps} defaultActiveStep={0} />
    </div>
  );
}

export default Content;
