'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, CreditCard } from 'lucide-react'
import AdminSystemList from '@/components/admin/AdminSystemList'
import AddSystemModal from '@/components/admin/AddSystemModal'
import type { System } from '@/types'

export default function AdminPage() {
  const [systems, setSystems] = useState<System[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const fetchSystems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/systems?all=true')
      const data = await res.json()
      setSystems(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSystems()
  }, [fetchSystems])

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg text-slate-400 hover:text-[#1A56DB] hover:bg-blue-50 transition-colors"
              aria-label="กลับหน้าหลัก"
            >
              <ArrowLeft size={18} />
            </Link>
            <span className="font-display text-lg font-bold text-[#0F2557]">
              Ramble<span className="text-[#1A56DB]">Software</span>
              <span className="ml-2 text-sm font-normal text-slate-400">/ จัดการระบบ</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/payments"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-500 hover:text-[#1A56DB] hover:bg-blue-50 transition-colors"
            >
              <CreditCard size={16} />
              การชำระเงิน
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A56DB] text-white text-sm font-semibold hover:bg-[#0F2557] transition-colors shadow-sm"
            >
              <Plus size={16} />
              เพิ่มระบบ
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-[#0F2557]">ระบบทั้งหมด</h1>
          <p className="text-slate-500 text-sm mt-1">
            ลากเพื่อเรียงลำดับ · กดไอคอนตาเพื่อเปิด/ปิดแสดงผล
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400 text-sm">กำลังโหลด...</div>
        ) : (
          <AdminSystemList systems={systems} onRefresh={fetchSystems} />
        )}
      </main>

      {showModal && (
        <AddSystemModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchSystems}
        />
      )}
    </div>
  )
}
