import {
    RequestApoinMent,
    RequestSeacrhApoinMent
} from "@/app/(types)/Apointment"
import { myWork } from "@/app/(types)/teller/mywork"
import { authOptions } from "@/app/api/auth/authOptions"
import TemlateWrapper from "@/app/teller/(components)/mywork/Detail/TeamplateWrapper"
import axios from "axios"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { cache } from "react"
// import { cache } from "react"
const viewAppointMent = async (pram: {
    bodyRequest: RequestApoinMent
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(process.env.VIEW_APPOINT_MENTS!, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
const seacrhAppointMent = async (pram: {
    bodyRequest: RequestSeacrhApoinMent
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(
        process.env.SEARCH_APPOINT_MENTS!,
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

            /* console.log(
                "WHERE THE FUCK IS APPOINTMENT",
                resSeacrhAppointMent.data
            ) */

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

    //console.log("HSIDANEUJDS", findMyMork)

    return (
        <>
            {/* <p id="disableInput" /> */}
            <TemlateWrapper mywork={findMyMork!} />
        </>
    )
}
export const dynamic = "force-dynamic"
export default DetailMyWork
