import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PATHS = ['/admin', '/api/admin']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminPath = ADMIN_PATHS.some((p) => pathname.startsWith(p))
  if (!isAdminPath) return NextResponse.next()

  // Allow the login page itself
  if (pathname === '/admin/login') return NextResponse.next()
  // Allow the login API
  if (pathname === '/api/admin/login') return NextResponse.next()

  const token = request.cookies.get('admin_token')?.value
  const expected = process.env.ADMIN_SECRET ?? 'admin'

  if (token !== expected) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
