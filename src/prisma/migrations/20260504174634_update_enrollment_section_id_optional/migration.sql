-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_sectionId_fkey";

-- AlterTable
ALTER TABLE "Enrollment" ALTER COLUMN "sectionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
