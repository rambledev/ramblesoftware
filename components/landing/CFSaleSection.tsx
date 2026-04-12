import { ShoppingCart, Zap, BarChart3, MessageCircle } from 'lucide-react'

const LINE_URL = 'https://lin.ee/QZJEvc0'
// TODO: Replace with actual CF-Sale app URL when available
const CF_SALE_DEMO_URL = LINE_URL
const CF_SALE_DETAIL_URL = LINE_URL

const features = [
  {
    icon: ShoppingCart,
    title: 'จดออเดอร์จาก Comment อัตโนมัติ',
    desc: 'ไม่พลาดออเดอร์แม้แต่รายเดียว',
  },
  {
    icon: Zap,
    title: 'สรุปยอดและแจ้งลูกค้าทันที',
    desc: 'ประหยัดเวลาหลายชั่วโมงต่อวัน',
  },
  {
    icon: BarChart3,
    title: 'ดูรายงานสินค้าและยอดขายได้ทุกที่',
    desc: 'ข้อมูลครบ ตัดสินใจได้แม่นยำ',
  },
]

export default function CFSaleSection() {
  return (
    <section id="cf-sale" className="bg-[#F8FAFC] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left — dark brand panel */}
            <div className="bg-[#0F2557] p-8 md:p-10 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-4 w-fit">
                ระบบใหม่ 🔥
              </span>
              <h2 className="font-display text-3xl font-extrabold text-white leading-tight mb-3">
                CF-Sale
                <br />
                <span className="text-[#FBBF24]">ระบบช่วยขายออนไลน์</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                ช่วยจดออเดอร์ สรุปยอดอัตโนมัติ เหมาะสำหรับแม่ค้าไลฟ์สดที่ต้องการความแม่นยำ
                และประหยัดเวลา
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={CF_SALE_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FBBF24] text-[#0F2557] font-bold text-sm hover:bg-[#f5b014] transition-colors"
                >
                  ทดลองใช้ระบบ
                </a>
                <a
                  href={CF_SALE_DETAIL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/60 text-white font-semibold text-sm hover:bg-white hover:text-[#0F2557] transition-colors"
                >
                  ดูรายละเอียด
                </a>
              </div>
            </div>

            {/* Right — features */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h3 className="font-display text-lg font-bold text-[#0F2557] mb-6">
                เหมาะสำหรับใคร?
              </h3>
              <ul className="space-y-5">
                {features.map((f) => {
                  const Icon = f.icon
                  return (
                    <li key={f.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-[#1A56DB]" />
                      </div>
                      <div>
                        <p className="text-slate-800 text-sm font-semibold">{f.title}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{f.desc}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs text-slate-400">
                  สนใจทดลองใช้ฟรีหรือสอบถามรายละเอียดเพิ่มเติม
                </p>
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#1A56DB] text-xs font-semibold hover:underline mt-1"
                >
                  <MessageCircle size={13} />
                  ทัก LINE ได้เลย
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
