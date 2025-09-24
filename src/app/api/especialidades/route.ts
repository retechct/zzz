// src/app/api/especialidades/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const especialidades = await prisma.especialidad.findMany({
      orderBy: {
        nombre: 'asc'
      }
    });
    return NextResponse.json(especialidades);
  } catch (error) {
    return NextResponse.json({ message: 'Error al obtener especialidades' }, { status: 500 });
  }
}