import { apiService } from "@store/apiService";
import { PositionType, UserType } from "./_types";

// Set the type of the response data which is an array of UserType
export type GetTeachersApiResponse = {
  teachers: UserType[];
  totalTeachers: number;
};
// Set the type of the query arguments which is GetTeachersApiArg
export type GetTeachersApiArg = {
  // Add query arguments here
  q: string;
  page: number;
  limit: number;
  type: string;
  gradeLvl?: number;
};

// Set the type of the response data which is UserType. This is the data that will be returned from the server when creating a new teacher
export type CreateTeacherApiResponse = UserType;
// Set the type of the query arguments which is UserType. This is the data that will be sent to the server when creating a new teacher
export type CreateTeacherApiArg = UserType;
export type UpdateTeacherApiArg = { teacher: UserType; teacherId: number };

export type GetTeacherDetailsApiResponse = UserType;
export type GetTeacherDetailsApiArg = number;

export type GetPositionsApiResponse = PositionType[];
export type GetPositionsApiArg = { query: string };

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
       * @param {object} parameters - The query parameters.
       * @returns {object} - The query object.
       * @description The query object.
       */
      query: (parameters) => ({
        url: `/api/teachers`,
        method: "GET",
        params: parameters,
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
      query: (teacher: UserType) => ({
        url: `/api/teachers`,
        method: "POST",
        body: teacher,
      }),
      invalidatesTags: ["teachers_list"],
    }),
    getTeacherDetails: build.query<GetTeacherDetailsApiResponse, GetTeacherDetailsApiArg>({
      query: (teacherId) => ({
        url: `/api/teachers/${teacherId}`,
      }),
      providesTags: ["teacher_details", "teachers_list"],
    }),
    updateTeacher: build.mutation<CreateTeacherApiResponse, UpdateTeacherApiArg>({
      query: (args) => {
        const { teacher, teacherId } = args;
        return ({
          url: `/api/teachers/${teacherId}`,
          method: "PUT",
          body: teacher,
        })
      },
    }),
    getPositions: build.query<GetPositionsApiResponse, GetPositionsApiArg>({
      query: (query) => ({
        url: "/api/teachers/positions",
        params: { query },
      }),
      providesTags: ["positions_list"],
    })
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
export const { useGetTeachersQuery, useCreateTeacherMutation, useUpdateTeacherMutation, useGetTeacherDetailsQuery, useGetPositionsQuery } = teachersApi;

export type TeacherApiType = {
  [teachersApi.reducerPath]: ReturnType<typeof teachersApi.reducer>;
};
