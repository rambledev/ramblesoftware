'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Loader2, Gift } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PaymentActions({ paymentId }: { paymentId: string }) {
  const [loading, setLoading] = useState<'approve' | 'reject' | 'free_approve' | null>(null)
  const router = useRouter()

  async function handleAction(action: 'approve' | 'reject' | 'free_approve') {
    setLoading(action)
    try {
      const res = await fetch(`/api/admin/payments/${paymentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      if (res.ok) router.refresh()
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex flex-col gap-2 shrink-0">
      <button
        onClick={() => handleAction('approve')}
        disabled={!!loading}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
      >
        {loading === 'approve' ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle size={15} />}
        อนุมัติ
      </button>
      <button
        onClick={() => handleAction('free_approve')}
        disabled={!!loading}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {loading === 'free_approve' ? <Loader2 size={15} className="animate-spin" /> : <Gift size={15} />}
        อนุมัติฟรี
      </button>
      <button
        onClick={() => handleAction('reject')}
        disabled={!!loading}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
      >
        {loading === 'reject' ? <Loader2 size={15} className="animate-spin" /> : <XCircle size={15} />}
        ปฏิเสธ
      </button>
    </div>
  )
}
