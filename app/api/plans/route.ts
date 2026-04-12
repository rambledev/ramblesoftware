import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { price: 'asc' },
  })
  return NextResponse.json(plans)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const plan = await prisma.plan.create({ data: body })
    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
