import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const distritos = await prisma.distrito.findMany({
      orderBy: {
        nombre: 'asc'
      }
    });
    return NextResponse.json(distritos);
  } catch (error) {
    return NextResponse.json({ message: 'Error al obtener distritos' }, { status: 500 });
  }
}