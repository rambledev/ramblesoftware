'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, ExternalLink, Eye, EyeOff, Trash2, Tag } from 'lucide-react'
import type { System } from '@/types'

type Props = {
  system: System
  onRefresh: () => void
}

export default function SortableSystemCard({ system, onRefresh }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: system.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  async function toggleActive() {
    await fetch(`/api/systems/${system.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !system.isActive }),
    })
    onRefresh()
  }

  async function handleDelete() {
    if (!confirm(`ลบ "${system.name}" ใช่หรือไม่?`)) return
    await fetch(`/api/systems/${system.id}`, { method: 'DELETE' })
    onRefresh()
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-3 bg-white rounded-xl border p-4 transition-shadow ${
        isDragging ? 'shadow-lg border-[#1A56DB]' : 'border-slate-200 shadow-sm'
      } ${!system.isActive ? 'opacity-50' : ''}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="mt-0.5 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing"
        aria-label="ลาก"
      >
        <GripVertical size={18} />
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-[#0F2557] text-sm leading-snug">
            {system.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            {system.demoUrl && (
              <a
                href={system.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-[#1A56DB] hover:bg-blue-50 transition-colors"
                title="เปิด Demo"
              >
                <ExternalLink size={14} />
              </a>
            )}
            <button
              onClick={toggleActive}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#1A56DB] hover:bg-blue-50 transition-colors"
              title={system.isActive ? 'ซ่อน' : 'แสดง'}
            >
              {system.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="ลบ"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <p className="text-slate-500 text-xs mt-1 leading-relaxed line-clamp-2">
          {system.description}
        </p>

        {system.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {system.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs"
              >
                <Tag size={9} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
