'use client'

import { useState, useRef } from 'react'
import { Upload, Loader2, CheckCircle, ImagePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SlipUpload({ paymentId }: { paymentId: string }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target?.result as string)
    reader.readAsDataURL(file)

    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('paymentId', paymentId)

      const res = await fetch('/api/payments/upload-slip', { method: 'POST', body: fd })
      if (res.ok) {
        setDone(true)
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-2 py-6">
        <CheckCircle size={40} className="text-green-500" />
        <p className="font-semibold text-green-700">ส่งสลิปสำเร็จแล้ว</p>
        <p className="text-slate-400 text-sm text-center">
          ทีมงานจะตรวจสอบและอนุมัติภายใน 24 ชั่วโมง
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="preview"
            className="w-full max-w-xs mx-auto rounded-xl border border-slate-200 block"
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl opacity-0 hover:opacity-100 transition-opacity text-white text-sm font-medium gap-1.5"
          >
            <ImagePlus size={16} />
            เปลี่ยนรูป
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="w-full flex flex-col items-center justify-center gap-2 py-8 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-[#1A56DB] hover:text-[#1A56DB] hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          <Upload size={24} />
          <span className="text-sm font-medium">กดเพื่อเลือกรูปสลิป</span>
          <span className="text-xs">รองรับ JPG, PNG</span>
        </button>
      )}

      {preview && (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1A56DB] text-white font-semibold hover:bg-[#1648c0] transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              กำลังส่งสลิป...
            </>
          ) : (
            <>
              <Upload size={18} />
              ส่งสลิป
            </>
          )}
        </button>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  )
}
