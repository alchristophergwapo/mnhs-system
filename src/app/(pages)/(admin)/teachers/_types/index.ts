import { TextFieldProps } from "@mui/material";

export type InputProps = Partial<TextFieldProps> & {
  [key: string]: unknown;
  errors: {message: string}[]
};

type GradeLevelType = {
  id: number;
  name: string;
  gradeLevelNumber: number;
}

export type StudentType = {
  id?: number;
  sectionId?: number;
  userId?: number;
  gradeLevelId?: number;
  gradeLevel?: GradeLevelType;
}

export type AddressType = {
  id?: number;
  houseNumber?: string;
  street?: string;
  subdivision?: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
};

// Define the types of address

type CitizenshipType = {
  filipino: boolean;
  dualCitizenship?: boolean;
  dualCitizenshipBy?: "BY_BIRTH" | "BY_NATURALIZATION" | undefined;
  countryOfDualCitizenship?: string;
};

export type FamilyType = {
  firstName: string;
  middleName?: string;
  lastName: string;
  nameExtension?: string;
  occupation?: string;
  telephoneNumber?: string;
  maidenName?: string;
};

export type EducationType = {
  schoolName: string;
  degree?: string;
  from: Date | string;
  to: Date | string;
  highestLevel?: number;
  yearGraduated?: number;
};

export type EducationsType = {
  elementary?: EducationType;
  secondary?: EducationType;
  college?: EducationType;
  vocational?: EducationType;
  graduate?: EducationType;
};

export type ExperienceType = {
  employerName: string;
  employerContactNumber: string;
  supervisorName: string;
  supervisorContactNumber: string;
  position: string;
  from: Date | string;
  to: Date | string;
  address: string;
  salary: number;
  reasonForLeaving: string;
}

export type PositionType = {
  id?: number;
  name: string;
}

// Define the types of teachers data
export type UserType = {
  id?: number;
  avatar: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  nameExtension?: string;
  email?: string;
  contactNumber: string;
  telephoneNumber?: string;
  motherTongue?: string;
  belongsToIP?: boolean;
  IPCommunity?: string;
  gender: "FEMALE" | "MALE" | "";
  gradeLevelId: number | null;
  civilStatus: "SINGLE" | "MARRIED" | "WIDOWED" | "SEPARATED" | "";
  civilStatusOther?: string;
  dateHired?: Date | string;
  dateOfBirth: Date | string;
  placeOfBirth?: string;
  advisorySection?: string;
  subjects?: string[];
  positionId?: PositionType["id"] | undefined;
  position?: PositionType;
  licenseNumber: string;
  licenseExpiryDate: Date | string;
  isOjt: boolean;
  height?: number;
  weight?: number;
  bloodType?: string;
  religion?: string;
  nationality?: string;
  residentialAddress?: AddressType;
  residentialAddressId?: number;
  permanentAddress: AddressType;
  permanentAddressId?: number;
  citizenship: CitizenshipType;
  citizenshipId?: number;
  student: StudentType;
};

export type NameInputType = {
  firstName: string;
  lastName: string;
  middleName?: string;
  nameExtension?: string;
};
