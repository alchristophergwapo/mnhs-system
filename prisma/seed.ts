import { PrismaClient, Prisma } from "./src/generated/prisma/client";
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
 * Calculate the age of a person based on their birthdate.
 * The age is calculated as of the current year, and will be
 * decremented if the birthday has not yet occurred this year.
 * @param {Date} birthDate - The date of birth of the person.
 * @returns {number} The age of the person as of the current year.
 */
function getAge(birthDate: Date) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birthday hasn't occurred yet this year
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/**
 * Generates a random teacher object with the following properties:
 * - avatar: a random avatar URL
 * - firstName: a random first name
 * - middleName: a random middle name
 * - lastName: a random last name
 * - contactNumber: a random contact number
 * - gradeLevel: a random grade level from Grade 7 to Grade 12
 * - dateOfBirth: a random date of birth between 18 and 50 years old
 * - age: the age of the teacher as of the current year
 * - gender: a random gender
 * - civilStatus: a random civil status
 * - dateHired: a random date hired between 2000-01-01 and the current date
 * - lengthOfService: a random length of service between 1 and 30 years
 * - subjects: an array of subjects with the following properties:
 *   - name: a random subject name from Math, English, Filipino, Science, Biology, Chemistry, and Physics
 * We use the faker-js library to generate random data for the teacher object.
 * @return {Object} A random teacher object
 */
const createTeacher = () => {
  const birthDate = faker.date.birthdate({ min: 18, max: 50, mode: "age" });
  return {
    avatar: faker.image.avatar(),
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    contactNumber: faker.phone.number(),
    gradeLevel: faker.helpers.arrayElement([
      "Grade 7",
      "Grade 8",
      "Grade 9",
      "Grade 10",
      "Grade 11",
      "Grade 12",
    ]),
    dateOfBirth: birthDate,
    age: getAge(birthDate),
    gender: faker.helpers.arrayElement(["Male", "Female"]),
    civilStatus: faker.helpers.arrayElement([
      "Single",
      "Married",
      "Widowed",
      "Separated",
    ]),
    dateHired: faker.date.between({ from: "2000-01-01", to: new Date() }),
    lengthOfService: faker.number.int({ min: 1, max: 30 }),
    subjects: {
      create: [
        {
          name: faker.helpers.arrayElement([
            "Math",
            "English",
            "Filipino",
            "Science",
            "Biology",
            "Chemistry",
            "Physics",
          ]),
        },
      ],
    },
  };
};

// Create 20 teachers with random data. This will be used to seed the database. You can change the count to any number you want.
const teacherData: Prisma.TeacherCreateInput[] = faker.helpers.multiple(
  createTeacher,
  { count: 20 },
);

/**
 * The main function of the script.
 * It creates 20 teachers with random data in the database.
 * @returns {Promise<void>} - A promise that resolves when all teachers have been created.
 */
export async function main() {
  for (const u of teacherData) {
    await prisma.teacher.create({ data: u });
  }
}

main();
