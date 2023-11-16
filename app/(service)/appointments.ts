import axios from "axios"

import {
    RequestApoinMent,
    RequestSeacrhApoinMent,
    RequestSeacrhCustomInfo,
    RequestAddApoinMent
} from "@/app/(types)/Apointment"
export const viewAppointMent = async (pram: {
    url: string
    bodyRequest: RequestApoinMent
    token: string
    session: string
}) => {
    // process.env.NEXT_PUBLIC_VIEW_APPOINT_MENTS!,
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const seacrhAppointMent = async (pram: {
    url: string
    bodyRequest: RequestSeacrhApoinMent
    token: string
    session: string
}) => {
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const SeacrhCustomInFo = async (pram: {
    url: string
    bodyRequest: RequestSeacrhCustomInfo
    token: string
    session: string
}) => {
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const addAppointMent = async (pram: {
    url: string
    bodyRequest: RequestAddApoinMent
    token: string
    session: string
}) => {
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
