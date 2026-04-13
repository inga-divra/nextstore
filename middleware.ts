import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const sessionCartId = request.cookies.get('sessionCartId')?.value;

    if (!sessionCartId) {
        const response = NextResponse.next();
        response.cookies.set('sessionCartId', crypto.randomUUID(), {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
        });
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};