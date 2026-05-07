/*
  Warnings:

  - The values [STRAND] on the enum `CourseType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isNewStudent` on the `Student` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('FIRST', 'SECOND');

-- AlterEnum
BEGIN;
CREATE TYPE "CourseType_new" AS ENUM ('ACADEMIC_TRACK', 'TVL_TRACK', 'ELECTIVE');
ALTER TABLE "Course" ALTER COLUMN "courseType" TYPE "CourseType_new" USING ("courseType"::text::"CourseType_new");
ALTER TYPE "CourseType" RENAME TO "CourseType_old";
ALTER TYPE "CourseType_new" RENAME TO "CourseType";
DROP TYPE "public"."CourseType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "semester" "Semester";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "isNewStudent",
ADD COLUMN     "IPCommunity" TEXT,
ADD COLUMN     "belongsToIP" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "motherTongue" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "placeOfBirth" TEXT;
