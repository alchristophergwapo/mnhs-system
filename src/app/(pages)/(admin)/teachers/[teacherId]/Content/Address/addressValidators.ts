import z from "zod";

export const houseNumber = z.string().max(50, "House/Block/Lot number cannot be greater than 50 characters").nullish();
export const street = z.string().max(50, "Street name cannot be greater than 50 characters").nullish();
export const subdivision = z.string().max(50, "Subdivision name cannot be greater than 50 characters").nullish();
export const city = z.string().max(20, "City name cannot be greater than 20 characters").nullish();
export const barangay = z.string().max(50, "Barangay name cannot be greater than 50 characters").nullish();
export const province = z.string()
    .max(20, "Province name cannot be greater than 50 characters").nullish();
export const zipCode = z.coerce.string().max(4, "Zip code cannot be greater than 4 characters").nullish();

export const cityRequired = z.string().nonempty("City/Municipality name is required").min(3, "City name cannot be lesser than 3 characters").max(20, "City name cannot be greater than 20 characters");
export const barangayRequired = z.string().nonempty("Barangay name is required").min(3, "Barangay name cannot be lesser than 3 characters")
    .max(50, "Barangay name cannot be greater than 50 characters");
export const provinceRequired = z.string().nonempty("Province name is required").min(4, "Province name cannot be lesser than 4 characters")
    .max(20, "Province name cannot be greater than 50 characters");
export const zipCodeRequired = z.coerce.string().nonempty("Zip code is required")
    .min(4, "Zip code cannot be lesser than 4 characters").max(4, "Zip code cannot be greater than 4 characters")
    ;