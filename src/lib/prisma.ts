import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/prisma";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

const adapter = new PrismaPg({ connectionString });

/** 
 * Define a global prisma variable so that it can be accessed from anywhere
*/
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Define the prisma client
 * If the prisma client is not defined, create a new instance and set it to the global variable
 * @returns {PrismaClient}
*/
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter,
  omit: {
    user: { password: true },
  },
});

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
