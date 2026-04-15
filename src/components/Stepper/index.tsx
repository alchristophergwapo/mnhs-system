import { JSX, memo, ReactNode, useCallback, useMemo, useState } from "react";

import MuiStepper, { StepperProps } from "@mui/material/Stepper";
import VerticalStep from "./VerticalStep";
import Step from "@mui/material/Step";
import Divider from "@mui/material/Divider";
import clsx from "clsx";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";

export type ContentProps<T> = {
  inputsData: T;
  onInputDataChange: (data: T) => void;
};

export type StepsType<T> = {
  label: string;
  content: (props: ContentProps<T>) => ReactNode; // Function that returns ReactNode;
  description?: string; // Optional description for the step
  validateData?: () => boolean; // Optional validation function for the step
  icon?: React.ReactNode; // Optional icon for the step
};

type CustomStepperProps<T> = Partial<StepperProps> & {
  // Define any custom props for the Stepper component here
  steps: StepsType<T>[]; // Example custom prop for steps data
  inputsData: T; // Example custom prop for input data across steps
  onInputDataChange: (data: T) => void; // Optional callback for input data changes
  defaultActiveStep?: number; // Optional prop to set the default active step
  isLoading?: boolean; // Optional prop to indicate loading state
  onCancel?: () => void; // Optional callback for cancel action
  onSubmitData: (data: T) => void | Promise<void>; // Callback for submit action with collected data
};

/**
 * A custom Stepper component that allows for dynamic steps and input data to be passed in.
 * The Stepper component takes in an array of steps, each containing a label, content function, description, icon, and validation function.
 * It also takes in input data that is passed to each step's content function, and an optional callback function to handle input data changes.
 * The component also takes in a default active step index, an optional loading state indicator, an optional cancel callback, and an optional submit callback function.
 * The component is customizable with the orientation prop set to either "vertical" or "horizontal", and the className prop can be used to add additional CSS classes to the component.
 * The component returns a JSX element containing the Stepper, with the current step content rendered below the Stepper.
 */
function Stepper<T>(props: CustomStepperProps<T>) {
  const {
    steps,
    inputsData,
    onInputDataChange,
    defaultActiveStep = 0, // Default to the first step if not provided
    isLoading = false,
    onCancel,
    onSubmitData,
    orientation = "vertical", // Default orientation set to vertical
    className,
    ...muiStepperProps
  } = props;
  const [activeStep, setActiveStep] = useState(defaultActiveStep);

  let divider: React.ReactNode = null;
  if (orientation === "vertical") {
    divider = <Divider orientation="vertical" flexItem />;
  }

  // Pass the inputsData and onInputDataChange to the current step's content
  let currentStepContent: ReactNode = steps[activeStep].content({
    inputsData,
    onInputDataChange,
  });

  // Click handler for clicking the previous button
  const handleClickPrevious = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }, []);

  // Click handler for clicking the next button
  const handleClickNext = useCallback(() => {
    activeStep === steps.length - 1
      ? onSubmitData(inputsData)
      : setActiveStep((prev) => prev + 1);
  }, [activeStep, steps.length, onSubmitData]);

  return (
    <div
      className={clsx(
        "w-full flex justify-center items-start gap-4",
        orientation === "horizontal" ? "flex-col" : "flex-row",
      )}
    >
      <MuiStepper
        activeStep={activeStep}
        orientation={orientation}
        connector={steps.length <= 1 ? null : undefined}
        {...muiStepperProps}
      >
        {orientation === "vertical" &&
          steps.map((step, index) => (
            <Step key={index}>
              <VerticalStep {...step} />
            </Step>
          ))}
      </MuiStepper>
      {divider}
      <div className="w-full mb-2 flex flex-col justify-between">
        <div>{currentStepContent}</div>
        <div>
          <Divider />
          <div className="flex flex-row justify-end mt-2 gap-4">
            <PreviousButton
              onClick={handleClickPrevious}
              isVisible={activeStep > 0}
            />
            <NextButton
              label={activeStep === steps.length - 1 ? "Submit" : "Next"}
              onClick={handleClickNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the memoized Stepper component
export default memo(Stepper) as <T>(
  props: CustomStepperProps<T>,
) => JSX.Element;
