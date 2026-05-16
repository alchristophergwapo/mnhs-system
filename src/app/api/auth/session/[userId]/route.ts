import { getUserById } from "@/src/server/services/userService";

export async function GET(request: Request, props: { params: Promise<{ userId: number }>}) {
    try {
        console.log(await props.params)
        const { userId } = await props.params;

        if(!userId) return new Response("User id not found in request params", { status: 401 });

        const user = await getUserById(Number(userId));

        return new Response(JSON.stringify(user, (_, value) => typeof value === 'bigint' ? value.toString() : value), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Error getting user", { status: 500 });
    }
}