/*
  Warnings:

  - You are about to drop the column `studienjahr` on the `Kurs` table. All the data in the column will be lost.
  - Added the required column `jahrgang` to the `Kurs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kurs" DROP COLUMN "studienjahr",
ADD COLUMN     "jahrgang" TEXT NOT NULL;
