import { Check } from 'lucide-react'

const LINE_URL = 'https://lin.ee/QZJEvc0'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '5,000',
    unit: 'บาท',
    subtitle: 'เว็บไซต์แนะนำธุรกิจ',
    features: [
      'เว็บไซต์แสดงข้อมูล',
      '3–5 หน้า',
      'รองรับมือถือทุกเครื่อง',
      'ฟรี Domain + Hosting 1 ปี',
    ],
    highlighted: false,
    cta: 'เริ่มต้นแพ็กเกจนี้',
    href: LINE_URL,
    isExternal: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: '10,000',
    unit: 'บาท',
    subtitle: 'ยอดนิยม — สำหรับธุรกิจที่ต้องการผล',
    features: [
      '5–10 หน้า',
      'ฟอร์มติดต่อ',
      'SEO เบื้องต้น',
      'ดีไซน์ปรับแต่งได้',
      'ฟรี Domain + Hosting 1 ปี',
    ],
    highlighted: true,
    cta: 'เลือกแพ็กเกจนี้',
    href: LINE_URL,
    isExternal: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '20,000+',
    unit: 'บาท',
    subtitle: 'สำหรับระบบซับซ้อน',
    features: [
      'ระบบหลังบ้าน (Admin)',
      'Login / Dashboard',
      'ระบบเฉพาะทาง',
      'พัฒนาตาม requirement',
    ],
    highlighted: false,
    cta: 'ปรึกษาเพิ่มเติม',
    href: LINE_URL,
    isExternal: true,
  },
  {
    id: 'custom',
    name: 'Custom',
    price: 'ประเมินราคา',
    unit: '',
    subtitle: 'บอกความต้องการ เราคำนวณให้',
    features: [
      'ทุกฟีเจอร์ตามต้องการ',
      'ออกแบบเฉพาะธุรกิจคุณ',
      'รองรับการขยายระบบ',
      'ดูแลหลังการใช้งาน',
    ],
    highlighted: false,
    cta: 'ลองประเมินราคา',
    href: '#estimator',
    isExternal: false,
  },
]

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20"
      style={{ background: 'linear-gradient(180deg, #EEF4FF 0%, #F8FAFC 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1A56DB] text-sm font-semibold mb-4">
            ราคา
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F2557]">
            แพ็กเกจที่เหมาะกับทุกธุรกิจ
          </h2>
          <p className="mt-3 text-slate-500 text-lg max-w-xl mx-auto">
            ราคาเริ่มต้นที่คุ้มค่า ไม่มีค่าใช้จ่ายซ่อนเร้น
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => {
            if (plan.highlighted) {
              return (
                <div
                  key={plan.id}
                  className="relative flex flex-col rounded-2xl p-6 lg:scale-105 z-10"
                  style={{
                    background: 'linear-gradient(145deg, #1D4ED8 0%, #1E40AF 55%, #312E81 100%)',
                    boxShadow:
                      '0 25px 60px -10px rgba(29,78,216,0.55), 0 0 0 1px rgba(147,197,253,0.20)',
                  }}
                >
                  {/* Recommended badge */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className="px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)',
                        color: '#050D25',
                      }}
                    >
                      ⭐ แนะนำ
                    </span>
                  </div>

                  {/* Decorative inner glow */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at top, rgba(147,197,253,0.12) 0%, transparent 60%)',
                    }}
                  />

                  <div className="relative mb-5">
                    <h3 className="font-display text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-blue-200 text-xs mb-4 leading-relaxed">{plan.subtitle}</p>
                    <div className="flex items-end gap-1">
                      <span className="font-display text-3xl font-extrabold text-white leading-none">
                        {plan.price}
                      </span>
                      <span className="text-blue-200 text-sm mb-0.5">{plan.unit}</span>
                    </div>
                  </div>

                  <ul className="relative flex-1 space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check size={15} className="mt-0.5 shrink-0 text-[#FBBF24]" />
                        <span className="text-blue-50 text-sm leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block text-center px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                      color: '#050D25',
                      boxShadow: '0 4px 15px rgba(251,191,36,0.40)',
                    }}
                  >
                    {plan.cta}
                  </a>
                </div>
              )
            }

            return (
              <div
                key={plan.id}
                className="relative flex flex-col rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-5">
                  <h3 className="font-display text-xl font-bold text-[#0F2557] mb-1">{plan.name}</h3>
                  <p className="text-slate-400 text-xs mb-4 leading-relaxed">{plan.subtitle}</p>
                  <div className="flex items-end gap-1">
                    <span
                      className={`font-display font-extrabold leading-none text-[#0F2557] ${
                        plan.price.length > 6 ? 'text-2xl' : 'text-3xl'
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.unit && (
                      <span className="text-slate-400 text-sm mb-0.5">{plan.unit}</span>
                    )}
                  </div>
                </div>

                <ul className="flex-1 space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={15} className="mt-0.5 shrink-0 text-[#1A56DB]" />
                      <span className="text-slate-600 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  target={plan.isExternal ? '_blank' : undefined}
                  rel={plan.isExternal ? 'noopener noreferrer' : undefined}
                  className="block text-center px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors bg-slate-50 border border-slate-200 text-[#1A56DB] hover:bg-[#1A56DB] hover:text-white hover:border-[#1A56DB]"
                >
                  {plan.cta}
                </a>
              </div>
            )
          })}
        </div>

        <p className="text-center text-slate-500 mt-10 text-sm">
          ไม่แน่ใจเลือกแบบไหนดี?{' '}
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1A56DB] font-semibold hover:underline"
          >
            ปรึกษาฟรีทาง LINE
          </a>{' '}
          เราช่วยแนะนำให้
        </p>
      </div>
    </section>
  )
}
