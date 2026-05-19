import { UserType, SectionType as BaseSectionType } from "@types";

export type SectionsType = Partial<BaseSectionType> & {
    _count: {
        students: number
    };
    adviser: UserType | null;
    femaleCount?: number;
    maleCount?: number;
}

export type GetSectionsApiResponse = { sections: SectionsType[]; totalSections: number; totalStudents: number; totalAvailableSeats: number; };
export type GetSectionsApiArg = { q: string };