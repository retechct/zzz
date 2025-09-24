-- AlterTable
ALTER TABLE "Vendedor" ADD COLUMN     "id_especialidad" INTEGER;

-- CreateTable
CREATE TABLE "Especialidad" (
    "id_especialidad" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Especialidad_pkey" PRIMARY KEY ("id_especialidad")
);

-- CreateIndex
CREATE UNIQUE INDEX "Especialidad_nombre_key" ON "Especialidad"("nombre");

-- AddForeignKey
ALTER TABLE "Vendedor" ADD CONSTRAINT "Vendedor_id_especialidad_fkey" FOREIGN KEY ("id_especialidad") REFERENCES "Especialidad"("id_especialidad") ON DELETE SET NULL ON UPDATE CASCADE;
