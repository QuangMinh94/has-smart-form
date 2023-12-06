import axios from "axios"
export const getCadasTrals = async (pram: {
    url: string
    bodyRequest: { parent?: string; type: "TTP" | "QH" | "PX" }
    token: string
    session: string
}) => {
    // NEXT_PUBLIC_GET_CADASTRALS
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
