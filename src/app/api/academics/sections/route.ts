import prisma from "@lib/prisma";
import { EnrollmentStatus, Gender, Role } from "@/prisma/generated/prisma";

export async function GET(_: Request) {
    try {
        const { searchParams } = new URL(_.url);
        const q = searchParams.get("q") || "";
        const [sections, genderCounts] = await Promise.all([
            prisma.section.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: q,
                                mode: "insensitive",
                            }
                        },
                        {
                            adviser: {
                                user: {
                                    OR: [
                                        {
                                            firstName: {
                                                contains: q,
                                                mode: "insensitive",
                                            }
                                        },
                                        {
                                            middleName: {
                                                contains: q,
                                                mode: "insensitive",
                                            }
                                        },
                                        {
                                            lastName: {
                                                contains: q,
                                                mode: "insensitive",
                                            }
                                        },
                                    ]
                                }
                            }
                        }
                    ]
                },
                include: {
                    _count: {
                        select: {
                            enrollments: {
                                where: {
                                    enrollmentStatus: EnrollmentStatus.ASSIGNED,
                                }
                            },
                        }
                    },
                    adviser: {
                        include: {
                            user: {
                                omit: {
                                    password: true
                                }
                            }
                        }
                    },
                    gradeLevel: {
                        select: {
                            id: true,
                            name: true,
                            gradeLevelNumber: true,
                        }
                    }
                },
                take: 10,
            }),

            prisma.$queryRaw<{ sectionId: bigint, gender: Gender, count: bigint }[]>`
                SELECT e."sectionId", u."gender", COUNT(*) as count
                FROM "Enrollment" e
                JOIN "User" u ON e."studentId" = u."id"
                GROUP BY e."sectionId", u."gender"
            `
        ]);

        const result = sections.map(section => {
            const counts = genderCounts.filter(g => g.sectionId === section.id);
            const maleCount = counts.find(g => g.gender === "MALE")?.count ?? 0n;
            const femaleCount = counts.find(g => g.gender === "FEMALE")?.count ?? 0n;

            return { ...section, maleCount: Number(maleCount), femaleCount: Number(femaleCount) };
        });

        const totalSections = await prisma.section.count();
        const totalStudents = await prisma.user.count({
            where: {
                role: Role.STUDENT
            }
        });
        const totalAvailableSeats = sections.reduce((acc, section) => {
            const available = section.maxCapacity - section._count.enrollments;
            return acc + available;
        }, 0);

        return new Response(JSON.stringify({ sections: result, totalSections, totalStudents, totalAvailableSeats }, (_, value) => typeof value === "bigint" ? value.toString() : value), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, maxCapacity, gradeLevel, adviserId } = body;
        console.log(body);

        const newSection = await prisma.section.create({
            data: {
                name, maxCapacity, gradeLevelId: gradeLevel.id, adviserId
            }
        });

        return new Response(JSON.stringify(newSection, (_, value) => typeof value === "bigint" ? value.toString() : value), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
