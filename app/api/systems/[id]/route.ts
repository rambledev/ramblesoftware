import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  const system = await prisma.system.update({
    where: { id: params.id },
    data: body,
  })
  return NextResponse.json(system)
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.system.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}