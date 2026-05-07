import prisma from "@/src/lib/prisma";
import { CivilStatus, Gender, Role } from "@/src/prisma/src/generated/prisma";
import { UserType } from "@/src/app/(admin)/teachers/_types";

export async function GET(_: Request, props: { params: Promise<{ id: number }> }) {
    try {
        const { id } = await props.params;
        
        const teacher = await prisma.user.findUnique({
            where: { id: Number(id) },
            include: {
                permanentAddress: true,
                residentialAddress: true,
                citizenship: true,
                teacher: {
                    include: {
                        position: true,
                    }
                }
            },
            omit: {
                password: true,
            }
        });

        return new Response(JSON.stringify(teacher, (_, value) => typeof value === "bigint" ? value.toString() : value), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function PUT(_: Request, props: { params: Promise<{ id: number }> }) {
    try {
        const body = await _.json();
        const { id } = await props.params;
        const teacherData = body as UserType;

        const user = await prisma.$transaction(async (tx) => {
            await Promise.all([
                tx.address.update({ where: { id: Number(teacherData.permanentAddressId) }, data: { ...teacherData?.permanentAddress, zipCode: Number(teacherData?.permanentAddress?.zipCode) } as any }),
                teacherData?.residentialAddress ? tx.address.update({ where: { id: Number(teacherData.residentialAddressId) }, data: { ...teacherData.residentialAddress, zipCode: Number(teacherData.residentialAddress.zipCode) } as any }) : Promise.resolve(null),
                tx.citizenship.update({ where: { id: Number(teacherData.citizenshipId) }, data: teacherData.citizenship as any }),
            ]);

            await tx.user.update({
                where: { id: Number(id) },
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
                },
                include: {
                    teacher: true,

                }
            });

            await tx.teacher.update({
                where: { userId: id },
                data: {
                    positionId: Number(teacherData.positionId),
                    licenseNumber: teacherData.licenseNumber,
                    licenseExpiryDate: new Date(teacherData.licenseExpiryDate),
                    civilStatus: teacherData.civilStatus.toUpperCase() as CivilStatus,
                    civilStatusOther: teacherData.civilStatusOther,
                    isOjt: teacherData.isOjt,
                    bloodType: teacherData.bloodType,
                    gradeLevelId: Number(teacherData.gradeLevelId),
                }
            })

            const newUser = await tx.user.findUnique({
                where: { id: Number(id) },
                include: {
                    teacher: true,
                    citizenship: true,
                    permanentAddress: true,
                    residentialAddress: true
                },
                omit: {
                    password: true,
                }
            })

            return newUser;
        });
        return new Response(JSON.stringify(user, (_, value) => typeof value === "bigint" ? value.toString() : value), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}