import { Gender, Role } from "@/src/prisma/src/generated/prisma";

export type UserType = {
    id?: number;
    avatar?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    nameExtension?: string;
    email?: string;
    contactNumber: string;
    gender: Gender | undefined;
    dateOfBirth: Date | string;
    placeOfBirth?: string;
    height?: number;
    weight?: number;
    religion?: string;
    citizenshipId?: number;
    role: Role;
}