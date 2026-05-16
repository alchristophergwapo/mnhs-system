import prisma from "@lib/prisma";
import { createClient } from "@lib/supabase/server";
import { EnrollmentStatus, FamilyRelationShip, Gender } from "@/prisma/generated/prisma";
import { AddressType, CitizenshipType, EnrollmentBackgroundType, EnrollmentType, FamilyType, GradeLevelType, StudentType, UserType } from "@/src/types";
import { generateSecurePassword } from "@utils/passwordHelper";
import { generateUsername, normalizeAddressData } from "@utils/userDataHelper";
import { cookies } from "next/headers";

export async function GET(_: Request) {
    try {
        const { searchParams } = new URL(_.url);
        const q = searchParams.get("q") || "";
        const page = parseInt(searchParams.get("page") || "0", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const glevel = searchParams.get("gradeLvl");
        const section = searchParams.get("section");

        const queryConditions = [];
        if (q) {
            queryConditions.push({
                OR: [
                    { firstName: { contains: q, mode: "insensitive" as any } },
                    { lastName: { contains: q, mode: "insensitive" as any } },
                    { middleName: { contains: q, mode: "insensitive" as any } }
                ]
            });
        } else if (glevel) {
            queryConditions.push({
                student: {
                    enrollment: {
                        some: {
                            enrollmentStatus: EnrollmentStatus.ENROLLED,
                            gradeLevelId: Number(glevel),
                        }
                    },
                }
            });
        } else if (section) {
            queryConditions.push({
                student: {
                    enrollment: {
                        some: {
                            enrollmentStatus: EnrollmentStatus.ENROLLED,
                            sectionId: Number(section),
                        }
                    },
                }
            });
        } else {
            queryConditions.push({
                student: {
                    enrollment: {
                        some: {
                            enrollmentStatus: EnrollmentStatus.ENROLLED,
                        }
                    },
                }
            });
        }

        const students = await prisma.user.findMany(
            {
                where: {
                    AND: [
                        {
                            role: "STUDENT",
                        },
                        ...queryConditions,
                    ]
                },
                include: {
                    permanentAddress: true,
                    residentialAddress: true,
                    citizenship: true,
                    student: true,
                },
                omit: {
                    password: true
                },
                skip: page * limit,
                take: limit,
            }
        );

        const totalStudents = await prisma.user.count({
            where: {
                AND: [
                    { role: "STUDENT" },
                    ...queryConditions,
                ]
            }
        });

        return new Response(JSON.stringify({ students, totalStudents }, (_, value) => typeof value === "bigint" ? value.toString() : value), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }

}

export async function POST(_: Request) {
    try {
        const body = await _.json();
        const userData = body.user as UserType;
        const citizenshipData = body.citizenship as CitizenshipType;
        const enrollmentData = body.enrollment as EnrollmentType;
        const studentData = body.student as StudentType;
        const enrollmentBackgroundData = body.enrollmentBackground as EnrollmentBackgroundType;
        const fatherData = body.father as FamilyType;
        const motherData = body.mother as FamilyType;
        const guardianData = body.guardian as FamilyType;
        const permanentAddressData = body.permanentAddress as AddressType;
        const residentialAddressData = body.residentialAddress as AddressType;
        const gradeLevelData = body.gradeLevel as GradeLevelType;

        // TODO: Add validation for the data

        const dateOfBirth = new Date(userData.dateOfBirth);
        const password = await generateSecurePassword(userData.firstName, userData.lastName, dateOfBirth);
        const username = generateUsername(userData.firstName, userData.lastName, dateOfBirth);

        const student = await prisma.$transaction(async (tx) => {
            const [citizenship, permanentAddress, residentialAddress] = await Promise.all([
                tx.citizenship.create({
                    data: citizenshipData,
                }),
                tx.address.create({
                    data: normalizeAddressData(permanentAddressData),
                }),
                residentialAddressData ? tx.address.create({
                    data: normalizeAddressData(residentialAddressData),
                }) : null,
            ]);

            const user = await tx.user.create({
                data: {
                    ...(userData),
                    dateOfBirth: new Date(userData.dateOfBirth).toISOString(),
                    gender: userData.gender as Gender,
                    username,
                    password,
                    email: userData.email || null,
                    citizenshipId: citizenship.id,
                    permanentAddressId: permanentAddress.id,
                    residentialAddressId: residentialAddress?.id,
                }
            });

            const newstudent = await tx.student.create({
                data: {
                    ...studentData,
                    userId: user.id,
                }
            })

            let cardImagePath = "";
            if (typeof enrollmentData.cardImage !== "string") {
                try {
                    const allowedTypes = ["image/png", "image/jpeg"];
                    const allowedExtensions = ["png", "jpg", "jpeg"];

                    const file = enrollmentData.cardImage as File;
                    const fileExtension = file.name.split(".").pop()?.toLowerCase();

                    if (!allowedTypes.includes(file.type) || !allowedExtensions.includes(fileExtension ?? "")) {
                        throw new Error("Invalid file type. Only PNG and JPEG files are allowed.");
                    }

                    // Normalize extension — always store jpeg as jpg
                    const normalizedExtension = file.type === "image/png" ? "png" : "jpg";

                    const cookieStore = await cookies();
                    const supabase = createClient(cookieStore);

                    const { data, error } = await supabase.storage.from('mnhs').upload(
                        `card/${user.id}.${normalizedExtension}`,
                        file,
                        { upsert: true, contentType: file.type }
                    );

                    if (error) throw error;
                    cardImagePath = data?.fullPath || "";
                } catch (uploadError) {
                    console.error('File upload failed:', uploadError);
                }
            } else {
                cardImagePath = enrollmentData.cardImage;
            }

            await Promise.all([
                tx.enrollment.create({
                    data: {
                        ...enrollmentData,
                        cardImage: cardImagePath,
                        schoolYearStart: new Date(new Date().getFullYear(), 5, 1), // June 1st of the current year
                        schoolYearEnd: new Date(new Date().getFullYear() + 1, 4, 31), // May 31st of the next year
                        gradeLevelId: Number(gradeLevelData.id),
                        studentId: newstudent.id,
                    }
                }),
                enrollmentBackgroundData ? tx.enrollmentBackground.create({
                    data: {
                        ...enrollmentBackgroundData,
                        studentId: newstudent.id,
                    }
                }) : null,
                tx.family.create({
                    data: {
                        ...fatherData,
                        relationship: FamilyRelationShip.FATHER,
                        userId: user.id,
                    }
                }),
                tx.family.create({
                    data: {
                        ...motherData,
                        relationship: FamilyRelationShip.MOTHER,
                        userId: user.id,
                    }
                }),
                guardianData ? tx.family.create({
                    data: {
                        ...guardianData,
                        relationship: guardianData.relationship as FamilyRelationShip,
                        userId: user.id,
                    }
                }) : null
            ])

            return user;
        });

        return new Response(JSON.stringify(student, (_, value) => typeof value === "bigint" ? value.toString() : value), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error creating student" }), { status: 500 });
    }
}
