import Link from 'next/link'

export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-white border-b border-slate-100">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yellow-50 blur-3xl opacity-60 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <span className="font-display text-xl font-bold text-[#0F2557]">
          Ramble<span className="text-[#1A56DB]">Software</span>
        </span>
        <Link
          href="/admin"
          className="text-sm text-slate-500 hover:text-[#1A56DB] transition-colors"
        >
          จัดการระบบ →
        </Link>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1A56DB]/20 bg-blue-50 text-[#1A56DB] text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-[#1A56DB] animate-pulse" />
          พร้อมให้บริการ
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-extrabold text-[#0F2557] leading-tight max-w-3xl mx-auto">
          ระบบซอฟต์แวร์
          <span className="block text-[#1A56DB]">สำหรับธุรกิจของคุณ</span>
        </h1>

        <p className="mt-6 text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
          เราพัฒนาระบบที่ตอบโจทย์การทำงานจริง ง่ายต่อการใช้งาน
          และพร้อมรองรับการเติบโตของธุรกิจ
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#systems"
            className="px-8 py-3 rounded-xl bg-[#1A56DB] text-white font-semibold hover:bg-[#0F2557] transition-colors shadow-md shadow-blue-200"
          >
            ดูระบบทั้งหมด
          </a>
          <a
            href="mailto:contact@ramblesoftware.com"
            className="px-8 py-3 rounded-xl border-2 border-[#0F2557] text-[#0F2557] font-semibold hover:bg-[#0F2557] hover:text-white transition-colors"
          >
            ติดต่อเรา
          </a>
        </div>
      </div>
    </header>
  )
}