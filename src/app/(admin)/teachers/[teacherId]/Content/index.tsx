import Image from "next/image";
import Typography from "@mui/material/Typography";
import Stepper from "@/src/components/Stepper";
import getFormSteps from "./steps";
import { JSX, useCallback, useMemo, useRef, useState } from "react";
import { TeacherType } from "../../TeachersApi";

/**
 * Component for the teacher form content.
 * It includes a form with fields for the teacher's personal information, educational background, and other relevant details.
 * The form is divided into steps, and each step has its own set of fields.
 * The component also includes a submit button that triggers the form submission logic.
 * @return {JSX.Element} - The JSX element for the component.
 */
function Content(): JSX.Element {
  const defaultInputData: TeacherType = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    gradeLevel: "",
    dateOfBirth: "",
    age: 0,
    gender: "",
    civilStatus: "",
    civilStatusOther: "",
    dateHired: "",
    lengthOfService: 0,
    avatar: "",
    subjects: [],
    advisorySection: "",
    position: "",
    isOjt: false,
    address: {
      address: "",
      city: "",
      province: "",
      zipCode: "",
    },
    benefits: {
      umidIdNumber: "",
    },
    citizenship: {
      filipino: false,
    },
  };

  const [inputsData, setInputsData] = useState(defaultInputData);
  const inputsDataRef = useRef(inputsData); // Create a mutable ref to store the current inputsData and prevent re-renders
  inputsDataRef.current = inputsData; // Update the mutable ref with the current inputsData

  // Create a memoized version of the form steps
  const stepperSteps = useMemo(() => getFormSteps(), []);

  // Handle input data changes and update the state. We use useCallback to prevent unnecessary re-renders
  const handleInputDataChange = useCallback((data: TeacherType) => {
    const updated = { ...inputsDataRef.current, ...data };
    setInputsData(updated);
  }, []);

  // Handle form submission.
  const handleFormSubmit = useCallback((data: TeacherType) => {
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
          width={340}
          height={340}
          className="rounded-2xl"
          loading="lazy"
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
          inputsData={inputsData}
          onInputDataChange={handleInputDataChange}
          onSubmitData={handleFormSubmit}
        />
      </div>
    </div>
  );
}

export default Content;
