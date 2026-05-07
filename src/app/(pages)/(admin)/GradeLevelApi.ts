import { apiService } from "@/src/store/apiService";

export type GetGradeLevelApiResponse = { id: number; name: string; gradeLevelNumber: number }[];
export type GetGradeLevelApiArg = { query: string };

const gradeLevelApi = apiService.injectEndpoints({
    /**
     * endpoints
     * @param {function} build - The build function provided by apiService
     * @returns {object} - The endpoints object
     * @description The endpoints object
     */
    endpoints: (build) => ({
        getGradeLevels: build.query<GetGradeLevelApiResponse, GetGradeLevelApiArg>({
            query: (query) => ({
                url: "/api/gradelevel",
                params: { query },
            }),
            providesTags: ["gradelevels_list"],
        })
    }),
    overrideExisting: false,
});

export default gradeLevelApi;

export const { useGetGradeLevelsQuery } = gradeLevelApi;

export type GradeLevelApiType = {
    [gradeLevelApi.reducerPath]: ReturnType<typeof gradeLevelApi.reducer>;
};
