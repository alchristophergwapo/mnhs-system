/*
  Warnings:

  - You are about to drop the column `PSA` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `fatherName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `guardianContact` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `guardianName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "PSA",
DROP COLUMN "fatherName",
DROP COLUMN "guardianContact",
DROP COLUMN "guardianName",
DROP COLUMN "motherName";
