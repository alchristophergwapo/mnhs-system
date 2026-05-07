/*
  Warnings:

  - A unique constraint covering the columns `[teacherId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[benefitsId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "benefitsId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bloodType" TEXT,
ADD COLUMN     "citizenship" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "height" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "religion" TEXT,
ADD COLUMN     "teacherId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "weight" TEXT;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Benefits" (
    "id" SERIAL NOT NULL,
    "umidIdNumber" TEXT,
    "sssIdNumber" TEXT,
    "pagIbigIdNumber" TEXT,
    "philHealthIdNumber" TEXT,
    "philSysNumber" TEXT,
    "tinNumber" TEXT,
    "agencyEmployeeNumber" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Benefits_id_key" ON "Benefits"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_teacherId_key" ON "Teacher"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_benefitsId_key" ON "Teacher"("benefitsId");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_benefitsId_fkey" FOREIGN KEY ("benefitsId") REFERENCES "Benefits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
