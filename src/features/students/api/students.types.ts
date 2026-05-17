import { AddressType, CitizenshipType, EnrollmentBackgroundType, EnrollmentType, FamilyType, StudentType, UserType } from "@types";

// Set the type of the response data which is an array of UserType
export type GetStudentsApiResponse = {
  students: UserType[];
  totalStudents: number;
};
// Set the type of the query arguments which is GetStudentsApiArg
export type GetStudentsApiArg = {
  // Add query arguments here
  q: string;
  page: number;
  limit: number;
  gradeLvl?: number;
};

// Set the type of the response data which is UserType. This is the data that will be returned from the server when creating a new student
export type CreateStudentApiResponse = UserType;
// Set the type of the query arguments which is UserType. This is the data that will be sent to the server when creating a new student
export type CreateStudentApiArg = {
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
};
export type UpdateStudentApiArg = { student: UserType; studentId: number };

export type GetStudentDetailsApiResponse = CreateStudentApiArg;
export type GetStudentDetailsApiArg = number;