export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { getUserFromToken } from '@/lib/auth'
import { generateQRDataUrl } from '@/lib/promptpay'
import { CheckCircle, ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'
import PaymentQR from '@/components/customer/PaymentQR'
import SlipUpload from '@/components/customer/SlipUpload'

export default async function PaymentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ token?: string }>
}) {
  const [{ id }, { token }] = await Promise.all([params, searchParams])

  const user = await getUserFromToken(token)
  if (!user) redirect('/')

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      user: true,
      order: {
        include: { subscription: { include: { plan: true } } },
      },
    },
  })

  if (!payment) return notFound()

  if (payment.userId !== user.id) redirect('/')

  const isApproved = payment.status === 'verified'
  const planName = payment.order?.subscription?.plan?.name ?? '—'
  const qrDataUrl = await generateQRDataUrl(payment.amount)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-[#0F2557] text-white">
        <div className="max-w-lg mx-auto px-4 py-5 flex items-center gap-3">
          <Link
            href={`/billing?token=${token}`}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <p className="font-display text-xl font-bold">
              Ramble<span className="text-[#FBBF24]">Software</span>
            </p>
            <p className="text-slate-300 text-xs mt-0.5">ชำระเงิน</p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-4">
        {isApproved ? (
          /* ─── Success ─── */
          <div className="bg-white rounded-2xl border-2 border-green-400 p-10 text-center space-y-3">
            <CheckCircle size={52} className="text-green-500 mx-auto" />
            <div>
              <h2 className="font-display text-xl font-bold text-[#0F2557]">ชำระเงินสำเร็จ! 🎉</h2>
              <p className="text-slate-500 mt-1 text-sm">
                ระบบได้รับการอนุมัติแล้ว พร้อมใช้งานทันที
              </p>
            </div>
            <Link
              href={`/dashboard?token=${token}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F2557] text-white text-sm font-semibold hover:bg-[#1a3a72] transition-colors mt-2"
            >
              กลับหน้า Dashboard
            </Link>
          </div>
        ) : (
          <>
            {/* ─── Plan summary ─── */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs mb-0.5">แพ็กเกจที่ชำระ</p>
                <p className="font-semibold text-[#0F2557]">{planName}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
                {payment.status === 'waiting_verify' ? 'รอตรวจสอบ' : 'รอชำระ'}
              </span>
            </div>

            {/* ─── QR Code ─── */}
            <PaymentQR
              qrDataUrl={qrDataUrl}
              refCode={payment.refCode}
              amount={payment.amount}
            />

            {/* ─── Info note ─── */}
            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-blue-700 text-sm">
                โอนแล้วแนบสลิปได้เลย ระบบจะเปิดใช้งานหลังทีมงานตรวจสอบ (ภายใน 24 ชม.)
              </p>
            </div>

            {/* ─── Slip upload ─── */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div>
                <h3 className="font-display font-bold text-[#0F2557]">แนบสลิปการโอน</h3>
                <p className="text-slate-400 text-sm mt-0.5">
                  กรุณาแนบสลิปหลังโอนเงินเรียบร้อยแล้ว
                </p>
              </div>

              {payment.slipUrl ? (
                <div className="space-y-3 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={payment.slipUrl}
                    alt="slip"
                    className="w-full max-w-xs mx-auto rounded-xl border border-slate-200"
                  />
                  <div className="flex items-center justify-center gap-1.5 text-green-600 text-sm font-medium">
                    <CheckCircle size={16} />
                    ส่งสลิปแล้ว รอทีมงานตรวจสอบ
                  </div>
                </div>
              ) : (
                <SlipUpload paymentId={payment.id} />
              )}
            </div>

            {/* ─── Help ─── */}
            <p className="text-center text-slate-400 text-xs pb-4">
              มีปัญหา? LINE:{' '}
              <a href="https://line.me" className="underline hover:text-slate-600">
                @ramblesoftware
              </a>{' '}
              หรือ contact@ramblesoftware.com
            </p>
          </>
        )}
      </main>
    </div>
  )
}
