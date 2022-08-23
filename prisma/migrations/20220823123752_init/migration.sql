/*
  Warnings:

  - You are about to drop the column `jahrgang` on the `Kurs` table. All the data in the column will be lost.
  - Added the required column `studienende` to the `Kurs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kurs" DROP COLUMN "jahrgang",
ADD COLUMN     "studienende" TIMESTAMP(3) NOT NULL;
