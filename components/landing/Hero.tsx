import Link from 'next/link'
import { MessageCircle, ChevronDown, ShieldCheck, Star, Users } from 'lucide-react'

const LINE_URL = 'https://lin.ee/QZJEvc0'

export default function Hero() {
  return (
    <header
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #020B1E 0%, #071330 45%, #0F2557 100%)' }}
    >
      {/* Decorative glow spheres */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -top-20 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.10) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(26,86,219,0.22) 0%, transparent 70%)' }}
      />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      {/* Navbar */}
      <nav className="relative max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <span className="font-display text-xl font-bold text-white tracking-tight">
          Ramble<span className="text-gradient-gold">Software</span>
        </span>
        
      </nav>

      {/* Hero content */}
      <div className="relative max-w-6xl mx-auto px-4 pt-12 pb-28 text-center">
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/8 text-white/80 text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          พร้อมให้บริการ · รับงานทันที
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl mx-auto">
          ทำเว็บไซต์ให้ธุรกิจคุณ
          <span className="block text-gradient-gold mt-1">พร้อมใช้งานในไม่กี่วัน</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-slate-300/90 text-lg max-w-2xl mx-auto leading-relaxed">
          ไม่ต้องมีความรู้ก็เริ่มได้&nbsp;
          เราดูแลให้ครบ ทั้งออกแบบ พัฒนา โฮสติ้ง และโดเมน
        </p>

        {/* Price pill */}
        <div
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border"
          style={{
            borderColor: 'rgba(251,191,36,0.40)',
            background: 'rgba(251,191,36,0.10)',
          }}
        >
          <span
            className="font-display font-extrabold text-lg"
            style={{
              background: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            เริ่มต้นเพียง 5,000 บาท
          </span>
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-pulse inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
              color: '#050D25',
              boxShadow: '0 8px 30px rgba(251,191,36,0.35)',
            }}
          >
            <MessageCircle size={18} />
            ปรึกษาฟรีทาง LINE
          </a>
          <a
            href="#systems"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/25 text-white font-semibold text-base hover:bg-white/10 hover:border-white/40 transition-all duration-200"
          >
            ดูตัวอย่างผลงาน
            <ChevronDown size={16} />
          </a>
        </div>

        {/* Trust bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
            ปรึกษาฟรี ไม่มีค่าใช้จ่าย
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Star size={15} className="text-[#FBBF24] shrink-0" />
            ประสบการณ์กว่า 10 ปี
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Users size={15} className="text-blue-400 shrink-0" />
            ลูกค้าใช้งานแล้ว 100+ ราย
          </div>
        </div>
      </div>
    </header>
  )
}
