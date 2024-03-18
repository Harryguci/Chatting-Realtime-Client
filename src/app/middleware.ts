import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    console.log('Run middleware');

    NextResponse.next();
}

export const config = {
    matcher: ['/chat'],
}