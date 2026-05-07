import { GradeLevelType } from "./GradeLevelType";
import { EnrollmentType } from "./EnrollmentType";

export type SectionType = {
    id?: BigInt;
    name: String;
    gradeLevelId?: number;
    maxCapacity: number;
    gradeLevel?: GradeLevelType;
    enrollments?: EnrollmentType[];
    //   adviser ?  :   Teachertype;
}