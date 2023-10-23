import { type NextRequest } from "next/server"
export async function GET(request: Request) {
    return Response.json({ data: "heelo", url: request.url })
}
export async function POST(request: Request) {
    const fromData = await request.formData()
    const name = fromData.get("name")
    const email = fromData.get("email")
    return Response.json({ name, email })
}
