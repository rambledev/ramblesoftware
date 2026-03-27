import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const showAll = searchParams.get('all') === 'true'

  const systems = await prisma.system.findMany({
    where: showAll ? {} : { isActive: true },
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(systems)
}

export async function POST(req: Request) {
  const body = await req.json()
  const count = await prisma.system.count()
  const system = await prisma.system.create({
    data: { ...body, order: count },
  })
  return NextResponse.json(system, { status: 201 })
}