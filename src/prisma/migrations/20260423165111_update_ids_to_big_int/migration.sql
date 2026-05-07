/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `Address` table. All the data in the column will be lost.
  - The primary key for the `GradeLevel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `teachers` on the `GradeLevel` table. All the data in the column will be lost.
  - You are about to drop the column `totalStudents` on the `GradeLevel` table. All the data in the column will be lost.
  - The primary key for the `Section` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `totalStudents` on the `Section` table. All the data in the column will be lost.
  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adviserId` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `benefitsId` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `citizenship` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `gradeLevel` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `lengthOfService` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the `Benefits` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[licenseNumber]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[advisorySectionId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barangay` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `zipCode` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `maxCapacity` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gradeLevelId` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseExpiryDate` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseNumber` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionId` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `civilStatus` on the `Teacher` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DualCitizenshipBy" AS ENUM ('BY_BIRTH', 'BY_NATURALIZATION');

-- CreateEnum
CREATE TYPE "Quarter" AS ENUM ('Q1', 'Q2', 'Q3', 'Q4');

-- CreateEnum
CREATE TYPE "CivilStatus" AS ENUM ('SINGLE', 'MARRIED', 'WIDOWED', 'SEPARATED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'SUPERADMIN', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_gradeLevelId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_gradeLevelId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_adviserId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_benefitsId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_teacherId_fkey";

-- DropIndex
DROP INDEX "Subject_gradeLevelId_key";

-- DropIndex
DROP INDEX "Teacher_adviserId_key";

-- DropIndex
DROP INDEX "Teacher_benefitsId_key";

-- DropIndex
DROP INDEX "Teacher_contactNumber_key";

-- DropIndex
DROP INDEX "Teacher_email_key";

-- DropIndex
DROP INDEX "Teacher_teacherId_key";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
DROP COLUMN "address",
ADD COLUMN     "barangay" TEXT NOT NULL,
ADD COLUMN     "houseNumber" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "subdivision" TEXT,
ALTER COLUMN "id" SET DATA TYPE BIGINT,
DROP COLUMN "zipCode",
ADD COLUMN     "zipCode" INTEGER NOT NULL,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GradeLevel" DROP CONSTRAINT "GradeLevel_pkey",
DROP COLUMN "teachers",
DROP COLUMN "totalStudents",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "GradeLevel_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Section" DROP CONSTRAINT "Section_pkey",
DROP COLUMN "totalStudents",
ADD COLUMN     "maxCapacity" INTEGER NOT NULL,
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "gradeLevelId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Section_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "gradeLevelId" SET DATA TYPE BIGINT,
ALTER COLUMN "teacherId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_pkey",
DROP COLUMN "adviserId",
DROP COLUMN "age",
DROP COLUMN "avatar",
DROP COLUMN "benefitsId",
DROP COLUMN "citizenship",
DROP COLUMN "contactNumber",
DROP COLUMN "dateOfBirth",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "gender",
DROP COLUMN "gradeLevel",
DROP COLUMN "height",
DROP COLUMN "lastName",
DROP COLUMN "lengthOfService",
DROP COLUMN "middleName",
DROP COLUMN "nationality",
DROP COLUMN "religion",
DROP COLUMN "teacherId",
DROP COLUMN "weight",
ADD COLUMN     "advisorySectionId" BIGINT,
ADD COLUMN     "civilStatusOther" TEXT,
ADD COLUMN     "gradeLevelId" BIGINT NOT NULL,
ADD COLUMN     "licenseExpiryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "licenseNumber" TEXT NOT NULL,
ADD COLUMN     "positionId" BIGINT NOT NULL,
ADD COLUMN     "subjectSpecialization" TEXT,
ADD COLUMN     "userId" BIGINT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE BIGINT,
DROP COLUMN "civilStatus",
ADD COLUMN     "civilStatus" "CivilStatus" NOT NULL,
ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Benefits";

-- CreateTable
CREATE TABLE "Citizenship" (
    "id" BIGINT NOT NULL,
    "filipino" BOOLEAN NOT NULL,
    "dualCitizenship" BOOLEAN,
    "dualCitizenshipBy" "DualCitizenshipBy",
    "countryOfDualCitizenship" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Citizenship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Postion" (
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Postion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" BIGINT NOT NULL,
    "gradeLevel" INTEGER NOT NULL,
    "sectionId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentGrade" (
    "id" BIGINT NOT NULL,
    "studentId" BIGINT NOT NULL,
    "subjectId" BIGINT NOT NULL,
    "quarter" "Quarter" NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGINT NOT NULL,
    "avatar" TEXT,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "contactNumber" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "religion" TEXT,
    "gender" "Gender" NOT NULL,
    "height" TEXT,
    "weight" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "permanentAddressId" BIGINT NOT NULL,
    "residentialAddressId" BIGINT,
    "citizenshipId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_sectionId_key" ON "Student"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentGrade_studentId_subjectId_quarter_key" ON "StudentGrade"("studentId", "subjectId", "quarter");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_contactNumber_key" ON "User"("contactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_permanentAddressId_key" ON "User"("permanentAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "User_residentialAddressId_key" ON "User"("residentialAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "User_citizenshipId_key" ON "User"("citizenshipId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_licenseNumber_key" ON "Teacher"("licenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_advisorySectionId_key" ON "Teacher"("advisorySectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userId_key" ON "Teacher"("userId");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_gradeLevelId_fkey" FOREIGN KEY ("gradeLevelId") REFERENCES "GradeLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentGrade" ADD CONSTRAINT "StudentGrade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentGrade" ADD CONSTRAINT "StudentGrade_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_gradeLevelId_fkey" FOREIGN KEY ("gradeLevelId") REFERENCES "GradeLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_advisorySectionId_fkey" FOREIGN KEY ("advisorySectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_gradeLevelId_fkey" FOREIGN KEY ("gradeLevelId") REFERENCES "GradeLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Postion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_permanentAddressId_fkey" FOREIGN KEY ("permanentAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_residentialAddressId_fkey" FOREIGN KEY ("residentialAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_citizenshipId_fkey" FOREIGN KEY ("citizenshipId") REFERENCES "Citizenship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
