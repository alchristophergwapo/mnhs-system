import Input from "@/src/components/Input";
import Family from "./Family";
import { useFormContext } from "@/src/hooks/useTanstack";
import z from "zod";
import { FieldAsyncValidateOrFn } from "@tanstack/react-form";

/**
 * Component for the family background section of the teacher form.
 * It includes fields for the teacher's family background.
 * @param {ContentProps<UserType>} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 */
function ParentOrGuardian() {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-4 my-2">
      <Family
        title="Father"
        nameExtension
        target="father"
        subtitle="If father's details is not available, put N/A for required fields"
      />
      <Family
        title="Mother"
        nameExtension={false}
        maidenName
        target="mother"
        subtitle="If mother's details is not available, put N/A for required fields"
      />
      <Family
        title="Guardian"
        subtitle="If the student does not have a father or mother or the student is under care of a guardian"
        required={false}
        nameExtension={false}
        target="guardian"
      />
    </div>
  );
}

export default ParentOrGuardian;
