"use client"

import axios from "axios"
import {
    requestBodyEproduct,
    requestBodyEproductTree
} from "@/app/(types)/eProduct"

export const GetProduct = async (pram: {
    bodyRequest: requestBodyEproduct
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(
        process.env.NEXT_PUBLIC_EPRODUCT_TREEDATA!,
        bodyRequest,
        {
            headers: {
                Authorization: "Bearer " + token,
                Session: session
            }
        }
    )
    return res
}
export const GetProductTree = async (pram: {
    bodyRequest: requestBodyEproductTree
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(
        process.env.NEXT_PUBLIC_EPRODUCT_TREEDATA!,
        bodyRequest,
        {
            headers: {
                Authorization: "Bearer " + token,
                Session: session
            }
        }
    )
    return res
}
