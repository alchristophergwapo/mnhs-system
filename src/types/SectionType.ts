import { GradeLevelType } from "./GradeLevelType";
import { EnrollmentType } from "./EnrollmentType";

export type SectionType = {
    id?: bigint;
    name: string;
    gradeLevelId?: number;
    maxCapacity: number;
    gradeLevel?: GradeLevelType;
    enrollments?: EnrollmentType[];
    //   adviser ?  :   Teachertype;
}