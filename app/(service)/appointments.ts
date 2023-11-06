import axios from "axios"
import {
    RequestApoinMent,
    RequestSeacrhApoinMent
} from "@/app/(types)/Apointment"
export const viewAppointMent = async (pram: {
    bodyRequest: RequestApoinMent
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(
        process.env.NEXT_PUBLIC_VIEW_APPOINT_MENTS!,
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
export const seacrhAppointMent = async (pram: {
    bodyRequest: RequestSeacrhApoinMent
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(
        process.env.NEXT_PUBLIC_APPOINT_MENTS!,
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
