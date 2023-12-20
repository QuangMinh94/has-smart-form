import axios from "axios"
import {
    requestBodyEproduct,
    requestBodyEproductTree,
    requestBodyAddEproduct,
    requestBodyUpdateEproduct
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
export const UpdateEproduct = async (pram: {
    url: string
    bodyRequest: requestBodyUpdateEproduct
    token: string
    session: string
}) => {
    // NEXT_PUBLIC_UPDATE_EPRODUCT
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}

export const ViewPermissonEproduct = async (pram: {
    url: string
    token: string
    session: string
}) => {
    // NEXT_PUBLIC_EPRODUCT_VIEW_PERMISSION
    const { token, session, url } = pram
    const res = await axios.get(url, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
