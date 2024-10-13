import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers';


export function middleware(request: NextRequest) {
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}