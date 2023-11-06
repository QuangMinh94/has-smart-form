import React from "react"
import Approver from "../../../(component)/Approver"
import { cache } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/authOptions"
import { cookies } from "next/headers"
import { GetProduct } from "@/app/(service)/eProduct"
import { eProduct } from "@/app/(types)/eProduct"
const fetchApi = cache(async (idEproduct: string): Promise<eProduct[]> => {
    try {
        const cookie = cookies()
        const session = await getServerSession(authOptions)
        // const idRole = session?.user?.userInfo?.defaultGroup.role?.[0]?._id
        const res = await GetProduct({
            bodyRequest: { _id: idEproduct },
            session: cookie.get("session")?.value ?? "",
            token: cookie.get("token")?.value ?? ""
        })

        return res.data
    } catch (e: any) {
        throw new Error(e)
    }
})
const KsvTellerPage = async ({
    params,
    searchParams
}: {
    params: { id: string }
    searchParams: { code: string }
}) => {
    console.log("searchParams", searchParams)
    // const [idAppoinment, idEproduct] = params.id
    // const eProducts = await fetchApi(idEproduct)
    // const eProduct = eProducts.find((eProduct) => eProduct._id === idEproduct)
    return <Approver EformTemplate={[]} />
}
export default KsvTellerPage
