import { apiService } from "@store/apiService";
import { CourseType } from "@types";

export type GetCoursesApiResponse = CourseType[];
export type GetCoursesApiArg = { track: string };

const coursesApi = apiService.injectEndpoints({
    /**
     * endpoints
     * @param {function} build - The build function provided by apiService
     * @returns {object} - The endpoints object
     * @description The endpoints object
     */
    endpoints: (build) => ({
        getCourses: build.query<GetCoursesApiResponse, GetCoursesApiArg>({
            query: (params) => ({
                url: "/api/academics/courses",
                params,
            }),
            providesTags: ["courses_list"],
        }),
    }),
    overrideExisting: false,
});

export default coursesApi;

export const { useGetCoursesQuery } = coursesApi;

export type CoursesApiType = {
    [coursesApi.reducerPath]: ReturnType<typeof coursesApi.reducer>;
};
