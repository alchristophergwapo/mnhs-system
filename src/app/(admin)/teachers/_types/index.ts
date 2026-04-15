import { TextFieldProps } from "@mui/material";
import { AddressType, BenefitsType, TeacherType } from "../TeachersApi";

export type InputProps = Partial<TextFieldProps> & {
  [key: string]: any;
  onValueChange: (
    key: keyof TeacherType | keyof BenefitsType | keyof AddressType,
    value?:
      | TeacherType[keyof TeacherType]
      | BenefitsType[keyof BenefitsType]
      | AddressType[keyof AddressType],
  ) => void; // (key: keyof TeacherType | keyof BenefitsType | keyof AddressType) => void;
  target: keyof TeacherType | keyof BenefitsType | keyof AddressType;
};
