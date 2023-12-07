import axios from "axios"
import {
    bodyRequestSeacrhUser,
    BodyUserRequest,
    BodyUserRequestFileExcel
} from "../(types)/Users"
export const SearchUser = async (pram: {
    url: string
    bodyRequest: bodyRequestSeacrhUser
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_SEARCH_USER
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const addUser = async (pram: {
    url: string
    bodyRequest: BodyUserRequest
    token: string
    session: string
}) => {
    // NEXT_PUBLIC_ADD_USER
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const updateUser = async (pram: {
    url: string
    bodyRequest: BodyUserRequest
    token: string
    session: string
}) => {
    // NEXT_PUBLIC_UPDATE_USER
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const addMultipleUser = async (pram: {
    url: string
    bodyRequest: { users: BodyUserRequestFileExcel[] }
    token: string
    session: string
}) => {
    // NEXT_PUBLIC_ADD_MULTIP_USER
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
