import {
    RequestAddIntergration,
    RequestAddOrUpdateConnection,
    RequestTestConnection
} from "@/app/(types)/Connecter"
import axios from "axios"
export const testConnection = async (pram: {
    url: string
    bodyRequest: RequestTestConnection
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_TEST_CONNECTION
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const addOrUpdateConnection = async (pram: {
    url: string
    bodyRequest: RequestAddOrUpdateConnection
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_ADD_CONNECTION
    //NEXT_PUBLIC_UPDATE_CONNECTION
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const addIntergration = async (pram: {
    url: string
    bodyRequest: RequestAddIntergration
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_ADD_INTEGRATION

    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
