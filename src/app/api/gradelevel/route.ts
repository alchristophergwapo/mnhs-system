import prisma from "@/src/lib/prisma";

export async function GET(_: Request) {
    try {
        const { searchParams } = new URL(_.url);
        const query = searchParams.get("query") || "";
        
        const gradeLevels = await prisma.gradeLevel.findMany();
        return new Response(JSON.stringify(gradeLevels, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        ), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}