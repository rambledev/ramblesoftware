import { Globe, LayoutDashboard, Settings, Shield } from 'lucide-react'

const LINE_URL = 'https://lin.ee/QZJEvc0'

const services = [
  {
    icon: Globe,
    title: 'ออกแบบ + พัฒนา',
    description: 'ดีไซน์สวย ใช้งานง่าย รองรับมือถือทุกขนาด พร้อมรูปภาพและเนื้อหาครบ',
    accent: 'linear-gradient(135deg, #1A56DB 0%, #4338CA 100%)',
  },
  {
    icon: LayoutDashboard,
    title: 'Hosting + Domain',
    description: 'จัดการโดเมนและโฮสติ้งให้ครบ ฟรี SSL เว็บโหลดเร็ว ออนไลน์ตลอด 24 ชั่วโมง',
    accent: 'linear-gradient(135deg, #0EA5E9 0%, #1A56DB 100%)',
  },
  {
    icon: Settings,
    title: 'ดูแลหลังบ้าน',
    description: 'แก้ไขข้อมูลบนเว็บได้ง่าย มีระบบจัดการเนื้อหา ไม่ต้องพึ่งโปรแกรมเมอร์ทุกครั้ง',
    accent: 'linear-gradient(135deg, #7C3AED 0%, #4338CA 100%)',
  },
  {
    icon: Shield,
    title: 'ดูแลหลังการขาย',
    description: 'มี support ตลอด แก้ปัญหาได้รวดเร็ว รองรับการขยายระบบในอนาคต',
    accent: 'linear-gradient(135deg, #059669 0%, #0EA5E9 100%)',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1A56DB] text-sm font-semibold mb-4">
            บริการของเรา
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F2557] mb-3">
            รับทำเว็บไซต์ครบวงจร
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            เหมาะสำหรับธุรกิจ ร้านค้า และหน่วยงานทุกประเภท — จบในที่เดียว
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {services.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ background: item.accent }}
                />

                {/* Top-right subtle gradient wash on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                  style={{ background: `${item.accent.replace('linear-gradient', 'radial-gradient(ellipse at top right,').replace('100%)', '100%, transparent 80%)')}` }}
                />

                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{ background: item.accent }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#0F2557] mb-1.5 group-hover:text-[#1A56DB] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #1A56DB 0%, #4338CA 100%)',
              boxShadow: '0 8px 25px rgba(26,86,219,0.30)',
            }}
          >
            สอบถามและปรึกษาฟรีทาง LINE →
          </a>
        </div>
      </div>
    </section>
  )
}
