import { apiService } from "@store/apiService";
import { UserType } from "@/src/types";

export type GetUserApiResponse = Partial<UserType>;
export type GetUserApiArg = number;

/**
 * UserApi
 * @description The UserApi is a set of endpoints for interacting with the user session information
 * from the API.
 */
const userApi = apiService.injectEndpoints({
    /**
     * endpoints
     * @param {function} build - The build function provided by apiService
     * @returns {object} - The endpoints object
     * @description The endpoints object
     */
    endpoints: (build) => ({
        // Define a query endpoint for getting user session information
        getUserSession: build.query<GetUserApiResponse, GetUserApiArg>({
            // Configuration for the API query
            query: (userId) => ({
                // URL for the API endpoint, includes the userId as a parameter
                url: `/api/auth/session/${userId}`,
            }),
            keepUnusedDataFor: 300,
            // Tags used for caching and invalidation
            providesTags: ["user_session"],
        })
    }),
    // Set to false to prevent overriding existing endpoints
    overrideExisting: false,
});

export default userApi;

export const { useGetUserSessionQuery } = userApi;

export type UserApiType = {
    [userApi.reducerPath]: ReturnType<typeof userApi.reducer>;
};
