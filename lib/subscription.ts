import { prisma } from '@/lib/prisma'

export function getRemainingDays(endDate: string): number {
  const diffMs = new Date(endDate).getTime() - Date.now()
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
}

export function getProgressPercent(startDate: string, endDate: string): number {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  const now = Date.now()
  if (now >= end) return 100
  if (now <= start) return 0
  return Math.round(((now - start) / (end - start)) * 100)
}

export const statusLabel: Record<string, string> = {
  trial: 'ทดลองใช้งาน',
  active: 'ใช้งานอยู่',
  expired: 'หมดอายุ',
}

export const statusBadgeClass: Record<string, string> = {
  trial: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  active: 'bg-green-100 text-green-700 border-green-200',
  expired: 'bg-red-100 text-red-700 border-red-200',
}

/**
 * Mark all subscriptions whose endDate has passed as expired.
 * Call this at the start of any page that checks subscription status.
 */
export async function checkSubscriptionStatus(): Promise<void> {
  await prisma.subscription.updateMany({
    where: {
      status: { in: ['trial', 'active'] },
      endDate: { lt: new Date() },
    },
    data: { status: 'expired' },
  })
}
