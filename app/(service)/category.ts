import axios from "axios"
export const cateGoriFilter = async (pram: {
    url: string
    bodyRequest: {
        type:
            | "DepartmentType"
            | "StatusForm"
            | "ConnectorType"
            | "ConnectorMethod"
            | "Connector"
            | "ConnectorGroup"
    }
    token: string
    session: string
}) => {
    //NEXT_PUBLIC_CATEGORY
    const { bodyRequest, token, session, url } = pram
    const res = await axios.post(url, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
