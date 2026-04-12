import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paymentId } = await params
    const { action, note } = await req.json()

    if (!['approve', 'reject', 'free_approve'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        order: {
          include: { subscription: { include: { plan: true } } },
        },
      },
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    if (action === 'reject') {
      const [updatedPayment] = await prisma.$transaction([
        prisma.payment.update({
          where: { id: paymentId },
          data: { status: 'rejected', verifiedAt: new Date(), verifiedBy: 'admin' },
        }),
        prisma.order.update({
          where: { id: payment.orderId },
          data: { status: 'rejected' },
        }),
      ])

      await prisma.adminLog.create({
        data: { adminId: 'admin', action: 'reject_payment', targetId: paymentId, note },
      })

      return NextResponse.json({ payment: updatedPayment })
    }

    // approve or free_approve
    const subscription = payment.order.subscription
    if (!subscription) {
      return NextResponse.json({ error: 'No subscription linked to this order' }, { status: 400 })
    }

    const plan = subscription.plan
    const durationDays = plan.durationDays ?? 30

    const now = new Date()
    const currentEnd = new Date(subscription.endDate)
    const base = currentEnd > now ? currentEnd : now
    const newEndDate = new Date(base)
    newEndDate.setDate(newEndDate.getDate() + durationDays)

    const paymentStatus = action === 'free_approve' ? 'verified' : 'verified'
    const orderStatus = action === 'free_approve' ? 'free_approved' : 'paid'

    const [updatedPayment] = await prisma.$transaction([
      prisma.payment.update({
        where: { id: paymentId },
        data: { status: paymentStatus, verifiedAt: new Date(), verifiedBy: 'admin' },
      }),
      prisma.order.update({
        where: { id: payment.orderId },
        data: { status: orderStatus },
      }),
      prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: 'active', endDate: newEndDate },
      }),
    ])

    await prisma.adminLog.create({
      data: { adminId: 'admin', action: `${action}_payment`, targetId: paymentId, note },
    })

    return NextResponse.json({ payment: updatedPayment })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
