import axios from "axios"
import { bodyGroupRequest } from "@/app/(types)/Group"
import { bodyRequestAddUserToGroup } from "@/app/(types)/Users"
export const getGroup = async (pram: {
    url: string
    bodyRequest: { active: boolean }
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_GET_GROUP
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const addAndUpdateGroup = async (pram: {
    url: string
    bodyRequest: bodyGroupRequest
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_UPDATE_GROUP
    //NEXT_PUBLIC_ADD_GROUP
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const addUserToGroup = async (pram: {
    url: string
    bodyRequest: bodyRequestAddUserToGroup
    token: string
    session: string
}) => {
    // NEXT_PUBLIC_ADD_USER_TO_GROUP
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
