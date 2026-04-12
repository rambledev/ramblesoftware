import { getRemainingDays, getProgressPercent, statusLabel, statusBadgeClass } from '@/lib/subscription'

type Plan = {
  name: string
  price: number
  promoPrice: number | null
}

type Props = {
  status: string
  startDate: string
  endDate: string
  plan: Plan
}

export default function DashboardCard({ status, startDate, endDate, plan }: Props) {
  const remaining = getRemainingDays(endDate)
  const progress = getProgressPercent(startDate, endDate)
  const badge = statusBadgeClass[status] ?? statusBadgeClass.expired
  const label = statusLabel[status] ?? 'ไม่ทราบสถานะ'
  const price = plan.promoPrice ?? plan.price

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
      {/* Plan + status */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-slate-400 text-xs mb-1">แพ็กเกจ</p>
          <p className="font-display font-bold text-[#0F2557] text-lg">{plan.name}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badge}`}>
          {label}
        </span>
      </div>

      {/* Days remaining — big number */}
      <div className="text-center py-4 bg-[#F8FAFC] rounded-xl">
        {status !== 'expired' ? (
          <>
            <p className="font-display text-6xl font-extrabold text-[#0F2557]">{remaining}</p>
            <p className="text-slate-400 text-sm mt-1">วันที่เหลือ</p>
          </>
        ) : (
          <>
            <p className="font-display text-4xl font-extrabold text-red-500">0</p>
            <p className="text-red-400 text-sm mt-1">หมดอายุแล้ว</p>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              status === 'expired'
                ? 'bg-red-400'
                : progress >= 80
                ? 'bg-orange-400'
                : 'bg-[#1A56DB]'
            }`}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>เริ่มใช้งาน</span>
          <span>
            หมดอายุ{' '}
            {new Date(endDate).toLocaleDateString('th-TH', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 pt-1 border-t border-slate-100">
        <span className="font-bold text-[#1A56DB] text-lg">฿{price.toLocaleString()}/เดือน</span>
        {plan.promoPrice && (
          <span className="text-xs line-through text-slate-400">
            ฿{plan.price.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  )
}
