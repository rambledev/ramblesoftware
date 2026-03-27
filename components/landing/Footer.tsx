export default function Footer() {
  return (
    <footer className="bg-[#0F2557] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg font-bold">
            Ramble<span className="text-[#FBBF24]">Software</span>
          </p>
          <p className="text-slate-400 text-sm mt-1">
            พัฒนาระบบที่ใช่ สำหรับธุรกิจของคุณ
          </p>
        </div>
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} RambleSoftware. All rights reserved.
        </p>
      </div>
    </footer>
  )
}