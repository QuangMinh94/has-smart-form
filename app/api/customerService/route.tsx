import { NextRequest, NextResponse } from "next/server"

export function POST(nextRequest: NextRequest) {
    return NextResponse.json({}, { status: 200 })
}
