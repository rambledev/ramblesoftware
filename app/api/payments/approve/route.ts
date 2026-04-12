// This route is superseded by /api/admin/payments/[id]/route.ts
// Kept for backwards-compatibility but redirects to the new route.
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  return NextResponse.json({ error: 'Use /api/admin/payments/[id] instead' }, { status: 410 })
}
