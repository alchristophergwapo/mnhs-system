import {
  AddressType,
  CitizenshipType,
  EnrollmentBackgroundType,
  EnrollmentType,
  FamilyType,
  StudentType,
  UserType,
} from "@types";

export type StudentDataType = {
  user: UserType;
  permanentAddress: AddressType;
  residentialAddress?: AddressType;
  student: StudentType;
  citizenship: CitizenshipType;
  father: FamilyType;
  mother: FamilyType;
  guardian?: FamilyType;
  enrollment: EnrollmentType;
  enrollmentBackground?: EnrollmentBackgroundType;
  isSeniorHigh: boolean;
  isTransferee: boolean;
};

export type AddressInputProps = {
  required?: boolean;
  target: "permanentAddress" | "temporaryAddress";
};

export type FamilyInputProps = {
  required?: boolean;
  target: "father" | "mother" | "guardian";
};

export type FamilyProps = {
  target: "father" | "mother" | "guardian";
  nameExtension?: boolean;
  maidenName?: boolean;
  title: string;
  subtitle?: string;
  required?: boolean;
};
