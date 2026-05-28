/*
  Warnings:

  - Added the required column `tipo` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehiculo" ADD COLUMN     "capacidad" TEXT,
ADD COLUMN     "rutaId" INTEGER,
ADD COLUMN     "tipo" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehiculo" ADD CONSTRAINT "Vehiculo_rutaId_fkey" FOREIGN KEY ("rutaId") REFERENCES "Ruta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
