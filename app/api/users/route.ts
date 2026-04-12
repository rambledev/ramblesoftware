import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateAccessToken } from '@/lib/auth'

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      subscriptions: {
        include: { plan: true },
        orderBy: { startDate: 'desc' },
        take: 1,
      },
    },
  })
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  try {
    const { name, lineId } = await req.json()
    const accessToken = generateAccessToken()
    const user = await prisma.user.create({ data: { name, lineId, accessToken } })
    // Return the dashboard link so admin can copy-paste it to the customer
    return NextResponse.json(
      { ...user, dashboardUrl: `/dashboard?token=${accessToken}` },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
