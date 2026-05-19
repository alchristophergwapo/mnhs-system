import { apiService } from "@store/apiService";
import { GetSectionsApiArg, GetSectionsApiResponse, SectionsType } from "./sections.types";

const sectionsApi = apiService.injectEndpoints({
    /**
     * endpoints
     * @param {function} build - The build function provided by apiService
     * @returns {object} - The endpoints object
     * @description The endpoints object
     */
    endpoints: (build) => ({
        getSections: build.query<GetSectionsApiResponse, GetSectionsApiArg>({
            query: (params) => ({
                url: "/api/academics/sections",
                params,
            }),
            providesTags: ["sections_list"],
        }),
        createSection: build.mutation<SectionsType, Partial<SectionsType>>({
            query: (body) => ({
                url: "/api/academics/sections",
                method: "POST",
                body,
            }),
            invalidatesTags: ["sections_list"],
        }),
        getSectionById: build.query<SectionsType, number>({
            query: (id) => ({
                url: `/api/academics/sections/${id}`,
            }),
            providesTags: ["sections_list"],
        }),
    }),
    overrideExisting: false,
});

export default sectionsApi;

export const { useGetSectionsQuery, useCreateSectionMutation, useGetSectionByIdQuery } = sectionsApi;

export type SectionsApiType = {
    [sectionsApi.reducerPath]: ReturnType<typeof sectionsApi.reducer>;
};
