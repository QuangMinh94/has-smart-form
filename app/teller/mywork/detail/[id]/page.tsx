import { cache } from "react"
import { cookies } from "next/headers"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/authOptions"
import TemlateWrapper from "@/app/teller/(components)/mywork/Detail/TeamplateWrapper"
import { myWork } from "@/app/(types)/teller/mywork"
import {
    viewAppointMent,
    seacrhAppointMent
} from "@/app/(service)/appointments"
const fetchApi = cache(
    async (
        idAppointMent: string,
        codeAppointMent: string
    ): Promise<myWork[]> => {
        try {
            const cookie = cookies()
            const session = await getServerSession(authOptions)
            const idRole = session?.user?.userInfo?.defaultGroup.role?.[0]?._id
            const [resViewAppointMent, resSeacrhAppointMent]: any =
                await Promise.all([
                    viewAppointMent({
                        bodyRequest: { id: idAppointMent, userRole: idRole },
                        session: cookie.get("session")?.value ?? "",
                        token: cookie.get("token")?.value ?? ""
                    }),
                    seacrhAppointMent({
                        bodyRequest: {
                            appointmentCode: codeAppointMent,
                            userRole: idRole
                        },
                        session: cookie.get("session")?.value ?? "",
                        token: cookie.get("token")?.value ?? ""
                    })
                ])

            return resSeacrhAppointMent.data
        } catch (e: any) {
            console.log("err", e)
            throw new Error("error")
        }
    }
)
const DetailMyWork = async ({
    params,
    searchParams
}: {
    params: { id: string }
    searchParams: { code: string; CCCD: string; Name: string }
}) => {
    const data = await fetchApi(params.id, searchParams.code)
    const findMyMork = data.find(
        (item) => item.appointmentCode === searchParams.code
    )
    return <TemlateWrapper mywork={findMyMork!} />
}

export default DetailMyWork
