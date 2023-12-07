import { bodyDepartmentRequest } from "@/app/(types)/Department"
import axios from "axios"
export const getDepartment = async (pram: {
    url: string
    bodyRequest: { Active: boolean }
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_GET_DEPARTMENT
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const addDepartment = async (pram: {
    url: string
    bodyRequest: bodyDepartmentRequest
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_ADD_DEPARTMENT
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}

export const updateDepartment = async (pram: {
    url: string
    bodyRequest: bodyDepartmentRequest
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_UPDATE_DEPARTMENT
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
