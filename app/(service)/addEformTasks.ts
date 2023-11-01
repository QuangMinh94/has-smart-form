import axios from "axios"
import { RequestEformTaks } from "@/app/(types)/eFormTask"
export const addEformTask = async (pram: {
    bodyRequest: RequestEformTaks
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(
        process.env.NEXT_PUBLIC_EFORM_TASK!,
        bodyRequest,
        {
            headers: {
                Authorization: "Bearer " + token,
                Session: session
            }
        }
    )
    return res
}