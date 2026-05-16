import prisma from "../../lib/prisma";

/**
 * Asynchronously retrieves a user by their unique ID.
 * 
 * @param {number} id - The unique identifier of the user to retrieve.
 * @param {{ [key: string]: boolean }} [select] - An optional object specifying which fields to include in the returned user object. 
 *                                                Note: `id`, `avatar`, `email`, `firstName`, `lastName`, and `middleName` are always included.
 * @returns {Promise<User>} A promise that resolves to the retrieved user object.
 * @throws {Error} Throws an error if no user is found with the provided ID.
 */
export async function getUserById(
  id: number,
  select?: { [key: string]: boolean },
) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      ...select,
      id: true,
      avatar: true,
      email: true,
      firstName: true,
      lastName: true,
      middleName: true,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
}
