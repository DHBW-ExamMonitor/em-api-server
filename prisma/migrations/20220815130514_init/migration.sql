-- CreateEnum
CREATE TYPE "PruefungsteilnahmeStatus" AS ENUM ('BESTANDEN', 'NICHT_BESTANDEN', 'ANGERECHNET', 'KRANK_MIT_ATTEST', 'FEHLEN_OHNE_GRUND');

-- CreateEnum
CREATE TYPE "Versuch" AS ENUM ('ERSTVERSUCH', 'ZWEITVERSUCH', 'DRITTVERSUCH');

-- CreateEnum
CREATE TYPE "Studentenstatus" AS ENUM ('IMMATRIKULIERT', 'EXMATRIKULIERT');

-- CreateTable
CREATE TABLE "Kurs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "studienjahr" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "matrikelnummer" TEXT NOT NULL,
    "studentenStatus" "Studentenstatus" NOT NULL,
    "kursId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modul" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vorlesungen" TEXT NOT NULL,
    "aktiv" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Modul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pruefungstermin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hilfsmittel" TEXT,
    "modulId" TEXT NOT NULL,
    "raeume" TEXT NOT NULL,
    "aufsichtsPersonen" TEXT NOT NULL,
    "notizen" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pruefungstermin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pruefungsteilnahme" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "pruefungsterminId" TEXT NOT NULL,
    "pruefungsteilnahmeStatus" "PruefungsteilnahmeStatus" NOT NULL,
    "versuch" "Versuch" NOT NULL,

    CONSTRAINT "Pruefungsteilnahme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KursToPruefungstermin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_matrikelnummer_key" ON "Student"("matrikelnummer");

-- CreateIndex
CREATE UNIQUE INDEX "_KursToPruefungstermin_AB_unique" ON "_KursToPruefungstermin"("A", "B");

-- CreateIndex
CREATE INDEX "_KursToPruefungstermin_B_index" ON "_KursToPruefungstermin"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_kursId_fkey" FOREIGN KEY ("kursId") REFERENCES "Kurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pruefungstermin" ADD CONSTRAINT "Pruefungstermin_modulId_fkey" FOREIGN KEY ("modulId") REFERENCES "Modul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pruefungsteilnahme" ADD CONSTRAINT "Pruefungsteilnahme_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pruefungsteilnahme" ADD CONSTRAINT "Pruefungsteilnahme_pruefungsterminId_fkey" FOREIGN KEY ("pruefungsterminId") REFERENCES "Pruefungstermin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KursToPruefungstermin" ADD CONSTRAINT "_KursToPruefungstermin_A_fkey" FOREIGN KEY ("A") REFERENCES "Kurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KursToPruefungstermin" ADD CONSTRAINT "_KursToPruefungstermin_B_fkey" FOREIGN KEY ("B") REFERENCES "Pruefungstermin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
