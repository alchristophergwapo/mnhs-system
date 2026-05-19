import { UserType } from "@types";

export type SectionsType = {
    id: number;
    name: string;
    maxCapacity: number | null;
    gradeLevelId: number | null;
    gradeLevel: {
        id: number | null;
        name: string;
        gradeLevelNumber: number | null;
    } | null;
    _count: {
        students: number
    };
    adviser: UserType | null;
    femaleCount?: number;
    maleCount?: number;
}

export type GetSectionsApiResponse = { sections: SectionsType[]; totalSections: number; totalStudents: number; totalAvailableSeats: number; };
export type GetSectionsApiArg = { q: string };