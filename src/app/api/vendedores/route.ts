import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function GET() {
  try {
    const vendedores = await prisma.vendedor.findMany({
      include: {
        distrito: true,
        especialidad: true, 
      },
      orderBy: {
        id_ven: 'asc',
      }
    });
    return NextResponse.json(vendedores);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener vendedores' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const data = await request.json();
    const nuevoVendedor = await prisma.vendedor.create({
      data: {
        nom_ven: data.nom_ven,
        ape_ven: data.ape_ven,
        cel_ven: data.cel_ven,
        id_distrito: Number(data.id_distrito),
        id_especialidad: Number(data.id_especialidad), 
      },
    });
    return NextResponse.json(nuevoVendedor, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al crear vendedor' }, { status: 500 });
  }
}