export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { checkSubscriptionStatus, getRemainingDays, statusBadgeClass, statusLabel } from '@/lib/subscription'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, LayoutDashboard, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react'
import DashboardCard from '@/components/customer/DashboardCard'

const statusIcon = {
  trial: Clock,
  active: CheckCircle,
  expired: XCircle,
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  const user = await requireAuth(token)

  // Expire any overdue subscriptions before rendering
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

  const sub = userWithSub?.subscriptions[0] ?? null

  // Guard: expired → force billing
  if (sub?.status === 'expired') {
    redirect(`/billing?token=${token}`)
  }

  const remaining = sub ? getRemainingDays(sub.endDate.toISOString()) : 0
  const badge = sub ? (statusBadgeClass[sub.status] ?? statusBadgeClass.expired) : null
  const label = sub ? (statusLabel[sub.status] ?? 'ไม่ทราบสถานะ') : null
  const Icon = sub ? (statusIcon[sub.status as keyof typeof statusIcon] ?? XCircle) : null

  const isUrgent = sub && sub.status === 'trial' && remaining <= 2

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-[#0F2557] text-white">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center justify-between">
          <p className="font-display text-xl font-bold">
            Ramble<span className="text-[#FBBF24]">Software</span>
          </p>
          <div className="flex items-center gap-1.5 text-slate-300 text-sm">
            <LayoutDashboard size={14} />
            Dashboard
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        {/* Greeting */}
        <div>
          <p className="text-slate-400 text-sm">ยินดีต้อนรับ</p>
          <h1 className="font-display text-2xl font-bold text-[#0F2557]">
            {user.name ?? 'คุณผู้ใช้งาน'} 👋
          </h1>
        </div>

        {sub ? (
          <>
            {/* Status banner */}
            {isUrgent ? (
              <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-2xl p-4">
                <AlertTriangle size={20} className="text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-orange-700">ใกล้หมดอายุ!</p>
                  <p className="text-orange-600 text-sm mt-0.5">
                    เหลือเวลาใช้งาน {remaining} วัน กรุณาต่ออายุก่อนหมด
                  </p>
                </div>
              </div>
            ) : (
              <div className={`flex items-start gap-3 rounded-2xl p-4 border ${badge}`}>
                {Icon && <Icon size={20} className="mt-0.5 shrink-0" />}
                <div>
                  <p className="font-semibold">
                    {sub.status === 'trial'
                      ? `คุณกำลังทดลองใช้งาน (เหลือ ${remaining} วัน)`
                      : label}
                  </p>
                  {sub.status === 'active' && (
                    <p className="text-sm mt-0.5 opacity-80">
                      หมดอายุ{' '}
                      {new Date(sub.endDate).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Main stats card */}
            <DashboardCard
              status={sub.status}
              startDate={sub.startDate.toISOString()}
              endDate={sub.endDate.toISOString()}
              plan={sub.plan}
            />

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="#"
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#0F2557] text-white font-semibold hover:bg-[#1a3a72] transition-colors text-sm"
              >
                เริ่มใช้งานระบบ
                <ArrowRight size={16} />
              </a>
              <Link
                href={`/billing?token=${token}`}
                className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold transition-colors text-sm ${
                  isUrgent
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-[#1A56DB] text-white hover:bg-[#1648c0]'
                }`}
              >
                {isUrgent ? 'ต่ออายุทันที ⚡' : 'ต่ออายุ / ชำระเงิน'}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Account info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <p className="text-slate-400 text-xs mb-3 uppercase tracking-wide font-medium">
                ข้อมูลบัญชี
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">แพ็กเกจ</p>
                  <p className="font-medium text-[#0F2557]">{sub.plan.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">LINE ID</p>
                  <p className="text-slate-600">{user.lineId ?? '—'}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* No subscription */
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
              <LayoutDashboard size={28} className="text-[#1A56DB]" />
            </div>
            <div>
              <p className="font-display font-bold text-[#0F2557] text-lg">ยังไม่มีแพ็กเกจ</p>
              <p className="text-slate-400 text-sm mt-1">
                เริ่มต้นทดลองใช้งานฟรี 7 วัน ไม่ต้องใส่บัตรเครดิต
              </p>
            </div>
            <Link
              href={`/billing?token=${token}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1A56DB] text-white font-semibold hover:bg-[#1648c0] transition-colors"
            >
              เลือกแพ็กเกจและเริ่มใช้งาน
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
