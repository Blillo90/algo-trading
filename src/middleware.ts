import { NextRequest, NextResponse } from 'next/server'

// Routes that require an active session.
// The cookie 'algo-auth' is set client-side by AuthContext whenever a valid
// Supabase session is present, and cleared immediately on logout.
// This middleware acts as a server-side routing guard — it does NOT replace
// Supabase RLS as a security boundary; data access is always enforced by RLS.
const PROTECTED_PREFIXES = ['/dashboard', '/admin', '/curso']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))

  if (!isProtected) return NextResponse.next()

  const hasSession = req.cookies.has('algo-auth')
  if (hasSession) return NextResponse.next()

  const loginUrl = new URL('/login', req.url)
  loginUrl.searchParams.set('next', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/curso/:path*'],
}
