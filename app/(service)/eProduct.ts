import {
    requestBodyEproduct,
    requestBodyEproductTree
} from "@/app/(types)/eProduct"
import env from "@beam-australia/react-env"
import axios from "axios"

export const GetProduct = async (pram: {
    bodyRequest: requestBodyEproduct
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(env("GET_EPRODUCT"), bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
export const GetProductTree = async (pram: {
    bodyRequest: requestBodyEproductTree
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(env("EPRODUCT_TREEDATA"), bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
