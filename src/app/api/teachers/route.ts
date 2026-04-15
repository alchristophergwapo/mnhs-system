import prisma from "@/lib/prisma";

/**
 * GET /api/teachers
 *
 * Fetches teachers based on the query parameters.
 *
 * @param {Request} request - The request object
 * @returns {Response} - The response object
 *
 * @example
 * GET /api/teachers?type=non-advisory&q=John&page=0&limit=10
 *
 * @param {string} [searchParams.type=non-advisory] - The type of teachers to fetch. Can be "non-advisory", "advisory", or "ojt".
 * @param {string} [searchParams.q] - The search query string. Case-insensitive.
 * @param {number} [searchParams.page=0] - The page number of teachers to fetch.
 * @param {number} [searchParams.limit=10] - The limit of teachers per page.
 *
 * @returns {Response}
 * @throws {Error} - If failed to fetch teachers
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Parse and type-cast the parameters
  const type = (searchParams.get("type") || "non-advisory") as
    | "non-advisory"
    | "advisory"
    | "ojt";
  const q = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    let queryConditions = {};
    let defaultQueryConditions = {};

    if (q) {
      defaultQueryConditions = {
        OR: [
          {
            lastName: {
              contains: q,
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            firstName: {
              contains: q,
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            middleName: {
              contains: q,
              mode: "insensitive", // Case-insensitive search
            },
          },
        ],
      };
    }

    if (type === "advisory") { // Check if type is "advisory"
      queryConditions = {
        advisorySection: {
          isNot: null,
        },
        isOjt: { // Exclude OJT teachers
          equals: false,
        },
      };
    } else if (type === "non-advisory") { // Check if type is "non-advisory"
      queryConditions = {
        AND: {
          advisorySection: {
            is: null,
          },
          isOjt: {
            equals: false,
          },
        }, // Exclude advisory teachers that are also not OJT
      };
    } else { // Else if type is "ojt"
      queryConditions = {
        AND: {
          advisorySection: {
            is: null,
          },
        },
        isOjt: true,
      };
    }

    // Fetch teachers with query conditions default and from parameters
    const teachers = await prisma.teacher.findMany({
      where: {
        ...defaultQueryConditions,
        ...queryConditions,
      },
      skip: page * limit, // Calculate the skip value
      take: limit, // Limit the number of teachers per page
    });

    // Fetch the total number of teachers
    const totalTeachers = await prisma.teacher.count({
      where: {
        ...defaultQueryConditions,
        ...queryConditions,
      },
    });

    return new Response(JSON.stringify({ teachers, totalTeachers }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch teachers" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
