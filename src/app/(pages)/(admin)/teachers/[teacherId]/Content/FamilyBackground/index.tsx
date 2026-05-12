import { ContentProps } from "@components/Stepper";
import { NameInputType, UserType } from "../../../_types";
import { useCallback, useRef } from "react";
import Spouse from "./Spouse";
import Children, { Child } from "./Children";
import Family from "./Family";

/**
 * Component for the family background section of the teacher form.
 * It includes fields for the teacher's family background.
 * @param {ContentProps<UserType>} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 */
export default function FamilyBackground({
  inputsData,
  onInputDataChange,
}: ContentProps<UserType>) {
  const inputsDataRef = useRef(inputsData);
  inputsDataRef.current = inputsData;

  /**
   * Change handler for inputs that do not have subfields
   * @param {string} parentTarget - The parent target of the field to change.
   * @param {string} field - The field to change.
   * @param {string | any} value - The value to set the field to.
   */
  const handleChange = useCallback(
    (
      parentTarget: keyof UserType,
      field: NameInputType[keyof NameInputType],
      value?: string | "",
    ) => {
      const family = inputsDataRef.current[parentTarget];

      onInputDataChange?.({
        ...inputsDataRef.current,
        [parentTarget]: {
          ...(family as Object),
          [field as string]: value,
        },
      });
    },
    [onInputDataChange],
  );

  const handleModifyChildren = useCallback(
    (children: Child[]) => {
      onInputDataChange?.({
        ...inputsDataRef.current,
        children,
      });
    },
    [onInputDataChange],
  );

  return (
    <div className="flex flex-col gap-4 mb-2">
      <Spouse inputsData={inputsData} handleChange={handleChange} />
      <Children
        value={inputsData.children}
        handleValueChange={handleModifyChildren}
      />
      <Family
        title="Father"
        family={inputsData?.father as NameInputType}
        onChange={(
          field: NameInputType[keyof NameInputType],
          value: string | "",
        ) => handleChange("father", field, value)}
      />
      <Family
        title="Mother"
        family={inputsData?.mother as NameInputType}
        onChange={(
          field: NameInputType[keyof NameInputType],
          value: string | "",
        ) => handleChange("mother", field, value)}
      />
    </div>
  );
}
