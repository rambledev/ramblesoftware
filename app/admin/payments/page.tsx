export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Clock, ImageOff } from 'lucide-react'
import PaymentActions from './PaymentActions'
import { safeDecrypt } from '@/lib/encryption'

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: 'รอสลิป', icon: Clock, color: 'bg-slate-100 text-slate-600' },
  waiting_verify: { label: 'รอตรวจสอบ', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
  verified: { label: 'อนุมัติแล้ว', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
  rejected: { label: 'ปฏิเสธ', icon: XCircle, color: 'bg-red-100 text-red-700' },
}

export default async function AdminPaymentsPage() {
  let payments: Awaited<ReturnType<typeof prisma.payment.findMany<{
    include: {
      user: true
      order: { include: { subscription: { include: { plan: true } } } }
    }
  }>>> = []

  try {
    payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        order: { include: { subscription: { include: { plan: true } } } },
      },
    })
  } catch {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl border border-red-200 max-w-md">
          <p className="font-bold text-red-600 mb-2">ไม่สามารถโหลดข้อมูลได้</p>
          <p className="text-slate-500 text-sm">
            กรุณารัน <code className="bg-slate-100 px-1 rounded">prisma migrate dev</code> เพื่อสร้าง database tables
          </p>
        </div>
      </div>
    )
  }

  const pendingCount = payments.filter((p) => p.status === 'waiting_verify').length

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 rounded-lg text-slate-400 hover:text-[#1A56DB] hover:bg-blue-50 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <span className="font-display text-lg font-bold text-[#0F2557]">
            Ramble<span className="text-[#1A56DB]">Software</span>
            <span className="ml-2 text-sm font-normal text-slate-400">/ การชำระเงิน</span>
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-[#0F2557]">การชำระเงินทั้งหมด</h1>
            <p className="text-slate-500 text-sm mt-1">
              {payments.length} รายการ
              {pendingCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                  {pendingCount} รอตรวจสอบ
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {payments.length === 0 && (
            <div className="text-center py-20 text-slate-400">ยังไม่มีรายการชำระเงิน</div>
          )}

          {payments.map((p) => {
            const cfg = statusConfig[p.status] ?? statusConfig.pending
            const Icon = cfg.icon
            const planName = p.order?.subscription?.plan?.name ?? '—'
            const slipUrl = safeDecrypt(p.slipUrl)

            return (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    {/* Status + date */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}
                      >
                        <Icon size={12} />
                        {cfg.label}
                      </span>
                      <span className="text-slate-400 text-xs">
                        {new Date(p.createdAt).toLocaleString('th-TH')}
                      </span>
                    </div>

                    {/* User + plan */}
                    <div>
                      <p className="font-semibold text-[#0F2557]">
                        {p.user?.name ?? 'ไม่ระบุชื่อ'}
                      </p>
                      <p className="text-sm text-slate-500">{planName}</p>
                    </div>

                    {/* Amount + refCode */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span>
                        <span className="text-slate-400">จำนวน: </span>
                        <span className="font-bold text-[#0F2557]">฿{p.amount.toLocaleString()}</span>
                      </span>
                      <span>
                        <span className="text-slate-400">refCode: </span>
                        <code className="font-mono text-[#1A56DB]">{p.refCode}</code>
                      </span>
                      {p.verifiedAt && (
                        <span>
                          <span className="text-slate-400">ตรวจสอบเมื่อ: </span>
                          <span className="text-slate-600">
                            {new Date(p.verifiedAt).toLocaleString('th-TH')}
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Slip */}
                    {slipUrl ? (
                      <a href={slipUrl} target="_blank" rel="noopener noreferrer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={slipUrl}
                          alt="slip"
                          className="h-28 rounded-xl border border-slate-200 object-cover hover:opacity-80 transition-opacity"
                        />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                        <ImageOff size={13} /> ยังไม่มีสลิป
                      </span>
                    )}
                  </div>

                  {(p.status === 'pending' || p.status === 'waiting_verify') && (
                    <PaymentActions paymentId={p.id} />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
