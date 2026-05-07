import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { API_BASE_URL, globalHeaders } from "../utils/apiFetch";

/**
 * A base query function for use with `createApi` from `@reduxjs/toolkit/query/react`.
 * This function will be used to generate the underlying fetch logic for the API endpoints.
 * It will automatically include the global headers set in `globalHeaders` in the request.
 * It will also handle specific error codes. If the error code is 401 (unauthorized access),
 * it will log an error message and redirect to the login page.
 * @param {string | FetchArgs} args - The arguments for the query.
 * @param {object} api - The API object.
 * @param {object} extraOptions - The extra options for the query.
 * @returns {Promise<{data: unknown, error: FetchBaseQueryError | null, meta: FetchBaseQueryMeta}>}
 */
const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: API_BASE_URL,
    /**
     * A callback function to prepare the headers for the request.
     * This function will be called with the headers object as an argument.
     * It should return the modified headers object.
     * By default, this function will set the global headers from `globalHeaders` in the request.
     * If you want to add custom headers or override the global headers, you can do so in this function.
     */
    prepareHeaders: (headers) => {
      //get token from local storage
      Object.entries(globalHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
      return headers;
    },
  })(args, api, extraOptions);

  // Example of handling specific error codes
  if (result.error) {
    if (result.error.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error("Unauthorized access - redirecting to login.");
    }
  }

  return result;
};

const tagTypes = [
  "teachers_list",
  "teacher_details",
  "positions_list",
  "gradelevels_list",
  "student_details",
  "students_list",
  "sections_list",
  "courses_list",
];

export const apiService = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes,
  reducerPath: "apiService",
});
