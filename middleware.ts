import { NextRequest, NextResponse } from 'next/server'
import { getCookies } from 'next-client-cookies/server'

const locales = ['uk', 'en']
const defaultLocale = 'uk'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const cookies = getCookies()
  const accessToken = cookies.get('access_token')

  // Пропускаємо запити до статичних файлів та API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Це перевіряє наявність розширення файлу
  ) {
    return NextResponse.next()
  }

  // Перевіряємо, чи шлях вже містить локаль
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  let response: NextResponse

  if (!pathnameHasLocale) {
    // Якщо локаль відсутня, використовуємо дефолтну
    const newUrl = new URL(request.url)
    // Для інших локалей додаємо префікс
    newUrl.pathname = `/${defaultLocale}${pathname}`
    response = NextResponse.rewrite(newUrl)
  } else {
    // Якщо шлях вже містить локаль, залишаємо як є
    response = NextResponse.next()
  }

  // Додаємо токен до заголовка авторизації
  if (accessToken) {
    
    response.headers.set('Authorization', `Bearer ${accessToken}`)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}