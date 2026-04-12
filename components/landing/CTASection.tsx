import { MessageCircle, Monitor, Clock, Shield } from 'lucide-react'

const LINE_URL = 'https://lin.ee/QZJEvc0'
const CF_SALE_URL = LINE_URL

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        background: 'linear-gradient(145deg, #020B1E 0%, #0F2557 45%, #1E1B4B 100%)',
      }}
    >
      {/* Decorative glow orbs */}
      <div
        className="absolute -top-24 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-16 right-1/4 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-32 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)' }}
      />


      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/8 text-white/70 text-sm font-medium mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          ปรึกษาฟรี ไม่มีข้อผูกมัด
        </div>

        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          เริ่มต้นทำเว็บไซต์ของคุณ
          <span className="block text-gradient-gold mt-1">วันนี้เลย</span>
        </h2>

        <p className="text-slate-300 text-lg max-w-xl mx-auto mb-10">
          ทีมเราพร้อมรับฟัง วิเคราะห์ความต้องการ และแนะนำแนวทางที่เหมาะสมที่สุดให้คุณ
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-pulse inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
              color: '#050D25',
              boxShadow: '0 8px 30px rgba(251,191,36,0.40)',
            }}
          >
            <MessageCircle size={18} />
            ทัก LINE ตอนนี้
          </a>
          <a
            href={CF_SALE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/25 text-white font-semibold text-base hover:bg-white/10 hover:border-white/40 transition-all duration-200"
          >
            <Monitor size={18} />
            ทดลองใช้ระบบ
          </a>
        </div>

        {/* Reassurance chips */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Clock size={14} className="text-emerald-400" />
            ตอบกลับภายใน 1 ชั่วโมง
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Shield size={14} className="text-blue-400" />
            ไม่มีข้อผูกมัด
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <MessageCircle size={14} className="text-[#FBBF24]" />
            ปรึกษาได้ทุกวัน
          </div>
        </div>
      </div>
    </section>
  )
}
