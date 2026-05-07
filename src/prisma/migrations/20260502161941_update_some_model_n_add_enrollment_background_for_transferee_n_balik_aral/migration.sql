/*
  Warnings:

  - You are about to drop the column `isBalikAral` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `isTransferee` on the `Student` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StudentEntryType" AS ENUM ('TRANSFER', 'BALIK_ARAL');

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "isBalikAral",
DROP COLUMN "isTransferee";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nameExtension" TEXT;

-- CreateTable
CREATE TABLE "EnrollmentBackground" (
    "id" BIGSERIAL NOT NULL,
    "entryType" "StudentEntryType" NOT NULL,
    "lastGradeLevel" BIGINT,
    "lastSchool" TEXT,
    "lastSchoolID" TEXT,
    "lastSchoolAddress" TEXT,
    "lastSchoolYear" TEXT,
    "studentId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnrollmentBackground_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EnrollmentBackground_studentId_key" ON "EnrollmentBackground"("studentId");

-- AddForeignKey
ALTER TABLE "EnrollmentBackground" ADD CONSTRAINT "EnrollmentBackground_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
