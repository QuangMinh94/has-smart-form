import axios from "axios"
export const cateGoriFilter = async (pram: {
    url: string
    bodyRequest: { type: "DepartmentType" }
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_CATEGORIES_FILTER
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
