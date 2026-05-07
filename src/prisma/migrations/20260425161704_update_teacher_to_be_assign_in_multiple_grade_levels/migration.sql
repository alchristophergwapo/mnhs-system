/*
  Warnings:

  - You are about to drop the column `gradeLevelId` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_gradeLevelId_fkey";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "gradeLevelId";

-- CreateTable
CREATE TABLE "_GradeLevelToTeacher" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL,

    CONSTRAINT "_GradeLevelToTeacher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GradeLevelToTeacher_B_index" ON "_GradeLevelToTeacher"("B");

-- AddForeignKey
ALTER TABLE "_GradeLevelToTeacher" ADD CONSTRAINT "_GradeLevelToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "GradeLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeLevelToTeacher" ADD CONSTRAINT "_GradeLevelToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
