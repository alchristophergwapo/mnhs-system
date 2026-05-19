import { FamilyRelationShip } from "@/prisma/generated";

export type FamilyType = {
    id?: number;
    lastName: string;
    firstName: string;
    middleName?: string;
    nameExtension?: string;
    maidenName?: string;
    contactNumber: string;
    userId?: number;
    relationship: FamilyRelationShip;
}