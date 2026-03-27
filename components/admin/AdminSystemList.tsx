'use client'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { useState } from 'react'
import SortableSystemCard from './SortableSystemCard'
import type { System } from '@/types'

type Props = {
  systems: System[]
  onRefresh: () => void
}

export default function AdminSystemList({ systems: initialSystems, onRefresh }: Props) {
  const [systems, setSystems] = useState(initialSystems)

  const sensors = useSensors(useSensor(PointerSensor))

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = systems.findIndex((s) => s.id === active.id)
    const newIndex = systems.findIndex((s) => s.id === over.id)
    const reordered = arrayMove(systems, oldIndex, newIndex)
    setSystems(reordered)

    await fetch('/api/systems/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: reordered.map((s) => s.id) }),
    })
    onRefresh()
  }

  if (systems.length === 0) {
    return (
      <div className="py-20 text-center text-slate-400">
        <p className="text-lg font-medium">ยังไม่มีระบบ</p>
        <p className="text-sm mt-1">กดปุ่ม "เพิ่มระบบ" เพื่อเริ่มต้น</p>
      </div>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={systems.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {systems.map((system) => (
            <SortableSystemCard key={system.id} system={system} onRefresh={onRefresh} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
