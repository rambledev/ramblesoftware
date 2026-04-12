const LINE_URL = 'https://lin.ee/QZJEvc0'

const systemLinks = [
  { label: 'ระบบจดมิเตอร์ ค่าน้ำค่าไฟ', href: '#cf-sale' },
  { label: 'ระบบ CF-Sale', href: '#cf-sale' },
  { label: 'ดูผลงานทั้งหมด', href: '#systems' },
]

const serviceLinks = [
  { label: 'รับทำเว็บไซต์', href: '#services' },
  { label: 'ดูราคา', href: '#pricing' },
  { label: 'ประเมินราคา', href: '#estimator' },
]

const contactLinks = [
  { label: 'LINE Official', href: LINE_URL, external: true },
  { label: 'อีเมล: contact@ramblesoftware.com', href: 'mailto:contact@ramblesoftware.com', external: false },
  { label: 'จัดการระบบ', href: '/admin', external: false },
]

export default function Footer() {
  return (
    <footer className="bg-[#0F2557] text-white py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Col 1: Brand */}
          <div className="md:col-span-1">
            <p className="font-display text-xl font-bold mb-2">
              Ramble<span className="text-[#FBBF24]">Software</span>
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              รับทำเว็บไซต์และพัฒนาระบบ<br />
              สำหรับธุรกิจทุกขนาด
            </p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FBBF24] text-[#0F2557] text-sm font-bold hover:bg-[#f5b014] transition-colors"
            >
              ปรึกษาฟรีทาง LINE
            </a>
          </div>

          {/* Col 2: ระบบ */}
          <div>
            <p className="font-semibold text-white mb-4">ระบบของเรา</p>
            <ul className="space-y-2">
              {systemLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: บริการ */}
          <div>
            <p className="font-semibold text-white mb-4">บริการ</p>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: ติดต่อ */}
          <div>
            <p className="font-semibold text-white mb-4">ติดต่อ</p>
            <ul className="space-y-2">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-slate-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} RambleSoftware. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
