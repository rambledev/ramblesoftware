'use client'

import { useState, useMemo } from 'react'
import { Calculator, MessageCircle } from 'lucide-react'

const LINE_URL = 'https://lin.ee/QZJEvc0'

const websiteTypes = [
  { id: 'brochure', label: 'เว็บแนะนำบริษัท / ธุรกิจ', base: [5000, 8000] },
  { id: 'portfolio', label: 'พอร์ตโฟลิโอ / แสดงผลงาน', base: [5000, 10000] },
  { id: 'ecommerce', label: 'ร้านค้าออนไลน์', base: [15000, 30000] },
  { id: 'system', label: 'ระบบจัดการ (Admin / Dashboard)', base: [20000, 50000] },
]

const pageRanges = [
  { id: 'sm', label: '1–3 หน้า', add: [0, 0] },
  { id: 'md', label: '4–7 หน้า', add: [2000, 3000] },
  { id: 'lg', label: '8–15 หน้า', add: [5000, 8000] },
  { id: 'xl', label: '15+ หน้า', add: [8000, 15000] },
]

const featureOptions = [
  { id: 'seo', label: 'SEO เบื้องต้น', add: [2000, 3000] },
  { id: 'contact', label: 'ฟอร์มติดต่อ', add: [1000, 2000] },
  { id: 'line', label: 'LINE Notify / แจ้งเตือน', add: [3000, 5000] },
  { id: 'blog', label: 'ระบบบล็อก / ข่าวสาร', add: [3000, 5000] },
  { id: 'multilang', label: 'รองรับหลายภาษา', add: [3000, 6000] },
  { id: 'analytics', label: 'Google Analytics', add: [1000, 1500] },
]

const designLevels = [
  { id: 'template', label: 'เทมเพลตสำเร็จรูป', add: [0, 0] },
  { id: 'custom', label: 'ออกแบบเอง (Custom Design)', add: [3000, 5000] },
  { id: 'premium', label: 'พรีเมียม (ดีไซน์พิเศษ)', add: [8000, 15000] },
]

function SelectButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
        active
          ? 'border-[#1A56DB] bg-[#1A56DB] text-white'
          : 'border-slate-200 bg-white text-slate-700 hover:border-[#1A56DB]/50'
      }`}
    >
      {children}
    </button>
  )
}

export default function PriceEstimator() {
  const [websiteType, setWebsiteType] = useState('brochure')
  const [pages, setPages] = useState('sm')
  const [features, setFeatures] = useState<string[]>([])
  const [design, setDesign] = useState('template')

  const estimate = useMemo(() => {
    const base = websiteTypes.find((t) => t.id === websiteType)!.base
    const pageAdd = pageRanges.find((p) => p.id === pages)!.add
    const featureAdd = features.reduce(
      (acc, fid) => {
        const f = featureOptions.find((fo) => fo.id === fid)!
        return [acc[0] + f.add[0], acc[1] + f.add[1]]
      },
      [0, 0]
    )
    const designAdd = designLevels.find((d) => d.id === design)!.add
    return {
      min: base[0] + pageAdd[0] + featureAdd[0] + designAdd[0],
      max: base[1] + pageAdd[1] + featureAdd[1] + designAdd[1],
    }
  }, [websiteType, pages, features, design])

  const toggleFeature = (id: string) => {
    setFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  const fmt = (n: number) => n.toLocaleString('th-TH')

  return (
    <section id="estimator" className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1A56DB] text-sm font-semibold mb-4">
            ประเมินราคา
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F2557]">
            คำนวณราคาคร่าวๆ ด้วยตัวเอง
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            เลือกรายละเอียดที่ต้องการ แล้วดูราคาประมาณทันที
          </p>
        </div>

        <div className="bg-[#F8FAFC] rounded-3xl border border-slate-200 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-6">
              {/* Website type */}
              <div>
                <p className="text-sm font-semibold text-[#0F2557] mb-3">ประเภทเว็บไซต์</p>
                <div className="space-y-2">
                  {websiteTypes.map((t) => (
                    <SelectButton
                      key={t.id}
                      active={websiteType === t.id}
                      onClick={() => setWebsiteType(t.id)}
                    >
                      {t.label}
                    </SelectButton>
                  ))}
                </div>
              </div>

              {/* Pages */}
              <div>
                <p className="text-sm font-semibold text-[#0F2557] mb-3">จำนวนหน้า</p>
                <div className="grid grid-cols-2 gap-2">
                  {pageRanges.map((p) => (
                    <SelectButton
                      key={p.id}
                      active={pages === p.id}
                      onClick={() => setPages(p.id)}
                    >
                      {p.label}
                    </SelectButton>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              {/* Features */}
              <div>
                <p className="text-sm font-semibold text-[#0F2557] mb-3">
                  ฟีเจอร์เพิ่มเติม{' '}
                  <span className="text-slate-400 font-normal">(เลือกได้หลายอย่าง)</span>
                </p>
                <div className="space-y-2">
                  {featureOptions.map((f) => (
                    <label
                      key={f.id}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border cursor-pointer transition-colors ${
                        features.includes(f.id)
                          ? 'border-[#1A56DB] bg-blue-50'
                          : 'border-slate-200 bg-white hover:border-[#1A56DB]/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="accent-[#1A56DB] w-4 h-4 shrink-0"
                        checked={features.includes(f.id)}
                        onChange={() => toggleFeature(f.id)}
                      />
                      <span className="text-sm text-slate-700">{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Design level */}
              <div>
                <p className="text-sm font-semibold text-[#0F2557] mb-3">ระดับดีไซน์</p>
                <div className="space-y-2">
                  {designLevels.map((d) => (
                    <SelectButton
                      key={d.id}
                      active={design === d.id}
                      onClick={() => setDesign(d.id)}
                    >
                      {d.label}
                    </SelectButton>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Result box */}
          <div className="mt-8 rounded-2xl bg-[#0F2557] p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calculator size={18} className="text-[#FBBF24]" />
              <span className="text-slate-300 text-sm font-medium">ราคาประมาณ</span>
            </div>
            <p className="font-display text-4xl font-extrabold text-white mb-1">
              {fmt(estimate.min)}
              <span className="text-slate-400 text-2xl mx-2">–</span>
              {fmt(estimate.max)}
              <span className="text-[#FBBF24] text-2xl ml-1">฿</span>
            </p>
            <p className="text-slate-400 text-xs mb-5">
              * ราคาโดยประมาณเท่านั้น ยังไม่รวม VAT และรายละเอียดเฉพาะของโปรเจค
            </p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FBBF24] text-[#0F2557] font-bold text-sm hover:bg-[#f5b014] transition-colors"
            >
              <MessageCircle size={16} />
              ได้ราคาคร่าวๆ แล้ว — ทัก LINE เพื่อประเมินจริง
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
