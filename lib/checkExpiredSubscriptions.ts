import { prisma } from '@/lib/prisma'

export async function checkExpiredSubscriptions(): Promise<number> {
  const now = new Date()
  const { count } = await prisma.subscription.updateMany({
    where: {
      status: { in: ['trial', 'active'] },
      endDate: { lt: now },
    },
    data: { status: 'expired' },
  })
  return count
}
