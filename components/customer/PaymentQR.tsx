type Props = {
  qrDataUrl: string
  refCode: string
  amount: number
}

export default function PaymentQR({ qrDataUrl, refCode, amount }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
      {/* Amount */}
      <div className="text-center">
        <p className="text-slate-400 text-sm mb-1">จำนวนเงินที่ต้องชำระ</p>
        <p className="font-display text-4xl font-extrabold text-[#1A56DB]">
          ฿{amount.toLocaleString()}
        </p>
      </div>

      {/* QR */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-slate-500 text-sm">สแกน QR ด้านล่างผ่านแอปธนาคาร</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrDataUrl}
          alt="PromptPay QR Code"
          width={240}
          height={240}
          className="rounded-2xl"
        />
        <p className="text-slate-400 text-xs">PromptPay · 087-238-7648</p>
      </div>

      {/* RefCode */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 space-y-1">
        <p className="text-yellow-700 text-xs font-semibold uppercase tracking-wide">
          ⚠️ สำคัญ — กรอกหมายเหตุ
        </p>
        <code className="font-mono font-bold text-[#0F2557] text-xl tracking-widest block">
          {refCode}
        </code>
        <p className="text-yellow-600 text-xs">กรุณาใส่ข้อความนี้ในช่อง "หมายเหตุ" ทุกครั้ง</p>
      </div>
    </div>
  )
}
