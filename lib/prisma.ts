import { PrismaClient } from "@/prisma/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

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
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    }),
  });

/** 
 * Check if the environment is not production and set the prisma client to the global variable
 */
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
