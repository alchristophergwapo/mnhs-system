import prisma from "@lib/prisma";
import { CourseType } from "@/prisma/generated/prisma";

export async function GET(_: Request) {
    try {
        const { searchParams } = new URL(_.url);
        const track = searchParams.get("track"); 
        const validTrack = track && track in CourseType
            ? CourseType[track as keyof typeof CourseType]
            : undefined;

        const courses = await prisma.course.findMany({
            where: validTrack ? { courseType: validTrack as CourseType } : undefined,
        });

        return new Response(JSON.stringify(courses, (_, value) => typeof value === "bigint" ? value.toString() : value), {
            status: 200,
        })
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify(error), {
            status: 500,
        })
    }
}