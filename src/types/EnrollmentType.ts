import { EnrollmentStatus, Semester } from "@/src/prisma/src/generated/prisma";

export type EnrollmentType = {
    id?: number;
    enrollmentStatus: EnrollmentStatus;
    enrollmentRemarks?: string;
    cardImage: string | File;
    schoolYearStart: Date | string;
    schoolYearEnd: Date | string;
    gradeLevelId?: number;
    semester?: Semester;
    studentId?: number;
    sectionId?: number;
    courseId?: number;
}