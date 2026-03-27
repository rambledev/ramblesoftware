import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { ids } = await req.json() as { ids: string[] }

  await Promise.all(
    ids.map((id, index) =>
      prisma.system.update({
        where: { id },
        data: { order: index },
      })
    )
  )

  return NextResponse.json({ success: true })
}