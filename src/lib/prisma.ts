import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/prisma";

/** 
 * Define a global prisma variable so that it can be accessed from anywhere
 */
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

/**
 * Define the prisma client
 * If the prisma client is not defined, create a new instance and set it to the global variable
 * @returns {PrismaClient}
 */
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    }),
  });

globalForPrisma.prisma = prisma;

export default prisma;
