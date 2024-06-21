import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const privateRoutes =
        request.nextUrl.pathname.startsWith('/dashboard')

    if (
        request.cookies.get('next-auth.session-token')?.value ||
        request.cookies.get('__Secure-next-auth.session-token')?.value
    ) {
        if (request.nextUrl.pathname.startsWith('/login')) {
            return NextResponse.redirect(new URL(`/`, request.url));
        }
    } else if (privateRoutes) {
        return NextResponse.redirect(new URL(`/login`, request.url));
    }
}
