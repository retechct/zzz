-- CreateTable
CREATE TABLE "Distrito" (
    "id_distrito" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "Distrito_pkey" PRIMARY KEY ("id_distrito")
);

-- CreateTable
CREATE TABLE "Vendedor" (
    "id_ven" SERIAL NOT NULL,
    "nom_ven" VARCHAR(25) NOT NULL,
    "ape_ven" VARCHAR(25) NOT NULL,
    "cel_ven" CHAR(9) NOT NULL,
    "id_distrito" INTEGER,

    CONSTRAINT "Vendedor_pkey" PRIMARY KEY ("id_ven")
);

-- AddForeignKey
ALTER TABLE "Vendedor" ADD CONSTRAINT "Vendedor_id_distrito_fkey" FOREIGN KEY ("id_distrito") REFERENCES "Distrito"("id_distrito") ON DELETE SET NULL ON UPDATE CASCADE;
