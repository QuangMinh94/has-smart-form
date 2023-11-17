import { NextRequest, NextResponse } from "next/server"

export function GET() {
    return NextResponse.json({}, { status: 200 })
}

export function POST(nextRequest: NextRequest) {
    return NextResponse.json({}, { status: 200 })
}
