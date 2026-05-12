import { ContentProps } from "@components/Stepper";
import { EducationsType, UserType } from "../../../_types";
import Studies from "./Studies";
import { useCallback, useMemo, useRef } from "react";

/**
 * Component for inputting the educational background of a teacher.
 * It includes fields for the elementary, secondary, vocational, college, and graduate studies.
 * @param {ContentProps<UserType>} props - The props for the component
 * @param {UserType} props.inputsData - The current inputs data for the teacher
 * @param {(parentTarget: keyof UserType, field: string, value?: string) => void} props.onInputDataChange - The function to call when the value of any input field changes
 * @example
 * <EducationalBackground inputsData={inputsData} onInputDataChange={onInputDataChange} />
 */
export default function EducationalBackground({
  inputsData,
  onInputDataChange,
}: ContentProps<UserType>) {
  const inputsDataRef = useRef(inputsData);
  inputsDataRef.current = inputsData;

  // Change handler for education details inputs. We use useCallback to memoize the handler
  const handleEducationDetailsChange = useCallback(
    (
      educationType: keyof UserType["education"],
      field: string,
      value?: string,
    ) => {
      const educations = inputsDataRef.current?.education ?? {};
      const education = educations[educationType]
        ? educations[educationType]
        : {};

      const newEducations = {
        ...educations,
        [educationType]: {
          ...education,
          [field]: value,
        },
      };
      onInputDataChange({
        ...inputsDataRef.current,
        education: newEducations,
      });
    },
    [onInputDataChange],
  );

  // List of educations to display. We use useMemo to memoize the list avoiding unnecessary re-renders
  const educations: { id: keyof EducationsType; title: string }[] = useMemo(() => [
    { id: "elementary", title: "Elementary" },
    { id: "secondary", title: "Secondary" },
    { id: "vocational", title: "Vocational/Trade Course" },
    { id: "college", title: "College" },
    { id: "graduate", title: "Graduate Studies" },
  ], []);

  return (
    <div className="flex flex-col gap-4 mb-2">
      {educations.map(
        (
          education: { id: keyof EducationsType; title: string },
          index: number,
        ) => (
          <Studies
            key={index}
            title={education.title}
            education={
              inputsData.education
                ? inputsData.education[education.id]
                : ({} as EducationsType[keyof EducationsType])
            }
            onEducationDetailsChange={(field: string, value: string | "") =>
              handleEducationDetailsChange(
                education.id as keyof UserType["education"],
                field,
                value,
              )
            }
          />
        ),
      )}
    </div>
  );
}
