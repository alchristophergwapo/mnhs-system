import { ContentProps } from "@/src/components/Stepper";
import InputField from "../InputField";
import { NameInputType, UserType } from "../../../_types";
import NameInput from "../NameInput";
import { useCallback } from "react";
import Family from "./Family";

/**
 * Component for inputting the teacher's spouse information
 * @param {Partial<ContentProps<UserType>> & { handleChange: (parentTarget: keyof UserType, field: string, value?: string | any) => void }} props - The props for the component
 * @param {UserType} props.inputsData - The current inputs data for the teacher
 * @param {(parentTarget: keyof UserType, field: string, value?: string | any) => void} props.handleChange - The function to call when the value of any input field changes
 * @returns {JSX.Element} - The JSX element for the component
 * @example
 * const inputsData = {
 *   spouse: {
 *     firstName: "John",
 *     lastName: "Doe",
 *     middleName: "Smith",
 *     nameExtension: "Jr.",
 *     occupation: "Engineer",
 *     employerOrBusinessName: "ABC Company",
 *     businessAddress: "123 Street 1",
 *     telephoneNumber: "123-4567-8900",
 *   },
 * };
 * <Spouse inputsData={inputsData} handleChange={handleValueChange} />
 */
export default function Spouse({
  inputsData,
  handleChange,
}: Partial<ContentProps<UserType>> & {
  handleChange: (
    parentTarget: keyof UserType,
    field: string,
    value?: string | any,
  ) => void;
}) {
  const spouse = inputsData?.spouse ?? {};
  const handleChangeField = useCallback(
    (field: string, value: string | any) => {
      handleChange("spouse", field, value);
    },
    [handleChange],
  );

  return (
    <>
      <Family
        title="Spouse"
        family={spouse as NameInputType}
        onChange={handleChangeField}
      />
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-4">
        <InputField
          target="occupation"
          label="Occupation"
          value={spouse.occupation}
          onValueChange={handleChangeField}
        />
        <InputField
          target="employerOrBusinessName"
          label="Employer/Business Name"
          value={spouse.employerOrBusinessName}
          onValueChange={handleChangeField}
        />
        <InputField
          target="businessAddress"
          label="Business Address"
          value={spouse.businessAddress}
          onValueChange={handleChangeField}
        />
        <InputField
          target="telephoneNumber"
          label="Telephone No."
          value={spouse.telephoneNumber}
          onValueChange={handleChangeField}
        />
      </div>
    </>
  );
}
