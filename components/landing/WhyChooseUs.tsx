import { BookOpen, Users, Smartphone, Zap } from 'lucide-react'

const valueProps = [
  {
    icon: BookOpen,
    title: 'ไม่ต้องมีความรู้ก็เริ่มได้',
    description: 'เราดูแลทุกขั้นตอนให้คุณ ตั้งแต่เริ่มต้นจนเว็บพร้อมใช้งาน ไม่ต้องรู้เรื่องเทคนิคเลย',
  },
  {
    icon: Users,
    title: 'มีคนดูแลให้จนใช้งานได้จริง',
    description: 'ไม่ทิ้งหลังส่งงาน มีทีม support ช่วยเหลือและแก้ปัญหาให้ตลอดการใช้งาน',
  },
  {
    icon: Smartphone,
    title: 'รองรับมือถือทุกเครื่อง',
    description: 'เว็บที่เราสร้างแสดงผลสวยงามบนทุกอุปกรณ์ ทั้ง iPhone, Android และแท็บเล็ต',
  },
  {
    icon: Zap,
    title: 'พร้อมใช้งานทันที',
    description: 'ส่งมอบงานรวดเร็ว ภายในไม่กี่วัน พร้อม Domain และ Hosting ที่จัดการให้ครบ',
  },
]

const iconGradients = [
  'linear-gradient(135deg, #1A56DB 0%, #4338CA 100%)',
  'linear-gradient(135deg, #0EA5E9 0%, #1A56DB 100%)',
  'linear-gradient(135deg, #7C3AED 0%, #4338CA 100%)',
  'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
]

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1A56DB] text-sm font-semibold mb-4">
            ทำไมต้องเลือกเรา
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F2557]">
            ทำเว็บง่าย ไม่ยุ่งยาก เริ่มได้เลย
          </h2>
          <p className="mt-3 text-slate-500 text-lg max-w-xl mx-auto">
            เราออกแบบกระบวนการให้ลูกค้าไม่ต้องรู้เรื่องเทคนิคเลย
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="relative bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-xl hover:border-blue-100 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group"
              >
                {/* Step number watermark */}
                <span className="absolute top-3 right-4 font-display text-6xl font-extrabold text-slate-50 select-none group-hover:text-blue-50 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Gradient icon */}
                <div
                  className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md"
                  style={{ background: iconGradients[index] }}
                >
                  <Icon size={22} className="text-white" />
                </div>

                <h3 className="relative z-10 font-display font-bold text-[#0F2557] mb-2 group-hover:text-[#1A56DB] transition-colors">
                  {item.title}
                </h3>
                <p className="relative z-10 text-slate-500 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: iconGradients[index] }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
