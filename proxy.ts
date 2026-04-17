import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
  // NextAuth v5 uses different cookie names depending on protocol
  // HTTP (dev): authjs.session-token
  // HTTPS (prod): __Secure-authjs.session-token
  const isSecure = request.nextUrl.protocol === 'https:'
  const cookieName = isSecure
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token'

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName,
  })

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

  if (isAdminRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
