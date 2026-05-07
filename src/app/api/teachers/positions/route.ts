import prisma from "@/src/lib/prisma";

export async function GET(_: Request, props: { params: Promise<{ query: string }> }) {
    try {

        // const { query = "" } = await props.params;
        const positions = await prisma.position.findMany();
        return new Response(JSON.stringify(positions, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        ), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}