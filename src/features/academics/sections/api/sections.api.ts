import { apiService } from "@store/apiService";
import { GetSectionsApiArg, GetSectionsApiResponse, SectionsType } from "./sections.types";

/**
 * API slice configuration for academic sections.
 * Injects endpoints for managing sections into the apiService.
 * @type {object}
 */
const sectionsApi = apiService.injectEndpoints({
    /**
     * endpoints
     * @param {function} build - The build function provided by apiService
     * @returns {object} - The endpoints object
     * @description The endpoints object
     */
    endpoints: (build) => ({
        /**
         * Fetches a list of sections based on the provided query parameters.
         * @param {object} params - The query parameters for filtering sections.
         * @returns {object} The query configuration object containing the URL and params.
         */
        getSections: build.query<GetSectionsApiResponse, GetSectionsApiArg>({
            query: (params) => ({
                url: "/api/academics/sections",
                params,
            }),
            providesTags: ["sections_list"],
        }),
        /**
         * Creates a new section with the provided data.
         * @param {Partial<SectionsType>} body - The data for the new section.
         * @returns {object} The mutation configuration object containing the URL, method, and body.
         */
        createSection: build.mutation<SectionsType, Partial<SectionsType>>({
            query: (body) => ({
                url: "/api/academics/sections",
                method: "POST",
                body,
            }),
            invalidatesTags: ["sections_list"],
        }),
        /**
         * Fetches a single section by its unique identifier.
         * @param {number} id - The ID of the section to retrieve.
         * @returns {object} The query configuration object containing the dynamic URL.
         */
        getSectionById: build.query<SectionsType, number>({
            query: (id) => ({
                url: `/api/academics/sections/${id}`,
            }),
            providesTags: ["sections_list"],
        }),
    }),
    /**
     * Prevents overwriting existing endpoints if they are already defined.
     * @type {boolean}
     */
    overrideExisting: false,
});

export default sectionsApi;

export const { useGetSectionsQuery, useCreateSectionMutation, useGetSectionByIdQuery } = sectionsApi;

export type SectionsApiType = {
    [sectionsApi.reducerPath]: ReturnType<typeof sectionsApi.reducer>;
};
