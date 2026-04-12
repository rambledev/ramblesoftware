import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'
import { generateQRDataUrl } from '@/lib/promptpay'

function generateRefCode(): string {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `RM-${d}-${rand}`
}

export async function POST(req: NextRequest) {
  try {
    const { token, subscriptionId } = await req.json()

    const user = await getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: { plan: true },
    })

    if (!subscription || subscription.userId !== user.id) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    const amount = subscription.plan.promoPrice ?? subscription.plan.price

    // Create Order + OrderItem + Payment in one transaction
    let refCode = generateRefCode()
    for (let i = 0; i < 5; i++) {
      const exists = await prisma.payment.findUnique({ where: { refCode } })
      if (!exists) break
      refCode = generateRefCode()
    }

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          subscriptionId,
          status: 'pending',
          totalAmount: amount,
          items: {
            create: {
              planId: subscription.planId,
              quantity: 1,
              price: amount,
            },
          },
        },
      })

      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          userId: user.id,
          amount,
          method: 'promptpay',
          refCode,
          status: 'pending',
        },
      })

      return newOrder
    })

    const payment = await prisma.payment.findUnique({ where: { orderId: order.id } })
    const qrDataUrl = await generateQRDataUrl(amount)

    return NextResponse.json({ payment, qrDataUrl }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
