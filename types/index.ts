export type System = {
  id: string
  name: string
  description: string
  demoUrl: string | null
  imageUrl: string | null
  tags: string[]
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export type User = {
  id: string
  name: string | null
  lineId: string | null
  createdAt: string
}

export type Plan = {
  id: string
  systemId: string | null
  name: string
  price: number
  promoPrice: number | null
  trialDays: number
  billingType: string
  durationDays: number | null
  isActive: boolean
}

export type Subscription = {
  id: string
  userId: string
  planId: string
  status: 'trial' | 'active' | 'expired' | 'cancel'
  startDate: string
  endDate: string
  plan?: Plan
  user?: User
}

export type OrderItem = {
  id: string
  orderId: string
  planId: string
  quantity: number
  price: number
  plan?: Plan
}

export type Order = {
  id: string
  userId: string
  subscriptionId: string | null
  status: 'pending' | 'waiting_verify' | 'paid' | 'rejected' | 'free_approved'
  totalAmount: number
  createdAt: string
  items?: OrderItem[]
  payment?: Payment
  subscription?: Subscription
}

export type Payment = {
  id: string
  orderId: string
  userId: string
  amount: number
  method: string
  refCode: string
  slipUrl: string | null
  status: 'pending' | 'waiting_verify' | 'verified' | 'rejected'
  verifiedBy: string | null
  verifiedAt: string | null
  createdAt: string
  user?: User
  order?: Order
}

export type AdminLog = {
  id: string
  adminId: string
  action: string
  targetId: string
  note: string | null
  createdAt: string
}
