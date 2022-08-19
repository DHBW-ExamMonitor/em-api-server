-- DropForeignKey
ALTER TABLE "Pruefungsteilnahme" DROP CONSTRAINT "Pruefungsteilnahme_pruefungsterminId_fkey";

-- DropForeignKey
ALTER TABLE "Pruefungsteilnahme" DROP CONSTRAINT "Pruefungsteilnahme_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Pruefungstermin" DROP CONSTRAINT "Pruefungstermin_modulId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_kursId_fkey";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_kursId_fkey" FOREIGN KEY ("kursId") REFERENCES "Kurs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pruefungstermin" ADD CONSTRAINT "Pruefungstermin_modulId_fkey" FOREIGN KEY ("modulId") REFERENCES "Modul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pruefungsteilnahme" ADD CONSTRAINT "Pruefungsteilnahme_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pruefungsteilnahme" ADD CONSTRAINT "Pruefungsteilnahme_pruefungsterminId_fkey" FOREIGN KEY ("pruefungsterminId") REFERENCES "Pruefungstermin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
