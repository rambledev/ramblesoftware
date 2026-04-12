import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const paymentId = formData.get('paymentId') as string | null

    if (!file || !paymentId) {
      return NextResponse.json({ error: 'file and paymentId required' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = file.name.split('.').pop() ?? 'jpg'
    const filename = `${paymentId}-${Date.now()}.${ext}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')

    await mkdir(uploadDir, { recursive: true })
    await writeFile(path.join(uploadDir, filename), buffer)

    const slipUrl = `/uploads/${filename}`

    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: { slipUrl, status: 'waiting_verify' },
    })

    // Also update the linked order to waiting_verify
    await prisma.order.update({
      where: { id: payment.orderId },
      data: { status: 'waiting_verify' },
    })

    return NextResponse.json({ payment, slipUrl })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
