/*
  Warnings:

  - You are about to drop the column `gradeLevel` on the `Student` table. All the data in the column will be lost.
  - Added the required column `gradeLevelId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "gradeLevel",
ADD COLUMN     "gradeLevelId" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_gradeLevelId_fkey" FOREIGN KEY ("gradeLevelId") REFERENCES "GradeLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
