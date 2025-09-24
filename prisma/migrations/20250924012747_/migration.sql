/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Distrito` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Distrito_nombre_key" ON "Distrito"("nombre");
