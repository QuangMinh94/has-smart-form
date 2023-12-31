import axios from "axios"
import {
    bodyRequestSeacrhUser,
    BodyUserRequest,
    BodyUserRequestFileExcel,
    BodyRequestChangePass
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
export const getUserByDepartment = async (pram: {
    url: string
    bodyRequest: { department: string }
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_GET_BY_DEPARTMENT
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}

export const changePassWordUser = async (pram: {
    url: string
    bodyRequest: BodyRequestChangePass
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_CHANGE_PASSWORD_USER
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
