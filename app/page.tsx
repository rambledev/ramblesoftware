import { prisma } from '@/lib/prisma'
import Hero from '@/components/landing/Hero'
import ProductCard from '@/components/landing/ProductCard'
import Footer from '@/components/landing/Footer'

export default async function Home() {
  const systems = await prisma.system.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Hero />

      <main className="flex-1">
        <section id="systems" className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0F2557]">
              ระบบของเรา
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
        </section>
      </main>

      <Footer />
    </div>
  )
}
