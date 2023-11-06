import { cache } from "react"
import { cookies } from "next/headers"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/authOptions"
import TemlateWrapper from "@/app/teller/(components)/mywork/Detail/TeamplateWrapper"
import { viewAppointMent } from "@/app/(service)/appointments"
const fetchApi = cache(async (idAppointMent: string) => {
    try {
        const cookie = cookies()
        const session = await getServerSession(authOptions)
        const idRole = session?.user?.userInfo?.defaultGroup.role?.[0]?._id
        const res = await viewAppointMent({
            bodyRequest: { id: idAppointMent, userRole: idRole },
            session: cookie.get("session")?.value ?? "",
            token: cookie.get("token")?.value ?? ""
        })

        return res.data
    } catch (e: any) {
        console.log("err", e)
        throw new Error("error")
    }
})
const DetailMyWork = async ({ params }: { params: { id: string } }) => {
    const data = await fetchApi(params.id)
    return <TemlateWrapper />
}

export default DetailMyWork
