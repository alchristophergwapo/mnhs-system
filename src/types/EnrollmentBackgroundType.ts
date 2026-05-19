import { StudentEntryType } from "@/prisma/generated";

export type EnrollmentBackgroundType = {
    id?: number;
    entryType: StudentEntryType;
    lastGradeLevel?: number;
    lastSchoolName?: string;
    lastSchoolID?: string;
    lastSchoolAddress?: string;
    lastSchoolYear?: string;
    studentId?: number;
}