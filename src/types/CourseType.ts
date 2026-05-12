import { CourseType as CourseTypePrisma } from "@/prisma/generated/prisma";

export type CourseType = {
    id?: number;
    description?: string;
    code: string;
    name: string;
    courseType: CourseTypePrisma;
}