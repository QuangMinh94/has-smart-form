import axios from "axios"
import {
    requestBodyEproduct,
    requestBodyEproductTree,
    requestBodyAddEproduct
} from "@/app/(types)/eProduct"

export const GetProduct = async (pram: {
    url: string
    bodyRequest: requestBodyEproduct
    token: string
    session: string
}) => {
    // NEXT_PUBLIC_GET_EPRODUCT
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const GetProductTree = async (pram: {
    url: string
    bodyRequest: requestBodyEproductTree
    token: string
    session: string
}) => {
    // process.env.NEXT_PUBLIC_EPRODUCT_TREEDATA!,
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}

export const AddEproduct = async (pram: {
    url: string
    bodyRequest: requestBodyAddEproduct
    token: string
    session: string
}) => {
    // NEXT_PUBLIC_ADD_EPRODUCT
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
