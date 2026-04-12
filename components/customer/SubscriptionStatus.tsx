import { CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react'
import { getRemainingDays } from '@/lib/subscription'

type Props = {
  status: string
  endDate: string
}

export default function SubscriptionStatus({ status, endDate }: Props) {
  const remaining = getRemainingDays(endDate)

  if (status === 'expired') {
    return (
      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4">
        <XCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-red-700">ระบบหมดอายุแล้ว</p>
          <p className="text-red-600 text-sm mt-0.5">กรุณาชำระเงินเพื่อใช้งานต่อ</p>
        </div>
      </div>
    )
  }

  if (remaining <= 2) {
    return (
      <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-2xl p-4">
        <AlertTriangle size={20} className="text-orange-500 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-orange-700">ใกล้หมดอายุ!</p>
          <p className="text-orange-600 text-sm mt-0.5">
            เหลือเวลาใช้งาน {remaining} วัน กรุณาต่ออายุ
          </p>
        </div>
      </div>
    )
  }

  if (status === 'trial') {
    return (
      <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <Clock size={20} className="text-yellow-600 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-yellow-700">คุณกำลังทดลองใช้งาน</p>
          <p className="text-yellow-600 text-sm mt-0.5">เหลือ {remaining} วัน ในช่วงทดลองใช้</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">
      <CheckCircle size={20} className="text-green-500 mt-0.5 shrink-0" />
      <div>
        <p className="font-semibold text-green-700">ใช้งานได้เต็มรูปแบบ</p>
        <p className="text-green-600 text-sm mt-0.5">เหลือ {remaining} วัน</p>
      </div>
    </div>
  )
}
