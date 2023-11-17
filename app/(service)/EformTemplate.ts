import {
    RequestEformTaks,
    RequestVeRiFyEformTaks
} from "@/app/(types)/eFormTask"
import env from "@beam-australia/react-env"
import axios from "axios"
export const addEformTask = async (pram: {
    bodyRequest: RequestEformTaks
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(env("EFORM_TASK"), bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const veriFyEformTask = async (pram: {
    bodyRequest: RequestVeRiFyEformTaks
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(
        env("EFORM_VERIFY_TEMPLATE_APPOINT_MENTS"),
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
