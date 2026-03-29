import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const system = await prisma.system.update({
    where: { id },
    data: body,
  })
  return NextResponse.json(system)
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await prisma.system.delete({ where: { id } })
  return NextResponse.json({ success: true })
}