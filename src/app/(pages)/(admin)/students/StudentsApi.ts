import { apiService } from "@/src/store/apiService";
import { AddressType, CitizenshipType, EnrollmentBackgroundType, EnrollmentType, FamilyType, StudentType, UserType } from "@/src/types";

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

// Define the students API service
const studentsApi = apiService.injectEndpoints({
  /**
   * endpoints
   * @param {function} build - The build function provided by apiService
   * @returns {object} - The endpoints object
   * @description The endpoints object
   */
  endpoints: (build) => ({
    getStudents: build.query<GetStudentsApiResponse, GetStudentsApiArg>({
      /**
       * Query function for getting students list.
       * @param {object} parameters - The query parameters.
       * @returns {object} - The query object.
       * @description The query object.
       */
      query: (parameters) => ({
        url: `/api/students`,
        method: "GET",
        params: parameters,
      }),
      providesTags: ["students_list"],
    }),
    createStudent: build.mutation<
      CreateStudentApiResponse,
      CreateStudentApiArg
    >({
      /**
       * Creates a new student.
       * @param {object} student - The student object
       * @returns {object} - The query object
       * @description The query object
       */
      query: (student) => ({
        url: `/api/students`,
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["students_list"],
    }),
    getStudentDetails: build.query<GetStudentDetailsApiResponse, GetStudentDetailsApiArg>({
      query: (studentId) => ({
        url: `/api/students/${studentId}`,
      }),
      providesTags: ["student_details", "students_list"],
    }),
    updateStudent: build.mutation<CreateStudentApiResponse, UpdateStudentApiArg>({
      query: (args) => {
        const { student, studentId } = args;
        return ({
          url: `/api/students/${studentId}`,
          method: "PUT",
          body: student,
        })
      },
    }),
  }),
  overrideExisting: false,
});

export default studentsApi;

/**
 * Exports the useGetStudentsQuery and useCreateStudentMutation hooks
 * useGetStudentsQuery - The useGetStudentsQuery hook derived from studentsApi
 * useCreateStudentMutation - The useCreateStudentMutation hook derived from studentsApi
 * why useGetStudentsQuery and useCreateStudentMutation? use - means to use, GetStudents - is the getStudents function from studentsApi and is a GET request
 * Query - since it is a query built from apiService
 * Mutation - if it is a mutation
 * @returns {object} - The useGetStudentsQuery and useCreateStudentMutation hooks
 */
export const { useGetStudentsQuery, useCreateStudentMutation, useUpdateStudentMutation, useGetStudentDetailsQuery } = studentsApi;

export type StudentApiType = {
  [studentsApi.reducerPath]: ReturnType<typeof studentsApi.reducer>;
};
