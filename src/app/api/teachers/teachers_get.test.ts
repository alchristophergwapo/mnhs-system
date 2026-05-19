/**
 * Import necessary modules
 */
import { Role } from "@/prisma/generated";
import { GET } from "./route";
import prisma from "@lib/prisma";

// Mock the prisma module to isolate the tests from the actual database
jest.mock("@lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      count: jest.fn(),
    },
  },
}));

// Mock the teacherService module to isolate the tests from the actual service implementation
jest.mock("@server/services/teacherService", () => ({
  getTeachers: jest.fn(),
}));

import { getTeachers } from "@server/services/teacherService";

/**
 * Test suite for the GET handler
 */
describe("GET handler", () => {
  // Sample test data
  const teachers = [{ id: 1, name: "Test Teacher" }];
  // Default role query condition used across tests
  const defaultRoleQueryCondition = {
    in: [Role.TEACHER, Role.ADMIN, Role.SUPERADMIN],
  };
  /**
   * Setup before each test
   * Resets all mocks and sets default return values
   */
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Set default return value for getTeachers mock
    (getTeachers as jest.Mock).mockReturnValue(teachers);
    // Set default return value for prisma.user.count mock
    (prisma.user.count as jest.Mock).mockResolvedValue(1);
  });

  // Create a request variable with the given parameters
  const createRequest = (params: Record<string, string> = {}) => {
    const url = new URL("http://localhost:3000/api/teachers");
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return new Request(url.toString());
  };

  /**
   * Test case to verify that the GET request returns a 200 status code when no errors occur
   * This test ensures the API endpoint is functioning correctly under normal conditions
   */
  it("should return a 200 status code if no errors occur", async () => {
    // Create a new request object for testing
    const request = createRequest();

    // Execute the GET request handler with the test request
    const response = await GET(request);

    // Assert that the response status code is 200 (OK)
    expect(response.status).toBe(200);
  });

  /**
   * Test case to verify that a server error returns a 500 status code
   * This test mocks the getTeachers function to simulate a server error scenario
   */
  it("should return a 500 status code if a server error occurs", async () => {
    // Mock getTeachers to reject with a server error
    (getTeachers as jest.Mock).mockRejectedValue(new Error("Server error"));

    // Suppress console.error output during the test
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    // Create a new request object
    const request = createRequest();

    // Execute the GET request
    const response = await GET(request).catch((error) => error);
    // Parse the response data as JSON
    const data = await response.json();

    // Verify that the response status is 500 (Internal Server Error)
    expect(response.status).toBe(500);
    expect(data.error).toEqual("Server error"); // Verify that the error message is "Server error"

    consoleErrorSpy.mockRestore(); // Restore the original console.error function
  });

  /**
   * Test case to verify the GET endpoint returns teachers and total teachers count
   */
  it("should return teachers and total teachers", async () => {
    // Create a new request object for the test
    const request = createRequest();

    // Execute the GET request asynchronously
    const response = await GET(request);

    // Verify the response status is 200 (OK)
    expect(response.status).toBe(200);
    // Verify the response content type is JSON
    expect(response.headers.get("Content-Type")).toBe("application/json");
    // Parse the response body from JSON
    const responseBody = await response.json();
    // Verify the response body contains expected teachers and total count
    expect(responseBody).toEqual({ teachers, totalTeachers: 1 });
  });

  /**
   * Test case to verify the behavior of the GET endpoint when no parameters are provided
   * It should return default non-advisory teachers as per the expected behavior
   */
  it("should return default non-advisory teachers when no params are provided", async () => {
    // Create a new request object
    const request = createRequest();
    // Execute the GET request and get the response
    const response = await GET(request);
    // Parse the response data as JSON
    const data = await response.json();

    // Verify that the response status is 200 (OK)
    expect(response.status).toBe(200);
    // Verify that the returned teachers array matches the expected teachers data
    expect(data.teachers).toEqual(teachers);
    // Verify that the total teachers count is 1
    expect(data.totalTeachers).toBe(1);

    // Verify that the getTeachers function was called with the expected parameters
    // It should request teachers with no advisory section and not marked as OJT
    expect(getTeachers).toHaveBeenCalledWith(
      {
        teacher: {
          advisorySectionId: null,
          isOjt: false,
        },
      },
      0, // Offset for pagination
      10, // Limit for pagination
    );

    // Verify that Prisma's count method was called with the correct query conditions
    // It should count users with the default role, no additional filters, and teachers
    // who are not advisory and not marked as OJT
    expect(prisma.user.count).toHaveBeenCalledWith({
      where: {
        AND: [
          {
            role: defaultRoleQueryCondition,
          },
          {}, // Empty condition (no additional filters)
          {
            teacher: {
              advisorySectionId: null,
              isOjt: false,
            },
          },
        ],
      },
    });
  });

  /**
   * Test case to verify that advisory teachers are returned when the type is "advisory"
   */
  it("should return advisory teachers when type is advisory", async () => {
    // Create a request with type set to "advisory"
    const request = createRequest({ type: "advisory" });
    // Execute the GET request
    const response = await GET(request);

    // Verify that the response status is 200 (OK)
    expect(response.status).toBe(200);

    // Verify that getTeachers is called with the correct parameters for advisory teachers
    expect(getTeachers).toHaveBeenCalledWith(
      {
        teacher: {
          advisorySectionId: {
            not: null, // Teacher must have an advisory section assigned
          },
          isOjt: {
            equals: false, // Teacher is not an OJT (On-the-Job Training) teacher
          },
        },
      },
      0, // Offset for pagination
      10, // Limit for pagination
    );

    // Verify that prisma.user.count is called with the correct query conditions
    expect(prisma.user.count).toHaveBeenCalledWith({
      where: {
        AND: [
          {
            role: defaultRoleQueryCondition, // Apply default role condition
          },
          {}, // Empty condition (placeholder)
          {
            teacher: {
              advisorySectionId: {
                not: null, // Teacher must have an advisory section assigned
              },
              isOjt: {
                equals: false, // Teacher is not an OJT (On-the-Job Training) teacher
              },
            },
          },
        ],
      },
    });
  });

  /**
   * Test case to verify that OJT (On-the-Job Training) teachers are returned when the type parameter is set to "ojt"
   * This test ensures that the API correctly filters and returns only OJT teachers
   */
  it("should return OJT teachers when type is ojt", async () => {
    // Create a request object with type parameter set to "ojt"
    const request = createRequest({ type: "ojt" });
    // Execute the GET request with the created request object
    const response = await GET(request);

    // Verify that the response status is 200 (OK)
    expect(response.status).toBe(200);

    // Verify that getTeachers function is called with the correct parameters
    // It should filter teachers where isOjt is true and advisorySectionId is null
    expect(getTeachers).toHaveBeenCalledWith(
      {
        teacher: {
          advisorySectionId: null,
          isOjt: true,
        },
      },
      0,
      10,
    );

    // Verify that prisma.user.count is called with the correct where clause
    // It should count users with the specified role and where the teacher has isOjt true and advisorySectionId null
    expect(prisma.user.count).toHaveBeenCalledWith({
      where: {
        AND: [
          {
            role: defaultRoleQueryCondition,
          },
          {},
          {
            teacher: {
              advisorySectionId: null,
              isOjt: true,
            },
          },
        ],
      },
    });
  });

  /**
   * Test case to verify that query conditions are applied when provided and override default query conditions
   * This test ensures that the GET endpoint correctly handles search queries and applies appropriate filters
   */
  it("should apply query conditions when provided and override default query conditions", async () => {
    // Create a request with a query parameter "John"
    const request = createRequest({
      q: "John",
    });
    // Execute the GET request and store the response
    const response = await GET(request);

    // Verify that the response status is 200 (OK)
    expect(response.status).toBe(200);

    // Verify that getTeachers is called with the expected query parameters
    // The query should search for "John" in lastName, firstName, or middleName (case insensitive)
    // and filter for teachers who are not advisory teachers and not OJT
    expect(getTeachers).toHaveBeenCalledWith(
      {
        OR: [
          { lastName: { contains: "John", mode: "insensitive" } },
          { firstName: { contains: "John", mode: "insensitive" } },
          { middleName: { contains: "John", mode: "insensitive" } },
        ],
        teacher: {
          advisorySectionId: null,
          isOjt: false,
        },
      },
      0, // Offset value
      10, // Limit value
    );

    // Verify that Prisma's user.count is called with the expected conditions
    // The count query should include:
    // 1. Default role query condition
    // 2. OR condition for searching "John" in name fields
    // 3. Teacher-specific filters (not advisory, not OJT)
    expect(prisma.user.count).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          AND: [
            {
              role: defaultRoleQueryCondition,
            },
            {
              OR: [
                { lastName: { contains: "John", mode: "insensitive" } },
                { firstName: { contains: "John", mode: "insensitive" } },
                { middleName: { contains: "John", mode: "insensitive" } },
              ],
            },
            {
              teacher: {
                advisorySectionId: null,
                isOjt: false,
              },
            },
          ],
        },
      }),
    );
  });

  /**
   * Test case to verify that the grade level filter is correctly applied when provided in the request
   */
  it("should apply grade level filter when provided", async () => {
    // Create a request with grade level filter set to "1"
    const request = createRequest({
      gradeLevel: "1",
    });
    // Execute the GET request with the provided filter
    const response = await GET(request);
    // Define the expected teacher object structure that matches the grade level filter
    const teacherWithGradeLevel = {
      advisorySectionId: null,
      isOjt: false,
      gradeLevel: {
        some: {
          id: 1,
        },
      },
    };

    // Verify that the response status is 200 (OK)
    expect(response.status).toBe(200);

    // Verify that getTeachers is called with the correct parameters including the grade level filter
    expect(getTeachers).toHaveBeenCalledWith(
      {
        teacher: teacherWithGradeLevel,
      },
      0,
      10,
    );
    // Verify that prisma.user.count is called with the correct filter conditions
    expect(prisma.user.count).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          AND: [
            {
              role: defaultRoleQueryCondition,
            },
            {}, // Empty object might represent additional conditions or placeholder
            {
              teacher: teacherWithGradeLevel,
            },
          ],
        },
      }),
    );
  });

  /**
   * Test case to verify correct parsing of pagination parameters
   * Checks if the API correctly handles page and limit query parameters
   */
  it("should correctly parse pagination parameters", async () => {
    // Create a mock request with pagination parameters
    const request = createRequest({
      page: "2", // Page number parameter (string format)
      limit: "5", // Number of items per page (string format)
    });
    // Execute the GET request with the provided parameters
    const response = await GET(request);

    // Verify that the response status is successful (200 OK)
    expect(response.status).toBe(200);

    // Check if the getTeachers function was called with correct parameters:
    // First argument: Filter object with teacher criteria
    // Second argument: Offset (calculated as (page - 1) * limit = 10)
    // Third argument: Limit (number of items per page = 5)
    expect(getTeachers).toHaveBeenCalledWith(
      {
        teacher: {
          advisorySectionId: null,
          isOjt: false,
        },
      },
      10,
      5,
    );
  });

  it("should handle BigInt values by converting them to strings", async () => {
    // Mock the getTeachers function to return a list of BigInt values
    const bigIntTeacher = [{ id: BigInt(1), name: "Test Teacher" }];
    (getTeachers as jest.Mock).mockResolvedValue(bigIntTeacher);

    // Create a request with a teacher ID parameter
    const request = createRequest();
    // Execute the GET request with the provided parameters
    const response = await GET(request);
    // Parse the response data as JSON
    const data = await response.json();
    // Verify that the response status is successful (200 OK)
    expect(response.status).toBe(200);
    // Verify that the returned teachers id is a string
    expect(data.teachers[0].id).toBe("1");
  });
});
