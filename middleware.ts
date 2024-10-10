import { NextRequest, NextResponse } from 'next/server'
import { getCookies } from 'next-client-cookies/server'

const locales = ['uk', 'en']
const defaultLocale = 'uk'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') 
  ) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  let response: NextResponse

  if (!pathnameHasLocale) {
    const newUrl = new URL(request.url)
    newUrl.pathname = `/${defaultLocale}${pathname}`
    response = NextResponse.rewrite(newUrl)
  } else {
    response = NextResponse.next()
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}