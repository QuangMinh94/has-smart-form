import {
    RequestAddApoinMent,
    RequestApoinMent,
    RequestSeacrhApoinMent,
    RequestSeacrhCustomInfo
} from "@/app/(types)/Apointment"
import env from "@beam-australia/react-env"
import axios from "axios"
export const viewAppointMent = async (pram: {
    bodyRequest: RequestApoinMent
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(env("VIEW_APPOINT_MENTS"), bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const seacrhAppointMent = async (pram: {
    bodyRequest: RequestSeacrhApoinMent
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(env("APPOINT_MENTS"), bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const seacrhCustomInFo = async (pram: {
    bodyRequest: RequestSeacrhCustomInfo
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(env("SEARCH_CUSTOMER_INFO"), bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const addAppointMent = async (pram: {
    bodyRequest: RequestAddApoinMent
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(env("ADD_APPOINT_MENTS"), bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
