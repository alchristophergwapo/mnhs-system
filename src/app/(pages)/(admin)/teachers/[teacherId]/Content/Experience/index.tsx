import { ContentProps } from "@components/Stepper";
import { ExperienceType, UserType } from "../../../_types";
import { MouseEvent, useCallback, useRef } from "react";
import ExperienceDetails from "./ExperienceDetails";
import Button from "@components/Button";
import { PlusOne } from "@mui/icons-material";

/**
 * Component for displaying and editing the teaching experiences of a teacher.
 * It includes a list of experience details which can be edited, added, or removed.
 * @param {ContentProps<UserType>} props - The props for the component
 * @param {UserType} props.inputsData - The current inputs data for the teacher
 * @param {(parentTarget: keyof UserType, field: string, value?: string | any) => void} props.onInputDataChange - The function to call when the value of any input field changes
 * @example
 * <Experience inputsData={inputsData} onInputDataChange={onInputDataChange} />
 */
export default function Experience({
  inputsData,
  onInputDataChange,
}: ContentProps<UserType>) {
  const inputsDataRef = useRef(inputsData);
  inputsDataRef.current = inputsData;

  const experiences = inputsDataRef.current?.experience ?? [
    {} as ExperienceType,
  ];

/**
 * Handles changes to the experience data. If an index is provided, it will update the experience at that index. If no index is provided, it will add a new experience to the end of the array.
 * @param {number} [index] - The index of the experience to update. If not provided, a new experience will be added.
 * @param {ExperienceType} [experience] - The new experience data to update or add. If not provided, an empty object will be used.
 */
  const handleExperienceChange = useCallback((
    index?: number,
    experience?: ExperienceType,
  ) => {
    const newEperience: ExperienceType = experience ?? ({} as ExperienceType);

    const updatedExperiences: ExperienceType[] =
      index === undefined
        ? [...experiences, newEperience]
        : [
            ...experiences.slice(0, index),
            newEperience,
            ...experiences.slice(index + 1),
          ];

    onInputDataChange({
      ...inputsDataRef.current,
      experience: updatedExperiences,
    });
  }, [onInputDataChange, experiences]);

/**
 * Removes an experience from the list of experiences.
 * @param {number} index - The index of the experience to remove.
 */
  const handleRemoveExperience = useCallback((index: number) => {
    
    const updatedExperiences = [...inputsDataRef.current?.experience ?? []];
    updatedExperiences.splice(index, 1);
    
    onInputDataChange({
      ...inputsDataRef.current,
      experience: updatedExperiences,
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 mb-2">
      <div className="text-[16px] font-bold uppercase">Teaching Experience</div>
      {experiences.map((exp, index) => (
        <ExperienceDetails
          key={index}
          experience={exp}
          index={index}
          onExperienceChange={(field?: keyof ExperienceType, value?: string) =>
            handleExperienceChange(index, { ...exp, [field as string]: value })
          }
          onRemoveExperience={(i) => handleRemoveExperience(i)}
        />
      ))}
      <div className="flex flex-row-reverse">
        <Button
          startIcon={<PlusOne />}
          onClick={(e: MouseEvent) => handleExperienceChange()}
        >
          add experience
        </Button>
      </div>
    </div>
  );
}
