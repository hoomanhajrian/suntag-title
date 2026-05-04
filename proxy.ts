import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from './lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page through unauthenticated
  if (pathname === '/tracking/login') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/tracking')) {
    const session = request.cookies.get('tracking_session');
    if (!session || !(await verifySession(session.value))) {
      return NextResponse.redirect(new URL('/tracking/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/tracking/:path*'],
};
