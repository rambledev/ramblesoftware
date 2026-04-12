// This route is superseded by /api/orders
// Kept for backwards-compatibility.
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  return NextResponse.json({ error: 'Use /api/orders instead' }, { status: 410 })
}
