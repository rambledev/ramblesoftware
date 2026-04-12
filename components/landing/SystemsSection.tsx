import ProductCard from '@/components/landing/ProductCard'

type System = {
  id: string
  name: string
  description: string
  demoUrl: string | null
  tags: string[]
}

export default function SystemsSection({ systems }: { systems: System[] }) {
  return (
    <section id="systems" className="bg-[#F8FAFC] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1A56DB] text-sm font-semibold mb-4">
            ผลิตภัณฑ์ทั้งหมด
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F2557]">
            โซลูชันของเรา
          </h2>
          <p className="mt-3 text-slate-500 text-lg max-w-xl mx-auto">
            เลือกระบบที่ตรงกับความต้องการของธุรกิจคุณ
          </p>
        </div>

        {systems.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            ยังไม่มีระบบที่เปิดให้บริการในขณะนี้
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems.map((system) => (
              <ProductCard key={system.id} system={system} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
