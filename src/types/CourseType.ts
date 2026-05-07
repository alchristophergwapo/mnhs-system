import { CourseType as CourseTypePrisma } from "@/src/prisma/src/generated/prisma";

export type CourseType = {
    id?: number;
    description?: string;
    code: string;
    name: string;
    courseType: CourseTypePrisma;
}