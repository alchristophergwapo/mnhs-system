import { ContentProps } from "@/src/components/Stepper";
import { TeacherType } from "../../../TeachersApi";
import PositionApplying from "./PositionApplying";
import InputField from "../InputField";
import Gender from "./BirthRelatedInputs/Gender";
import CivilStatus from "./BirthRelatedInputs/CivilStatus";
import Citizenship from "./BirthRelatedInputs/Citizenship";
import { useCallback, useRef } from "react";

/**
 * Component for the personal information section of the teacher form.
 * It includes fields for the teacher's position, last name, first name, middle name, name extension, date of birth, place of birth, gender, civil status, citizenship, height, weight, blood type, and benefits.
 * @param {ContentProps<TeacherType>} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 */
export default function PositionAndPersonalInformation(
  props: ContentProps<TeacherType>,
) {
  const { inputsData, onInputDataChange } = props;
  const inputsDataRef = useRef(inputsData);
  inputsDataRef.current = inputsData;

  // Change handler for inputs that do not have subfields
  const handleChange = useCallback(
    (field: string | any, value?: string | any) =>
      onInputDataChange?.({
        ...inputsDataRef.current,
        [field]: value,
      }),
    [onInputDataChange],
  );

  // Change handler for benefits
  const handleChangeBenefits = useCallback(
    (field: string | any, value?: string | any) =>
      onInputDataChange?.({
        ...inputsDataRef.current,
        benefits: { ...inputsDataRef.current?.benefits, [field]: value },
      }),
    [onInputDataChange],
  );

  return (
    <div className="flex flex-col gap-4">
      <PositionApplying
        target="position"
        value={inputsData?.position || ""}
        onValueChange={handleChange}
      />
      <div className="text-[16px] font-bold uppercase">
        Personal Information
      </div>
      <div className="grid grid-flow-row grid-cols-1 xl:grid-cols-2 gap-4">
        <InputField
          target="lastName"
          value={inputsData?.lastName}
          onValueChange={handleChange}
          label="Last name"
          required
        />
        <InputField
          target="firstName"
          value={inputsData?.firstName}
          onValueChange={handleChange}
          label="First name"
          required
        />
      </div>
      <div className="grid grid-flow-row grid-cols-2 gap-4">
        <InputField
          target="middleName"
          value={inputsData?.middleName}
          onValueChange={handleChange}
          label="Middle name"
        />
        <InputField
          target="nameExtension"
          value={inputsData?.nameExtension}
          onValueChange={handleChange}
          label="Name extension (Jr., Sr.)"
        />
      </div>
      <InputField
        target="dateOfBirth"
        value={inputsData?.dateOfBirth}
        onValueChange={handleChange}
        label="Date of Birth"
        type="date"
        slotProps={{ inputLabel: { shrink: true } }}
        required
        sx={{ width: "49%" }}
      />
      <InputField
        target="placeOfBirth"
        value={inputsData?.placeOfBirth}
        onValueChange={handleChange}
        label="Place of Birth"
      />
      <div className="flex flex-col lg:flex-row gap-4">
        <Gender
          target="gender"
          value={inputsData?.gender}
          onValueChange={handleChange}
        />
        <CivilStatus
          target="civilStatus"
          value={inputsData?.civilStatus}
          civilStatusOther={inputsData?.civilStatusOther || ""}
          onValueChange={handleChange}
        />
      </div>
      <Citizenship
        value={
          inputsData?.citizenship as {
            filipino: boolean;
            dualCitizenship?: boolean | undefined;
            dualCitizenshipBy?: "By birth" | "By naturalization" | undefined;
            countryOfDualCitizenship?: string | undefined;
          }
        }
        onValueChange={handleChange}
      />
      <div className="flex flex-row gap-4 mb-2">
        <InputField
          target="height"
          value={inputsData?.height}
          onValueChange={handleChange}
          label="Height"
        />
        <InputField
          target="weight"
          value={inputsData?.weight}
          onValueChange={handleChange}
          label="Weight"
        />
        <InputField
          target="bloodType"
          value={inputsData?.bloodType}
          onValueChange={handleChange}
          label="Blood Type"
        />
      </div>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <InputField
          target="umidIdNumber"
          value={inputsData?.benefits?.umidIdNumber}
          onValueChange={handleChangeBenefits}
          label="UMID ID No."
        />
        <InputField
          target="pagIbigIdNumber"
          value={inputsData?.benefits?.pagIbigIdNumber}
          onValueChange={handleChangeBenefits}
          label="Pag-Ibig ID No."
        />
        <InputField
          target="philHealthIdNumber"
          value={inputsData?.benefits?.philHealthIdNumber}
          onValueChange={handleChangeBenefits}
          label="PhilHealth ID No."
        />
        <InputField
          target="philSysNumber"
          value={inputsData?.benefits?.philSysNumber}
          onValueChange={handleChangeBenefits}
          label="PhilSys No."
        />
        <InputField
          target="tinNumber"
          value={inputsData?.benefits?.tinNumber}
          onValueChange={handleChangeBenefits}
          label="TIN No."
        />
        <InputField
          target="agencyEmployeeNumber"
          value={inputsData?.benefits?.agencyEmployeeNumber}
          onValueChange={handleChangeBenefits}
          label="Agency Employee No."
        />
      </div>
    </div>
  );
}
