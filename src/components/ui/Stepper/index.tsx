import { JSX, memo, ReactNode, useCallback, useRef, useState } from "react";

import MuiStepper, { StepperProps } from "@mui/material/Stepper";
import StepperVerticalStep from "./StepperVerticalStep";
import Step from "@mui/material/Step";
import Divider from "@mui/material/Divider";
import clsx from "clsx";
import StepperNextButton from "./StepperNextButton";
import StepperPreviousButton from "./StepperPreviousButton";
import { StepperConnector } from "./styledComponents";
import { useFormContext } from "@hooks/useTanstack";

export type StepsType<T> = {
  label: string;
  fields?: string[];
  content: () => ReactNode; // Function that returns ReactNode;
  description?: string; // Optional description for the step
  validateData?: () => boolean; // Optional validation function for the step
  icon?: React.ReactNode; // Optional icon for the step
};

type CustomStepperProps<T> = Partial<StepperProps> & {
  // Define any custom props for the Stepper component here
  steps: StepsType<T>[]; // Example custom prop for steps data
  defaultActiveStep?: number; // Optional prop to set the default active step
  isLoading?: boolean; // Optional prop to indicate loading state
  onCancel?: () => void; // Optional callback for cancel action
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
    defaultActiveStep = 0, // Default to the first step if not provided
    isLoading = false,
    onCancel,
    orientation = "vertical", // Default orientation set to vertical
    className,
    ...muiStepperProps
  } = props;
  const [activeStep, setActiveStep] = useState(defaultActiveStep);
  const [isBusy, setIsBusy] = useState(isLoading);
  const form = useFormContext();

  // Use refs for values needed in callbacks to avoid stale closures
  // without adding them as deps (which would recreate the handlers)
  const activeStepRef = useRef(activeStep);
  activeStepRef.current = activeStep;
  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  let stepWithError: number | null = null; // Find the first step with an error

  const isLastStep = activeStep === steps.length - 1;
  const nextLabel = isLastStep ? "Submit" : "Next";

  let divider: React.ReactNode = null;
  if (orientation === "vertical") {
    divider = <Divider orientation="vertical" flexItem />;
  }

  const StepContent = steps[activeStep].content;

  // Click handler for clicking the previous button
  const handleClickPrevious = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }, []);

  // Click handler for clicking the next button
  const handleClickNext = useCallback(async () => {
    setIsBusy(true);
    if (activeStepRef.current === steps.length - 1) {
      await form.handleSubmit();

      setIsBusy(false);
    } else {
      const currentStepFields = steps[activeStepRef.current].fields ?? [];
      for (const field of currentStepFields) {
        const errors = await form.validateField(field as never, "submit");
        if (errors.length > 0) {
          setIsBusy(false);
          stepWithError = activeStepRef.current;
          return; // stop immediately
        }
      }

      setIsBusy(false);
      setActiveStep((prev) => prev + 1);
    }
  }, [steps.length]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        className={clsx(
          "w-full flex justify-center items-start gap-4",
          orientation === "horizontal" ? "flex-col" : "flex-row",
        )}
      >
        <MuiStepper
          activeStep={activeStep}
          orientation={orientation}
          connector={steps.length <= 1 ? null : <StepperConnector />}
          className={clsx("min-w-fit", className)}
          {...muiStepperProps}
        >
          {orientation === "vertical" &&
            stepsRef.current.map((step, index) => (
              <Step key={index}>
                <StepperVerticalStep
                  {...step}
                  active={activeStep === index}
                  completed={activeStep > index}
                />
              </Step>
            ))}
        </MuiStepper>
        {divider}
        <div className="w-full h-full mb-2 flex flex-col">
          <StepContent />
        </div>
      </div>
      <Divider />
      <div className="flex flex-row justify-end mt-2 gap-4">
        <StepperPreviousButton
          onClick={handleClickPrevious}
          isVisible={activeStep > 0}
        />
        <StepperNextButton
          label={nextLabel}
          onClick={handleClickNext}
          loading={isBusy}
        />
      </div>
    </div>
  );
}

// Export the memoized Stepper component
export default memo(Stepper) as <T>(
  props: CustomStepperProps<T>,
) => JSX.Element;
