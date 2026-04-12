export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { checkSubscriptionStatus } from '@/lib/subscription'
import BillingContent from './BillingContent'

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  const user = await requireAuth(token)

  await checkSubscriptionStatus()

  const userWithSub = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      subscriptions: {
        include: { plan: true },
        orderBy: { startDate: 'desc' },
        take: 1,
      },
    },
  })

  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { price: 'asc' },
  })

  const pendingPayment = await prisma.payment.findFirst({
    where: { userId: user.id, status: { in: ['pending', 'waiting_verify'] } },
    orderBy: { createdAt: 'desc' },
  })

  const raw = userWithSub?.subscriptions[0] ?? null
  const subscription = raw
    ? {
        id: raw.id,
        status: raw.status,
        startDate: raw.startDate.toISOString(),
        endDate: raw.endDate.toISOString(),
        plan: raw.plan,
      }
    : null

  return (
    <BillingContent
      token={token!}
      user={{ id: user.id, name: user.name }}
      subscription={subscription}
      plans={plans}
      pendingPaymentId={pendingPayment?.id ?? null}
    />
  )
}
