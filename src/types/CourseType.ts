import { CourseType as CourseTypePrisma } from "@/prisma/generated";

export type CourseType = {
    id?: number;
    description?: string;
    code: string;
    name: string;
    courseType: CourseTypePrisma;
}