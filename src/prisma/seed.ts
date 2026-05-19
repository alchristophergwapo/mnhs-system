import { PrismaClient, Prisma, Role } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { faker } from "@faker-js/faker";

// Create a new Prisma adapter using PrismaPg with the provided connection string
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

// Create a new Prisma client using the adapter
const prisma = new PrismaClient({
    adapter,
});

/**
 * Creates a mock teacher object with randomly generated personal, contact, and professional details.
 * This object is structured for use with Prisma's nested create operations, including related 
 * citizenship, permanent address, position, and grade level records.
 * 
 * @returns {Object} A mock teacher data object formatted for database seeding.
 * @returns {string} return.role - The randomly assigned user role (e.g., "TEACHER", "ADMIN", "STUDENT", "SUPERADMIN").
 * @returns {string} return.firstName - The generated first name.
 * @returns {string} return.lastName - The generated last name.
 * @returns {string} return.gender - The randomly assigned gender ("MALE" or "FEMALE").
 * @returns {Date} return.dateOfBirth - The generated birthdate (age between 18 and 50).
 * @returns {string} return.contactNumber - The generated national phone number.
 * @returns {string} return.username - The generated username formatted as "lastName.firstName_MM_DD_YYYY".
 * @returns {string} return.password - The default password ("12345678").
 * @returns {Object} return.citizenship - The nested Prisma create object for citizenship data.
 * @returns {Object} return.permanentAddress - The nested Prisma create object for address data.
 * @returns {Object} return.teacher - The nested Prisma create object for teacher-specific data, including position and grade level.
 */
// const createTeacher = () => {
//     const birthDate = faker.date.birthdate({ min: 18, max: 50, mode: "age" });
//     const firstName = faker.person.firstName();
//     const lastName = faker.person.lastName();
//     return {
//         role: faker.helpers.arrayElement(["TEACHER", "ADMIN", "STUDENT", "SUPERADMIN"]),
//         firstName: firstName,
//         lastName: lastName,
//         gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
//         dateOfBirth: birthDate,
//         contactNumber: faker.phone.number({ style: "national" }),
//         username: lastName + "." + firstName + "_" + birthDate.getMonth() + "_" + birthDate.getDate() + "_" + birthDate.getFullYear(),
//         password: "12345678",
//         citizenship: {
//             create: {
//                 filipino: faker.datatype.boolean(),
//             }
//         },
//         permanentAddress: {
//             create: {
//                 barangay: faker.location.streetAddress(),
//                 city: faker.location.city(),
//                 province: faker.location.county(),
//                 zipCode: faker.number.int({ min: 1000, max: 9999 })
//             }
//         },
//         teacher: {
//             create: {
//                 position: {
//                     create: {
//                         name: faker.person.jobTitle(),
//                     }
//                 },
//                 civilStatus: faker.helpers.arrayElement(["SINGLE", "MARRIED", "WIDOWED", "SEPARATED"]),
//                 dateHired: faker.date.between({ from: "2000-01-01", to: new Date() }),
//                 licenseNumber: String(faker.number.int({ min: 100000, max: 999999 })),
//                 licenseExpiryDate: faker.date.future(),
//                 gradeLevel: {
//                     connectOrCreate: {
//                         create: {
//                             name: "GRADE 7",
//                             gradeLevelNumber: faker.number.int({ min: 7, max: 12 })
//                         },
//                         where: {
//                             name: "GRADE 7",
//                         }
//                     }
//                 },
//             }
//         }
//     }
// };

// Create 20 teachers with random data. This will be used to seed the database. You can change the count to any number you want.
// const teacherData: Prisma.UserCreateInput[] = [];
// const teacherData: Prisma.UserCreateInput[] = faker.helpers.multiple(
//     createTeacher,
//     { count: 20 },
// );

const createStudent = () => {
    const birthDate = faker.date.birthdate({ min: 11, max: 50, mode: "age" });
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        role: Role.STUDENT,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
        dateOfBirth: faker.date.birthdate({ min: 11, max: 50, mode: "age" }),
        contactNumber: faker.phone.number({ style: "national" }),
        username: lastName + "." + firstName + "_" + birthDate.getMonth() + "_" + birthDate.getDate() + "_" + birthDate.getFullYear(),
        password: "12345678",
        citizenship: {
            create: {
                filipino: true,
            }
        },
        permanentAddress: {
            create: {
                barangay: faker.location.streetAddress(),
                city: faker.location.city(),
                province: faker.location.county(),
                zipCode: faker.number.int({ min: 1000, max: 9999 }),
            }
        },
        student: {
            create: {
                gradeLevelId: BigInt(1),
                sectionId: BigInt(1),
            }
        }
    }
}

const studentData: Prisma.UserCreateInput[] = faker.helpers.multiple(
    createStudent,
    { count: 20 },
);

/**
 * The main function of the script.
 * It creates 20 teachers with random data in the database.
 * @returns {Promise<void>} - A promise that resolves when all teachers have been created.
 */
export async function main() {
    // for (const u of teacherData) {
    //     await prisma.user.create({ data: u });
    // }
    for (const u of studentData) {
        await prisma.user.create({ data: u });
    }
}

main();
