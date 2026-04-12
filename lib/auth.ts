import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export type AuthUser = {
  id: string
  name: string | null
  lineId: string | null
  accessToken: string
}

/**
 * Resolve a token to its User. Returns null if token is missing or invalid.
 */
export async function getUserFromToken(token: string | undefined): Promise<AuthUser | null> {
  if (!token) return null
  const user = await prisma.user.findUnique({ where: { accessToken: token } })
  return user ?? null
}

/**
 * Like getUserFromToken but redirects to "/" if invalid instead of returning null.
 * Use in page Server Components that require authentication.
 */
export async function requireAuth(token: string | undefined): Promise<AuthUser> {
  const user = await getUserFromToken(token)
  if (!user) redirect('/')
  return user
}

/**
 * Generate a cryptographically random access token.
 */
export function generateAccessToken(): string {
  return crypto.randomUUID()
}
