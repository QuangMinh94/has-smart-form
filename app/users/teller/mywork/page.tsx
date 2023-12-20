import { myWork } from "@/app/(types)/teller/mywork"
import { authOptions } from "@/app/api/auth/authOptions"
import axios from "axios"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
// import { cache } from "react"
import TableMywork from "../(components)/table/tableMywork"

/* axios.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2))
    return request
}) */

const MyWork = async ({
    searchParams
}: {
    searchParams: { search: "MGD" | "CCCD"; idSearch: string | null }
}) => {
    const { search, idSearch } = searchParams
    const ListMyworks = await fetchApi({ search, idSearch })

    return (
        <>
            <TableMywork
                data={ListMyworks.map((item) => ({
                    ...item,
                    key: item?._id ?? ""
                }))}
            />
        </>
    )
}
const fetchApi = async ({
    search,
    idSearch
}: {
    search: "MGD" | "CCCD"
    idSearch: string | null
}): Promise<myWork[]> => {
    const cookie = cookies()
    const session = await getServerSession(authOptions)
    if (!session) {
        return []
    }
    const idRole = session?.user?.userInfo?.defaultGroup.role?.[0]?._id

    const KeySearch: "citizenId" | "appointmentCode" =
        search === "CCCD" ? "citizenId" : "appointmentCode"
    const bodyRequest: any = {
        [KeySearch]: idSearch?.trim(),
        userRole: idRole,
        active: true
    }
    if (!idSearch) {
        delete bodyRequest[KeySearch]
    }

    console.log("bodyteller", bodyRequest)
    try {
        const res = await axios.post(
            process.env.SEARCH_APPOINT_MENTS!,
            bodyRequest,
            {
                headers: {
                    Authorization: "Bearer " + cookie.get("token")?.value,
                    Session: cookie.get("session")?.value
                }
            }
        )

        return res.data
    } catch (e: any) {
        console.log("loiiiiiiiiiiiiiiiiiiiiiiiiiiii", JSON.stringify(e))
        throw new Error("error fetching", e)
    }
}

export const dynamic = "force-dynamic"
export default MyWork
