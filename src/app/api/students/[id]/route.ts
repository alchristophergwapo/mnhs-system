import prisma from "@lib/prisma";
import { FamilyRelationShip } from "@/prisma/generated";

/**
 * Get student by id
 * @param _ Request
 * @param id The id of the student
 * @returns student details
 */
export async function GET(_: Request, { params }: { params: Promise<{ id: number }> }) {
    try {
        const { id } = await params;

        const student = await prisma.student.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!student) {
            return new Response(JSON.stringify({ message: 'Student not found' }), {
                status: 404,
            })
        }

        const [user, father, mother, guardian, enrollment, enrollmentBackground] = await Promise.all([
            prisma.user.findUnique({
                where: {
                    id: student.userId,
                },
            }),
            prisma.family.findFirst({
                where: {
                    userId: student.userId,
                    relationship: FamilyRelationShip.FATHER,
                }
            }),
            prisma.family.findFirst({
                where: {
                    userId: student.userId,
                    relationship: FamilyRelationShip.MOTHER,
                }
            }),
            prisma.family.findFirst({
                where: {
                    userId: student.userId,
                    relationship: FamilyRelationShip.GUARDIAN,
                }
            }),
            prisma.enrollment.findFirst({
                where: {
                    studentId: student.id,
                    schoolYearStart: {
                        gte: new Date(new Date().getFullYear(), 5, 1),
                    },
                    schoolYearEnd: {
                        lte: new Date(new Date().getFullYear() + 1, 4, 31)
                    }
                }
            }),
            prisma.enrollmentBackground.findFirst({
                where: {
                    studentId: student.id,
                }
            }),
        ]);
        const [permanentAddress, residentialAddress, citizenship, gradeLevel] = await Promise.all([
            prisma.address.findUnique({
                where: {
                    id: user?.permanentAddressId,
                }
            }),
            user?.residentialAddressId ? prisma.address.findUnique({
                where: {
                    id: user?.residentialAddressId,
                }
            }) : null,
            prisma.citizenship.findUnique({
                where: {
                    id: user?.citizenshipId,
                }
            }),
            enrollment?.gradeLevelId ? prisma.gradeLevel.findUnique({
                where: {
                    id: enrollment?.gradeLevelId,
                }
            }): null,
        ]);

        return new Response(JSON.stringify({ user, permanentAddress, residentialAddress, student, citizenship, father, mother, guardian, enrollment, enrollmentBackground, gradeLevel }, (_, value) => typeof value === 'bigint' ? value.toString() : value), {
            status: 200,
        })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), {
            status: 500,
        })
    }
}