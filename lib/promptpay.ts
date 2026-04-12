import QRCode from 'qrcode'

const PROMPTPAY_PHONE = '0872387648'

function crc16(str: string): string {
  let crc = 0xffff
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff
      } else {
        crc = (crc << 1) & 0xffff
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

function f(id: string, value: string): string {
  return `${id}${value.length.toString().padStart(2, '0')}${value}`
}

export function generatePromptPayPayload(amount: number): string {
  const phone = '0066' + PROMPTPAY_PHONE.slice(1)
  const merchantAcc = f('00', 'A000000677010111') + f('01', phone)

  const body = [
    f('00', '01'),
    f('01', '12'),
    f('29', merchantAcc),
    f('52', '0000'),
    f('53', '764'),
    f('54', amount.toFixed(2)),
    f('58', 'TH'),
    f('59', 'RAMBLESOFTWARE'),
    f('60', 'BANGKOK'),
  ].join('')

  const preHash = body + '6304'
  return preHash + crc16(preHash)
}

export async function generateQRDataUrl(amount: number): Promise<string> {
  const payload = generatePromptPayPayload(amount)
  return QRCode.toDataURL(payload, {
    width: 300,
    margin: 2,
    color: { dark: '#0F2557', light: '#FFFFFF' },
  })
}
