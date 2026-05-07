import prisma from "@/src/lib/prisma";

export async function GET(request: Request, props: { params: Promise<{ sectionId: string }> }) {
    try {
        const { sectionId } = await props.params;
        const id = Number(sectionId);
        console.log("Fetching section with ID:", {id, params: await props.params});
        const section = await prisma.section.findUnique({
        where: { id: BigInt(id) },
            include: {
                adviser: {
                    include: {
                        user: {
                            omit: {
                                password: true,
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
                },
            },
        });

        if (!section) {
            return new Response(JSON.stringify({ message: "Section not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(section, (_, value) => typeof value === "bigint" ? value.toString() : value), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}