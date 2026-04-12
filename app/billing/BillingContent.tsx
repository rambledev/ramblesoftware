'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CreditCard, ArrowRight, Loader2, Paperclip, ArrowLeft,
  Clock, CheckCircle, XCircle, Zap,
} from 'lucide-react'
import Link from 'next/link'
import { getRemainingDays, statusBadgeClass, statusLabel } from '@/lib/subscription'

type Plan = {
  id: string
  name: string
  price: number
  promoPrice: number | null
  trialDays: number
}

type Subscription = {
  id: string
  status: string
  startDate: string
  endDate: string
  plan: Plan
} | null

type User = { id: string; name: string | null }

type Props = {
  token: string
  user: User
  subscription: Subscription
  plans: Plan[]
  pendingPaymentId: string | null
}

const statusIcon = { trial: Clock, active: CheckCircle, expired: XCircle }

export default function BillingContent({ token, user, subscription, plans, pendingPaymentId }: Props) {
  const [selectedPlanId, setSelectedPlanId] = useState(plans[0]?.id ?? '')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleStartTrial() {
    if (!selectedPlanId) return
    setLoading(true)
    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, planId: selectedPlanId }),
      })
      if (res.ok) router.refresh()
    } finally {
      setLoading(false)
    }
  }

  async function handlePay() {
    if (!subscription) return
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, subscriptionId: subscription.id }),
      })
      const data = await res.json()
      if (res.ok && data.payment) {
        router.push(`/payment/${data.payment.id}?token=${token}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const remaining = subscription ? getRemainingDays(subscription.endDate) : 0
  const isUrgent = subscription && subscription.status !== 'active' && remaining <= 2
  const isExpired = subscription?.status === 'expired'
  const badge = subscription ? (statusBadgeClass[subscription.status] ?? statusBadgeClass.expired) : null
  const label = subscription ? (statusLabel[subscription.status] ?? 'ไม่ทราบ') : null
  const Icon = subscription ? (statusIcon[subscription.status as keyof typeof statusIcon] ?? XCircle) : null
  const effectivePrice = subscription?.plan
    ? subscription.plan.promoPrice ?? subscription.plan.price
    : 0

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-[#0F2557] text-white">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center gap-3">
          <Link
            href={`/dashboard?token=${token}`}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <p className="font-display text-xl font-bold">
              Ramble<span className="text-[#FBBF24]">Software</span>
            </p>
            <p className="text-slate-300 text-xs mt-0.5">การชำระเงินและแพ็กเกจ</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        {/* User + status row */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs">ผู้ใช้งาน</p>
            <p className="font-semibold text-[#0F2557]">{user.name ?? 'ไม่ระบุชื่อ'}</p>
          </div>
          {badge && label && Icon && (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge}`}>
              <Icon size={12} />
              {label}
            </span>
          )}
        </div>

        {/* Expired urgent banner */}
        {isExpired && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="font-bold text-red-700 text-lg">⚠️ ระบบหมดอายุแล้ว</p>
            <p className="text-red-600 text-sm mt-1">
              กรุณาชำระเงินเพื่อใช้งานต่อ ระบบจะเปิดทันทีหลังทีมงานตรวจสอบ
            </p>
          </div>
        )}

        {/* Urgency banner (trial ≤ 2 days) */}
        {isUrgent && !isExpired && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center gap-3">
            <Zap size={20} className="text-orange-500 shrink-0" />
            <p className="text-orange-700 text-sm font-medium">
              เหลือเวลาใช้งาน <strong>{remaining} วัน</strong> กรุณาต่ออายุก่อนหมด
            </p>
          </div>
        )}

        {subscription ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
            <h2 className="font-display font-bold text-[#0F2557]">รายละเอียดแพ็กเกจ</h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400 text-xs mb-1">แพ็กเกจ</p>
                <p className="font-semibold text-[#0F2557]">{subscription.plan.name}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">วันที่เหลือ</p>
                <p className={`font-semibold ${remaining <= 2 ? 'text-red-500' : 'text-[#0F2557]'}`}>
                  {remaining} <span className="text-slate-400 font-normal">วัน</span>
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">หมดอายุ</p>
                <p className="font-semibold text-[#0F2557]">
                  {new Date(subscription.endDate).toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">ราคา/เดือน</p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-bold text-[#1A56DB] text-base">
                    ฿{effectivePrice.toLocaleString()}
                  </span>
                  {subscription.plan.promoPrice && (
                    <span className="text-xs line-through text-slate-400">
                      ฿{subscription.plan.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handlePay}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-colors disabled:opacity-50 ${
                  isExpired || isUrgent
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-[#1A56DB] text-white hover:bg-[#1648c0]'
                }`}
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <CreditCard size={18} />
                )}
                {loading
                  ? 'กำลังสร้างรายการ...'
                  : isExpired
                  ? 'ชำระเงินเพื่อเปิดใช้งานทันที'
                  : 'ชำระเงิน / ต่ออายุ'}
                {!loading && <ArrowRight size={16} />}
              </button>

              {pendingPaymentId && (
                <Link
                  href={`/payment/${pendingPaymentId}?token=${token}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#1A56DB] text-[#1A56DB] font-semibold hover:bg-blue-50 transition-colors text-sm"
                >
                  <Paperclip size={15} />
                  แนบสลิปรายการที่รอดำเนินการ
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        ) : (
          /* No subscription — plan picker */
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
            <div>
              <h2 className="font-display font-bold text-[#0F2557] text-lg">เลือกแพ็กเกจ</h2>
              <p className="text-slate-400 text-sm mt-0.5">
                ทดลองใช้งานฟรีก่อน ไม่ต้องใส่บัตรเครดิต
              </p>
            </div>

            {plans.length === 0 ? (
              <p className="text-slate-400 text-sm py-6 text-center">
                ยังไม่มีแพ็กเกจที่เปิดให้บริการ
              </p>
            ) : (
              <>
                <div className="space-y-3">
                  {plans.map((plan) => {
                    const isSelected = selectedPlanId === plan.id
                    return (
                      <label
                        key={plan.id}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          isSelected ? 'border-[#1A56DB] bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="plan"
                            value={plan.id}
                            checked={isSelected}
                            onChange={() => setSelectedPlanId(plan.id)}
                            className="accent-[#1A56DB]"
                          />
                          <div>
                            <p className="font-semibold text-[#0F2557]">{plan.name}</p>
                            <p className="text-xs text-slate-400">
                              ทดลองฟรี {plan.trialDays} วัน · ไม่ต้องผูกบัตร
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <p className="font-bold text-[#1A56DB] text-base">
                            ฿{(plan.promoPrice ?? plan.price).toLocaleString()}
                            <span className="text-slate-400 font-normal text-xs">/เดือน</span>
                          </p>
                          {plan.promoPrice && (
                            <p className="text-xs line-through text-slate-400">
                              ฿{plan.price.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </label>
                    )
                  })}
                </div>

                <button
                  onClick={handleStartTrial}
                  disabled={loading || !selectedPlanId}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1A56DB] text-white font-semibold hover:bg-[#1648c0] transition-colors disabled:opacity-50 text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      กำลังสร้างแพ็กเกจ...
                    </>
                  ) : (
                    <>
                      เริ่มทดลองใช้งานฟรี
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
