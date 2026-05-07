import Image from "next/image";
import Typography from "@mui/material/Typography";
import Stepper from "@/src/components/Stepper";
import getFormSteps from "./steps";
import { JSX, useCallback, useMemo, useRef } from "react";
import { UserType } from "../../_types";

/**
 * Component for the teacher form content.
 * It includes a form with fields for the teacher's personal information, educational background, and other relevant details.
 * The form is divided into steps, and each step has its own set of fields.
 * The component also includes a submit button that triggers the form submission logic.
 * @return {JSX.Element} - The JSX element for the component.
 */
function Content(): JSX.Element {
  const inputsDataRef = useRef({} as UserType); // Create a mutable ref to store the current inputsData and prevent re-renders
  inputsDataRef.current = {} as UserType; // Update the mutable ref with the current inputsData

  // Create a memoized version of the form steps
  const stepperSteps = useMemo(() => getFormSteps(), []);

  // Handle input data changes and update the state. We use useCallback to prevent unnecessary re-renders
  const handleInputDataChange = useCallback((data: UserType) => {
    // onInputDataChange(data);
  }, []);

  // Handle form submission.
  const handleFormSubmit = useCallback((data: UserType) => {
    try {
      // Handle form submission logic here
    } catch (error) {
      console.error("Unhandled exception:", error);
    }
  }, []);

  return (
    <div className="w-full px-8 py-6">
      <div className="w-full flex flex-row justify-center items-center gap-12">
        <Image
          src={"/assets/images/teacher.svg"}
          alt="teacher svg"
          width={300}
          height={300}
          className="rounded-2xl"
          loading="eager"
        />
        <div className="w-full sm:w-2/6 flex flex-col gap-4">
          <Typography
            variant="h5"
            className="uppercase"
            sx={{ fontWeight: "bold" }}
          >
            Teacher Application
          </Typography>
          <Typography variant="body1">
            We are excited to have you apply! Together we can make a difference
            in the lives of our students.
          </Typography>
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <Stepper
          steps={stepperSteps}
          onSubmitData={handleFormSubmit}
          defaultActiveStep={0}
        />
      </div>
    </div>
  );
}

export default Content;
