import {
    RequestApoinMent,
    RequestSeacrhApoinMent
} from "@/app/(types)/Apointment"
import { myWork } from "@/app/(types)/teller/mywork"
import { authOptions } from "@/app/api/auth/authOptions"
import TemlateWrapper from "@/app/users/teller/(components)/mywork/Detail/TeamplateWrapper"

import { getServerSession } from "next-auth"
import { cookies } from "next/headers"

const fetchApi = async (
    idAppointMent: string,
    codeAppointMent: string
): Promise<myWork> => {
    try {
        const cookie = cookies()
        const session = await getServerSession(authOptions)
        const idRole = session?.user?.userInfo?.defaultGroup.role?.[0]?._id
        console.log("body", { id: idAppointMent, userRole: idRole })
        console.log("token", cookie.get("token")?.value)
        console.log("session", cookie.get("session")?.value)
        const res = await fetch(process.env.VIEW_APPOINT_MENTS!, {
            cache: "no-store",
            method: "POST",
            body: JSON.stringify({ id: idAppointMent, userRole: idRole }),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + cookie.get("token")?.value ?? "",
                Session: cookie.get("session")?.value ?? ""
            }
        })
        const data = await res.json()
        console.log("data: ", data)
        return data
    } catch (e: any) {
        console.log("err", e)
        throw new Error("error")
    }
}

const DetailMyWork = async ({
    params,
    searchParams
}: {
    params: { id: string }
    searchParams: { code: string; CCCD: string; Name: string }
}) => {
    console.log("params: ", params)
    console.log("searchParams: ", searchParams)
    const data = await fetchApi(params.id, searchParams.code)

    return (
        <>
            {/* <p id="disableInput" /> */}
            <TemlateWrapper mywork={data!} />
        </>
    )
}
export const dynamic = "force-dynamic"
export default DetailMyWork
