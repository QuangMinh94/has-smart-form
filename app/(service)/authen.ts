import axios from "axios"
export const GetAuthen = async (pram: {
    url: string
    bodyRequest: { Active: boolean }
    token: string
    session: string
}) => {
    // NEXT_PUBLIC_GET_AUTH
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
