/*
  Warnings:

  - You are about to drop the column `gradeLevelId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `sectionId` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[LRN]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('STRAND', 'TVL_TRACK', 'ELECTIVE');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('RECEIVED', 'VERIFIED', 'ENROLLED', 'ASSIGNED');

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_gradeLevelId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_sectionId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "gradeLevelId",
DROP COLUMN "sectionId",
ADD COLUMN     "LRN" TEXT,
ADD COLUMN     "PSA" TEXT,
ADD COLUMN     "fatherName" TEXT,
ADD COLUMN     "guardianContact" TEXT,
ADD COLUMN     "guardianName" TEXT,
ADD COLUMN     "isBalikAral" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isNewStudent" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isTransferee" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "motherName" TEXT;

-- CreateTable
CREATE TABLE "Course" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT,
    "courseType" "CourseType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" BIGSERIAL NOT NULL,
    "enrollmentStatus" "EnrollmentStatus" NOT NULL DEFAULT 'RECEIVED',
    "enrollmentRemarks" TEXT,
    "cardImage" TEXT NOT NULL,
    "schoolYearStart" TIMESTAMP(3) NOT NULL,
    "schoolYearEnd" TIMESTAMP(3) NOT NULL,
    "gradeLevelId" BIGINT NOT NULL,
    "studentId" BIGINT NOT NULL,
    "sectionId" BIGINT NOT NULL,
    "courseId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentId_schoolYearStart_key" ON "Enrollment"("studentId", "schoolYearStart");

-- CreateIndex
CREATE UNIQUE INDEX "Student_LRN_key" ON "Student"("LRN");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_gradeLevelId_fkey" FOREIGN KEY ("gradeLevelId") REFERENCES "GradeLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
