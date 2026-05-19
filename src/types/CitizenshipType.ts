export type CitizenshipType = {
    id?: number;
    filipino: boolean;
    dualCitizenship?: boolean;
    dualCitizenshipBy?: "BY_BIRTH" | "BY_NATURALIZATION" | undefined;
    countryOfDualCitizenship?: string;
};