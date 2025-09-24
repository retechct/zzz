// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log(`Iniciando el sembrado...`)

 
  const distritos = [
    { nombre: 'San Juan de Lurigancho' },
    { nombre: 'San Martín de Porres' },
    { nombre: 'Los Olivos' },
    { nombre: 'Comas' },
  ];
  await prisma.distrito.createMany({
    data: distritos,
  });

  
  const especialidades = [
    { nombre: 'Tecnología' },
    { nombre: 'Inmobiliaria' },
    { nombre: 'Salud y Bienestar' },
    { nombre: 'Automotriz' },
    { nombre: 'Seguros' },
  ];
  await prisma.especialidad.createMany({
    data: especialidades,
  });

  console.log(`Sembrado finalizado.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })