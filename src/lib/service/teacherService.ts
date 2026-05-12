import { Prisma, Role } from "@/prisma/generated/prisma";
import prisma from "@lib/prisma";

const baseCitizenshipSelect = {
  countryOfDualCitizenship: true,
  dualCitizenship: true,
  dualCitizenshipBy: true,
  filipino: true,
};

/**
 * Get all teachers
 * @param queryConditions - Query conditions
 * @param skip - Number of teachers to skip
 * @param take - Number of teachers to take
 * @returns - List of teachers
 */
export async function getTeachers(
  queryConditions: Prisma.UserWhereInput = {},
  skip: number,
  take: number,
) {
  const teachers = await prisma.user.findMany({
    where: {
      AND: [
        {
          role: {
            in: [Role.TEACHER, Role.ADMIN, Role.SUPERADMIN],
          },
        },
        queryConditions,
      ],
    },
    include: {
      teacher: {
        include: {
          position: {
            select: {
              name: true,
            },
          },
          advisorySection: {
            select: {
              name: true,
            },
          },
          gradeLevel: {
            select: {
              name: true,
            },
          },
        },
      },
      citizenship: {
        select: baseCitizenshipSelect,
      },
    },
    omit: {
      password: true, // Don't return the password
    },
    skip, // Calculate the skip value
    take, // Limit the number of teachers per page
  });

  return teachers;
}

// Define the address select object
const addressSelect: Record<string, boolean> = {
  barangay: true,
  city: true,
  houseNumber: true,
  street: true,
  zipCode: true,
  province: true,
  subdivision: true,
};

// Define the base teacher include object
const baseTeacherInclude = {
  include: {
    position: {
      select: {
        name: true,
        id: true,
      },
    },
    advisorySection: {
      select: {
        name: true,
        id: true,
      },
    },
  },
} as const;

/**
 * Get a teacher by id
 * @param id - Teacher id
 * @returns - Teacher
 */
export async function getTeacherById(id: bigint, include?: Prisma.UserInclude) {
  // Safely construct the include object to prevent overwriting defaults
  const constructedInclude: Prisma.UserInclude = {
    // Conditionally include the citizenship object only if explicitly requested,
    // otherwise, default to true for backwards compatibility.
    // You can change this to 'false' to improve efficiency if not always needed.
    citizenship: include?.citizenship
      ? {
          select: baseCitizenshipSelect,
        }
      : false,
    permanentAddress: include?.permanentAddress
      ? {
          select: addressSelect,
        }
      : false,
    residentialAddress: include?.residentialAddress
      ? {
          select: addressSelect,
        }
      : false,
    // Deep merge the teacher include to preserve the base selections
    teacher: {
      include: {
        ...baseTeacherInclude,
        // Safely spread nested include objects if provided (e.g., gradeLevel)
        ...(typeof include?.teacher === "object" &&
        "include" in (include.teacher as any)
          ? (include.teacher as any).include
          : {}),
      },
    },
    // Include any other top-level user relations the caller might need
    ...Object.fromEntries(
      Object.entries(include ?? {}).filter(
        ([key]) =>
          ![
            "citizenship",
            "permanentAddress",
            "residentialAddress",
            "teacher",
          ].includes(key),
      ),
    ),
  };

  const teacher = await prisma.user.findUnique({
    where: { id },
    include: constructedInclude,
    omit: {
      password: true,
    },
  });

  return teacher;
}
