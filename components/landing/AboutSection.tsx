import { CheckCircle, Star, Quote } from 'lucide-react'

const highlights = [
  'มีประสบการณ์พัฒนาระบบตั้งแต่ปี 2556',
  'เข้าใจงานจริง ไม่ใช่แค่เขียนโค้ด',
  'เน้นใช้งานง่าย และแก้ปัญหาจริง',
]

const stats = [
  { value: '10+', label: 'ปี ประสบการณ์', gradient: 'linear-gradient(135deg, #1A56DB 0%, #4338CA 100%)' },
  { value: '50+', label: 'ระบบที่พัฒนา', gradient: 'linear-gradient(135deg, #0EA5E9 0%, #1A56DB 100%)' },
  { value: '100+', label: 'ลูกค้าที่ไว้วางใจ', gradient: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)' },
]

const testimonials = [
  {
    quote: 'ระบบใช้งานง่ายมาก ลดเวลาจดมิเตอร์และออกบิลจาก 2 ชั่วโมงเหลือแค่ 20 นาที ลูกค้าก็พอใจมาก',
    name: 'คุณสมชาย ว.',
    role: 'เจ้าของหอพัก 60 ห้อง กรุงเทพฯ',
    initial: 'ส',
    gradient: 'linear-gradient(135deg, #1A56DB, #4338CA)',
  },
  {
    quote: 'เว็บไซต์สวยมาก ส่งงานเร็วตามที่นัด ลูกค้าถามตลอดว่าใครทำให้ ทีมงานดูแลดีหลังส่งงานด้วย',
    name: 'คุณสุดา ร.',
    role: 'เจ้าของร้านอาหาร เชียงใหม่',
    initial: 'ส',
    gradient: 'linear-gradient(135deg, #F97316, #EF4444)',
  },
]

export default function AboutSection() {
  return (
    <section
      className="py-20"
      style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF4FF 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Top row — text + stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: text */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1A56DB] text-sm font-semibold mb-4">
              เกี่ยวกับเรา
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F2557] leading-tight mb-6">
              ทีมพัฒนาที่เข้าใจ
              <span className="block text-gradient-gold">ธุรกิจจริง</span>
            </h2>
            <ul className="space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#1A56DB] mt-0.5 shrink-0" />
                  <span className="text-slate-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: gradient stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl p-5 text-white flex flex-col items-center lg:flex-row lg:items-center lg:gap-5 shadow-lg"
                style={{ background: stat.gradient }}
              >
                <span className="font-display text-4xl font-extrabold">{stat.value}</span>
                <span className="text-white/80 text-sm mt-1 lg:mt-0">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1A56DB] text-sm font-semibold mb-2">
              รีวิวจากลูกค้า
            </span>
            <h3 className="font-display text-2xl font-bold text-[#0F2557]">
              ลูกค้าพูดถึงเราอย่างไร
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Quote icon */}
                <Quote
                  size={28}
                  className="mb-3 opacity-20"
                  style={{
                    color: '#1A56DB',
                    fill: 'currentColor',
                  }}
                />

                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="text-[#FBBF24]" style={{ fill: '#FBBF24' }} />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow"
                    style={{ background: t.gradient }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
