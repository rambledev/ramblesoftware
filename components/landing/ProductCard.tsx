import { ExternalLink, Tag, ArrowRight } from 'lucide-react'

type System = {
  id: string
  name: string
  description: string
  demoUrl: string | null
  tags: string[]
}

export default function ProductCard({ system }: { system: System }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200 p-6 hover:border-[#1A56DB] hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-300">
      <div className="flex-1">
        <h3 className="font-display text-lg font-bold text-[#0F2557] mb-2 group-hover:text-[#1A56DB] transition-colors">
          {system.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">{system.description}</p>

        {system.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {system.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {system.demoUrl && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <a
            href={system.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A56DB] hover:text-[#F97316] transition-colors"
          >
            <ExternalLink size={14} />
            ทดลองใช้ Demo
          </a>
          <a
            href={system.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#1A56DB] text-white text-xs font-semibold hover:bg-[#1648c0] transition-colors"
          >
            ดูรายละเอียด
            <ArrowRight size={13} />
          </a>
        </div>
      )}
    </div>
  )
}
