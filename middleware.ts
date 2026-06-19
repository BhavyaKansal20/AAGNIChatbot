import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  // If user is not authenticated and trying to access protected routes, redirect to login
  if (!req.auth) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }
  return NextResponse.next()
})

export const config = {
  // Only protect dashboard and chat routes — everything else is public
  matcher: ['/dashboard/:path*', '/chat/:path*'],
}
