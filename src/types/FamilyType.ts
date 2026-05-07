import { FamilyRelationShip } from "@/src/prisma/src/generated/prisma";

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