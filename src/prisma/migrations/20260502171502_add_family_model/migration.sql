-- CreateEnum
CREATE TYPE "FamilyRelationShip" AS ENUM ('MOTHER', 'FATHER', 'GUARDIAN');

-- CreateTable
CREATE TABLE "Family" (
    "id" BIGSERIAL NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "nameExtension" TEXT,
    "maidenName" TEXT,
    "contactNumber" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "relationShip" "FamilyRelationShip" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
