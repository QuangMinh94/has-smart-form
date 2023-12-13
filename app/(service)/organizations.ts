import axios from "axios"
import { bodyRequestOrganization } from "@/app/(types)/Organization"
export const updateOrganization = async (pram: {
    url: string
    bodyRequest: bodyRequestOrganization
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_UPDATE_ORGANIZATIONS
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const getOrganization = async (pram: {
    url: string
    bodyRequest: { _id: string }
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_GET_ORGANIZATIONS
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
