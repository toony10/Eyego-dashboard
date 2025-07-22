import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === '/login';
  const isRoot = pathname === '/';
  const isDashboard = pathname.startsWith('/dashboard');
  const isProductsPage = pathname.startsWith('/products');

  if ((isRoot || isDashboard || isProductsPage) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isRoot && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/products', '/dashboard/:path*'],
};
