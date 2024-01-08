import { RequestApoinMent } from "@/app/(types)/Apointment"
import { myWork } from "@/app/(types)/teller/mywork"
import TemlateWrapperQueries from "@/components/TemlateWrapperQueries"
import axios from "axios"
import { cookies } from "next/headers"
import { cache } from "react"
// import { cache } from "react"
const viewAppointMent = async (pram: {
    bodyRequest: RequestApoinMent
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(process.env.QUERY_APPOINTMENT!, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}
const fetchApi = cache(async (queryCode: string): Promise<myWork> => {
    try {
        const cookie = cookies()
        //const session = await getServerSession(authOptions)
        //const idRole = session?.user?.userInfo?.defaultGroup.role?.[0]?._id
        const [resSeacrhAppointMent]: any = await Promise.all([
            viewAppointMent({
                bodyRequest: { queryCode: queryCode },
                session: cookie.get("session")?.value ?? "",
                token: cookie.get("token")?.value ?? ""
            })
        ])

        return resSeacrhAppointMent.data
    } catch (e: any) {
        console.log("err", e)
        throw new Error("error")
    }
})

const QueriesDetailPageKSV = async ({ params }: { params: { id: string } }) => {
    const data = await fetchApi(params.id)

    return (
        <>
            <p id="disableInput" />
            <TemlateWrapperQueries mywork={data} />
        </>
    )
}
export const dynamic = "force-dynamic"
export default QueriesDetailPageKSV
