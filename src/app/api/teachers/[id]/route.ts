import { UserType } from "@app/(pages)/(admin)/teachers/_types";
import prisma from "@lib/prisma";
import { getTeacherById } from "@server/services/teacherService";
import {
  CivilStatus,
  Gender,
  Role,
} from "@/prisma/generated/prisma";
import { CitizenshipType } from "@types";

/**
 * GET /api/teachers/:id
 *
 * Fetches a teacher by their id.
 *
 * @param {Request} request - The request object
 * @param {Promise<{ id: number }>} props.params - The id of the teacher to fetch
 * @returns {Response} - The response object
 * @throws {Error} - If failed to fetch teacher
 */
export async function GET(
  _: Request,
  props: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await props.params;

    const teacher = await getTeacherById(BigInt(id));

    if (!teacher) {
      return new Response("Teacher Not Found", { status: 404 });
    }

    return new Response(
      JSON.stringify(teacher, (_, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

/**
 * PUT /api/teachers/:id
 *
 * Updates a teacher by their id.
 * Only the fields specified in the request body will be updated.
 * All other fields will be voided to prevent accidental data loss.
 * 
 * @param {Request} request - The request object
 * @param {Promise<{ id: number }>} props.params - The id of the teacher to update
 * @returns {Response} - The response object
 * @throws {Error} - If failed to update teacher
 */
export async function PUT(
  req: Request,
  props: { params: Promise<{ id: number }> },
) {
  try {
    const body = await req.json();
    const { id } = await props.params;
    const {
      permanentAddressId,
      residentialAddressId,
      citizenshipId,
      avatar,
      citizenship,
      civilStatus,
      contactNumber,
      dateOfBirth,
      dateHired,
      email,
      firstName,
      gender,
      height,
      isOjt,
      lastName,
      licenseExpiryDate,
      licenseNumber,
      middleName,
      nameExtension,
      positionId,
      religion,
      residentialAddress,
      weight,
      permanentAddress,
      gradeLevelId,
      bloodType,
      placeOfBirth,
      civilStatusOther,
      advisorySectionId,
      ...rest
    } = body as UserType & { advisorySectionId: number };

    // Ignore any other properties in the body to ensure it's never spread to the database
    void rest;

    const user = await prisma.$transaction(async (tx) => {
      await Promise.all([
        tx.address.update({
          where: { id: Number(permanentAddressId) },
          data: {
            ...permanentAddress,
            zipCode: Number(permanentAddress?.zipCode),
          } as any,
        }),
        residentialAddress
          ? tx.address.update({
              where: { id: Number(residentialAddressId) },
              data: {
                ...residentialAddress,
                zipCode: Number(residentialAddress.zipCode),
              } as any,
            })
          : Promise.resolve(null),
        tx.citizenship.update({
          where: { id: Number(citizenshipId) },
          data: citizenship as CitizenshipType,
        }),
      ]);

      const updatedUser = await tx.user.update({
        where: { id: Number(id) },
        data: {
          avatar,
          contactNumber,
          email,
          firstName,
          lastName,
          middleName,
          nameExtension,
          dateHired: dateHired ? new Date(dateHired) : new Date(),
          role: Role.TEACHER,
          dateOfBirth: new Date(dateOfBirth),
          gender: gender as Gender,
          height,
          weight,
          religion,
          placeOfBirth,
          teacher: {
            update: {
              positionId: Number(positionId),
              licenseNumber,
              licenseExpiryDate,
              civilStatus: civilStatus.toUpperCase() as CivilStatus,
              civilStatusOther,
              isOjt,
              bloodType,
              gradeLevelId: Number(gradeLevelId),
              advisorySectionId: Number(advisorySectionId),
            },
          },
        },
      });

      return updatedUser;
    });
    return new Response(
      JSON.stringify(user, (_, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
