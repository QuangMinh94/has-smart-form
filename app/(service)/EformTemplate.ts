import {
    RequestEformTaks,
    RequestFilterTemplate,
    RequestSeacrhEformTemplate,
    RequestVeRiFyEformTaks
} from "@/app/(types)/eFormTask"
import axios from "axios"
export const addEformTask = async (pram: {
    url: string
    bodyRequest: RequestEformTaks
    token: string
    session: string
}) => {
    // process.env.NEXT_PUBLIC_EFORM_TASK!,
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const veriFyEformTask = async (pram: {
    url: string
    bodyRequest: RequestVeRiFyEformTaks
    token: string
    session: string
}) => {
    // NEXT_PUBLIC_EFORM_VERIFY_TEMPLATE_APPOINT_MENTS
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const SeacrhEformTemplate = async (pram: {
    url: string
    bodyRequest: RequestSeacrhEformTemplate
    token: string
    session: string
}) => {
    // NEXT_PUBLIC_EFORM_SEARCH_TEMPLATE

    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const GethEformTemplate = async (pram: {
    url: string
    bodyRequest: { notBelongToEProduct?: boolean }
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_GET_EFORM_TEMPLATE

    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const FilterEformTemplate = async (pram: {
    url: string
    bodyRequest: RequestFilterTemplate
    token: string
    session: string
}) => {
    // EFORM_FILTER_TEMPLATE

    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
