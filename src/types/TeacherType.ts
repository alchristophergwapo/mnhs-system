import { CivilStatus } from "@/prisma/generated/prisma";
import { SectionType } from "./SectionType";
import { GradeLevelType } from "./GradeLevelType";
import { UserType } from "./UserType";

export type TeacherType = {
    id?: number;
    dateHired: Date | string;
    isOjt: Boolean;
    bloodType?: string;
    advisorySectionId?: number;
    civilStatusOther?: string;
    licenseExpiryDate: Date | string;
    licenseNumber: string;
    positionId: number;
    subjectSpecialization?: string;
    userId: number;
    civilStatus: CivilStatus;
    advisorySection?: SectionType;
    gradeLevel: GradeLevelType[];
    user: UserType;
}