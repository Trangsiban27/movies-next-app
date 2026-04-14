import { NextRequest, NextResponse } from "next/server";

export function middleware (request: NextRequest) {
    const sessionId = request.cookies.get('tmdb_session_id')?.value
    const {pathname} = request.nextUrl

    const protectedRoutes = ['/favories', '/profile/:path*']

    if(protectedRoutes.some(route => pathname.startsWith(route) && !sessionId)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/favorites', '/profile/:path*']
}