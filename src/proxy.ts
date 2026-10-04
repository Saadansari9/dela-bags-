import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || 'DELA-bags-secret-key-change-in-production',
  });

  const { pathname } = request.nextUrl;

  // Protect admin routes — require ADMIN role
  if (pathname.startsWith('/admin')) {
    if (!token || (token as { role?: string }).role !== 'ADMIN') {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Protect account & orders routes — require any logged-in user
  if (pathname.startsWith('/account') || pathname.startsWith('/orders')) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
    '/orders/:path*',
  ],
};
