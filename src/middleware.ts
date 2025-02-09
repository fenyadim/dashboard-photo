import { decrypt, updateSession } from '@/shared/lib/session'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard']
const authRoute = ['/login', '/register']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isAuthRoute = authRoute.includes(path)

  const accessToken = (await cookies()).get('accessToken')?.value
  const refreshToken = (await cookies()).get('refreshToken')?.value
  const session = await decrypt(accessToken)

  if (isProtectedRoute && !session?.userId) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    await updateSession(refreshToken)
  }

  if (
    isAuthRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
