import { apiService } from "@/src/store/apiService";

// Set the type of the response data which is an array of TeacherType
export type GetTeachersApiResponse = { teachers: TeacherType[], totalTeachers: number };
// Set the type of the query arguments which is GetTeachersApiArg
export type GetTeachersApiArg = {
  // Add query arguments here
  q: string;
  page: number;
  limit: number;
  type: string;
};

// Set the type of the response data which is TeacherType. This is the data that will be returned from the server when creating a new teacher
export type CreateTeacherApiResponse = TeacherType;

// Set the type of the query arguments which is TeacherType. This is the data that will be sent to the server when creating a new teacher
export type CreateTeacherApiArg = TeacherType;

// Define the types of address
export type AddressType = {
  address: string;
  city: string;
  province: string;
  zipCode: string;
}

// Define the types of benefits
export type BenefitsType = {
  umidIdNumber?: string;
  sssIdNumber?: string;
  pagIbigIdNumber?: string;
  philHealthIdNumber?: string;
  philSysNumber?: string;
  tinNumber?: string;
  agencyEmployeeNumber?: string;
}

// Define the types of teachers data
export type TeacherType = {
  id?: number;
  avatar: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  nameExtension?: string;
  email?: string;
  contactNumber: string;
  gender: "Female" | "Male" | "";
  gradeLevel: string;
  civilStatus: "Single" | "Married" | "Widowed" | "Separated" | "";
  civilStatusOther?: string;
  dateHired?: Date | string;
  dateOfBirth: Date | string;
  placeOfBirth?: string;
  age: number;
  lengthOfService?: number;
  advisorySection?: string;
  subjects?: string[];
  position: string;
  isOjt: boolean;
  height?: number;
  weight?: number;
  bloodType?: string;
  religion?: string;
  nationality?: string;
  address?: AddressType;
  benefits?: BenefitsType;
  citizenship: {
    filipino: boolean;
    dualCitizenship?: boolean;
    dualCitizenshipBy?: "By birth" | "By naturalization" | undefined;
    countryOfDualCitizenship?: string;
  };
};

// Define the teachers API service
const teachersApi = apiService.injectEndpoints({
  /**
   * endpoints
   * @param {function} build - The build function provided by apiService
   * @returns {object} - The endpoints object
   * @description The endpoints object
   */
  endpoints: (build) => ({
    getTeachers: build.query<GetTeachersApiResponse, GetTeachersApiArg>({
      /**
       * Query function for getting teachers list.
       * @param {object} options - The query options.
       * @returns {object} - The query object.
       * @description The query object.
       */
      query: (options) => ({
        url: `/api/teachers`,
        method: "GET",
        params: options,
      }),
      providesTags: ["teachers_list"],
    }),
    createTeacher: build.mutation<
      CreateTeacherApiResponse,
      CreateTeacherApiArg
    >({
      /**
       * Creates a new teacher.
       * @param {object} teacher - The teacher object
       * @returns {object} - The query object
       * @description The query object
       */
      query: (teacher) => ({
        url: `/api/teacher`,
        method: "POST",
        body: teacher,
      }),
      invalidatesTags: ["teachers_list"],
    }),
  }),
  overrideExisting: false,
});

export default teachersApi;

/**
 * Exports the useGetTeachersQuery and useCreateTeacherMutation hooks
 * useGetTeachersQuery - The useGetTeachersQuery hook derived from teachersApi
 * useCreateTeacherMutation - The useCreateTeacherMutation hook derived from teachersApi
 * why useGetTeachersQuery and useCreateTeacherMutation? use - means to use, GetTeachers - is the getTeachers function from teachersApi and is a GET request
 * Query - since it is a query built from apiService
 * Mutation - if it is a mutation
 * @returns {object} - The useGetTeachersQuery and useCreateTeacherMutation hooks
 */
export const { useGetTeachersQuery, useCreateTeacherMutation } = teachersApi;

export type ECommerceApiType = {
  [teachersApi.reducerPath]: ReturnType<typeof teachersApi.reducer>;
};
