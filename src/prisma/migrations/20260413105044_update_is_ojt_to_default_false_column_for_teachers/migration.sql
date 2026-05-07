/*
  Warnings:

  - Made the column `isOjt` on table `Teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "isOjt" SET NOT NULL,
ALTER COLUMN "isOjt" SET DEFAULT false;
