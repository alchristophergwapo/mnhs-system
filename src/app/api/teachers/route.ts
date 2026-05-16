import prisma from "@lib/prisma";
import { CivilStatus, Gender, Prisma, Role } from "@/prisma/generated/prisma";
import { UserType } from "../../(pages)/(admin)/teachers/_types";
import bcrypt from "bcrypt";
import { getTeacherById, getTeachers } from "@/src/server/services/teacherService";
import { generateSecurePassword } from "@/src/utils/passwordHelper";

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
  const gradeLevel = parseInt(searchParams.get("gradeLevel") || "0", 10);

  try {
    let queryConditions: Prisma.UserWhereInput = {};
    let defaultQueryConditions: Prisma.UserWhereInput = {};

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
        teacher: {
          advisorySectionId: {
            not: null
          },
          isOjt: { // Exclude OJT teachers
            equals: false,
          },
        },
      };
    } else if (type === "non-advisory") { // Check if type is "non-advisory"
      queryConditions = {
        teacher: {
          advisorySectionId: null,
          isOjt: false,
        }, // Exclude advisory teachers that are also not OJT
      };
    } else { // Else if type is "ojt"
      queryConditions = {
        teacher: {
          advisorySectionId: null,
          isOjt: true,
        },
      };
    }

    if (gradeLevel) {
      queryConditions = {
        teacher: {
          ...(queryConditions?.teacher as Prisma.TeacherWhereInput),
          gradeLevel: {
            some: {
              id: Number(gradeLevel),
            },
          }
        }
      };
    }

    // Fetch teachers with query conditions default and from parameters
    const teachers = await getTeachers({...defaultQueryConditions, ...queryConditions}, page * limit, limit);

    // Fetch the total number of teachers
    const totalTeachers = await prisma.user.count({
      where: {
        AND: [
          {
            role: {
              in: [Role.TEACHER, Role.ADMIN, Role.SUPERADMIN],
            }
          },
          defaultQueryConditions,
          queryConditions,
        ],
      },
    });

    return new Response(JSON.stringify({ teachers, totalTeachers }, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    ), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: (error as Error).message ?? "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const teacherData = body as UserType;

    const salt = await bcrypt.genSalt(10);
    const password = await generateSecurePassword(teacherData.firstName, teacherData.lastName, new Date(teacherData.dateOfBirth));

    const user = await prisma.$transaction(async(tx) => {
      const [permanentAddress, residentialAddress, citizenship] = await Promise.all([
        tx.address.create({ data: { ...teacherData?.permanentAddress, zipCode: Number(teacherData?.permanentAddress?.zipCode) } as any }),
        teacherData?.residentialAddress ? tx.address.create({ data: { ...teacherData.residentialAddress, zipCode: Number(teacherData.residentialAddress.zipCode) } as any }) : Promise.resolve(null),
        tx.citizenship.create({ data: teacherData.citizenship as any }),
      ]);

      const user = await tx.user.create({
        data: {
          role: Role.TEACHER,
          firstName: teacherData.firstName,
          lastName: teacherData.lastName,
          middleName: teacherData.middleName,
          dateOfBirth: new Date(teacherData.dateOfBirth),
          gender: teacherData.gender as Gender,
          contactNumber: teacherData.contactNumber,
          email: teacherData.email,
          avatar: teacherData.avatar,
          height: teacherData.height,
          weight: teacherData.weight,
          religion: teacherData.religion,
          username: `${teacherData.firstName.toLowerCase()}.${teacherData.lastName.toLowerCase()}_${new Date(teacherData.dateOfBirth).getMonth()}_${new Date(teacherData.dateOfBirth).getDate()}_${new Date(teacherData.dateOfBirth).getFullYear()}`,
          password, // hash this before saving
          permanentAddressId: permanentAddress?.id,
          residentialAddressId: residentialAddress?.id,
          citizenshipId: citizenship.id,
        }
      });

      await tx.teacher.create({
        data: {
          positionId: Number(teacherData.positionId || teacherData.position),
          licenseNumber: teacherData.licenseNumber,
          licenseExpiryDate: new Date(teacherData.licenseExpiryDate),
          userId: user.id,
          civilStatus: teacherData.civilStatus.toUpperCase() as CivilStatus,
          civilStatusOther: teacherData.civilStatusOther,
          dateHired: teacherData.dateHired
            ? new Date(teacherData.dateHired)
            : new Date(),
          isOjt: teacherData.isOjt,
          bloodType: teacherData.bloodType,
          gradeLevelId: Number(teacherData.gradeLevelId),
        }
      });

      const newUser = await getTeacherById(user.id);

      return newUser;
    })
    return new Response(JSON.stringify(user, (_, value) => typeof value === "bigint" ? value.toString() : value), { status: 201 });
  } catch (error) {
    console.error("Error creating teacher:", error);
    return new Response("Error creating teacher", { status: 500 });
  }
}
