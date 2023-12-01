import axios from "axios"
import { cookies } from "next/headers"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    const cookie = cookies()

    const fileResponse = await axios.get(
        process.env.ECM_ATTACHMENT! + "/" + id,
        {
            headers: {
                Authorization: "Bearer " + cookie.get("token")?.value,
                Session: cookie.get("session")?.value
            }
        }
    )

    if (fileResponse.status !== 200)
        throw new Error(`unexpected response ${fileResponse.statusText}`)

    return new Response(fileResponse.data, {
        headers: { "Content-Type": "application/pdf" }
    })
}
