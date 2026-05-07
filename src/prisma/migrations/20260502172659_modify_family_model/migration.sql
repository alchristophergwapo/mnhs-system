/*
  Warnings:

  - You are about to drop the column `relationShip` on the `Family` table. All the data in the column will be lost.
  - Added the required column `relationship` to the `Family` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Family" DROP COLUMN "relationShip",
ADD COLUMN     "relationship" "FamilyRelationShip" NOT NULL;
