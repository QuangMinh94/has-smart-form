import React from "react"
import Approver from "../../../(component)/Approver"
import { cache } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/authOptions"
import { cookies } from "next/headers"
import { GetProduct } from "@/app/(service)/eProduct"
import { eProduct } from "@/app/(types)/eProduct"
import { myWork } from "@/app/(types)/teller/mywork"
import {
    viewAppointMent,
    seacrhAppointMent
} from "@/app/(service)/appointments"
const fetchApi = cache(async (codeAppointMent: string): Promise<myWork[]> => {
    try {
        const cookie = cookies()
        const session = await getServerSession(authOptions)
        const idRole = session?.user?.userInfo?.defaultGroup.role?.[0]?._id
        const res = await seacrhAppointMent({
            bodyRequest: {
                appointmentCode: codeAppointMent,
                userRole: idRole
            },
            session: cookie.get("session")?.value ?? "",
            token: cookie.get("token")?.value ?? ""
        })

        return res.data
    } catch (e: any) {
        console.log("err", e)
        throw new Error("error")
    }
})
const KsvTellerPage = async ({
    params,
    searchParams
}: {
    params: { id: string }
    searchParams: { code: string }
}) => {
    const data = await fetchApi(searchParams.code)
    const findMyMork = data.find(
        (item) => item.appointmentCode === searchParams.code
    )

    return <Approver mywork={findMyMork!} />
}
export default KsvTellerPage
