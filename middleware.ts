import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers';


export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const access_token = cookieStore.get('access_token');

  console.log(access_token, 'cookieStore asd')

  if(access_token) {
    request.headers.set('Authorization', `Bearer ${access_token.value}`)
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}