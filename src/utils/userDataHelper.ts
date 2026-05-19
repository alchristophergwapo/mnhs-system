import { AddressType } from "@types";


/**
 * Generates a username based on the provided first name, last name, and date of birth.
 * The username is formatted as: `firstname.lastname_month_day_year`.
 * Note: `getMonth()` is zero-based, so 1 is added to reflect the standard calendar month.
 *
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {Date} dateOfBirth - The date of birth of the user.
 * @returns {string} The generated username string.
 */
export function generateUsername(firstName: string, lastName: string, dateOfBirth: Date): string {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}_${dateOfBirth.getMonth() + 1}_${dateOfBirth.getDate()}_${dateOfBirth.getFullYear()}`;
}

/**
 * Normalizes the address data by extracting specific fields and ensuring
 * the `zipCode` is converted to a number.
 *
 * @param {AddressType} address - The raw address object containing various address fields.
 * @returns {Object} The normalized address object.
 * @returns {string} return.barangay - The barangay of the address.
 * @returns {string} return.city - The city of the address.
 * @returns {string} return.province - The province of the address.
 * @returns {number} return.zipCode - The zip code of the address, converted to a number.
 * @returns {string} return.houseNumber - The house number of the address.
 * @returns {string} return.street - The street of the address.
 * @returns {string} return.subdivision - The subdivision of the address.
 */
export function normalizeAddressData(address: AddressType) {
    return {
        barangay: address.barangay,
        city: address.city,
        province: address.province,
        zipCode: Number(address.zipCode),
        houseNumber: address.houseNumber,
        street: address.street,
        subdivision: address.subdivision,
    };
}
