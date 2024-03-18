import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    // console.log(process.env.NEXT_PUBLIC_SERVER_URI);

    NextResponse.next();
}

export const config = {
    matcher: ['/chat'],
}