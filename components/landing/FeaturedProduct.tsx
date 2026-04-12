import { CheckCircle } from 'lucide-react'

const features = [
  'จดมิเตอร์น้ำ/ไฟ',
  'คำนวณค่าใช้จ่ายอัตโนมัติ',
  'ออกบิลและแจ้งผู้เช่า',
  'ใช้ร่วมกับ LINE ได้',
]

export default function FeaturedProduct() {
  return (
    <section id="featured" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1A56DB] text-sm font-semibold mb-4">
            ผลิตภัณฑ์หลัก
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F2557]">
            ระบบยอดนิยมของเรา
          </h2>
        </div>

        <div className="max-w-4xl mx-auto border-2 border-[#1A56DB] rounded-3xl p-8 md:p-12 relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBBF24] text-[#0F2557] text-sm font-bold mb-6">
            ⭐ แนะนำ
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left */}
            <div>
              <h3 className="font-display text-4xl font-extrabold text-[#0F2557] mb-4">
                ระบบจดมิเตอร์ ค่าน้ำค่าไฟ
              </h3>
              <p className="text-slate-500 leading-relaxed mb-6">
                ระบบจดมิเตอร์และออกบิลอัตโนมัติ สำหรับหอพัก อพาร์ตเมนต์ และชุมชน
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="px-6 py-2.5 rounded-xl bg-[#1A56DB] text-white font-semibold hover:bg-[#1648c0] transition-colors text-center text-sm"
                >
                  ดูรายละเอียด
                </a>
                <a
                  href="#"
                  className="px-6 py-2.5 rounded-xl border-2 border-[#1A56DB] text-[#1A56DB] font-semibold hover:bg-blue-50 transition-colors text-center text-sm"
                >
                  ทดลองใช้ฟรี
                </a>
              </div>
            </div>

            {/* Right: features */}
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#1A56DB] shrink-0" />
                  <span className="text-slate-700 font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
