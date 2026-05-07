import { EnrollmentType } from "./EnrollmentType";

export type GradeLevelType = {
    id?: number;
    name: string;
    gradeLevelNumber: number;
    enrollments?: EnrollmentType[];
    // sections?: Section[];
    // subjects?: Subject[];
    // teachers?: Teacher[];
}