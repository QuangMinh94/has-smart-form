import TableMywork from "../(components)/table/tableMywork"
import { myWork } from "@/app/(types)/teller/mywork"
import axios from "axios"
import { cache } from "react"
import { cookies } from "next/headers"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/authOptions"
const MyWork = async ({
    searchParams
}: {
    searchParams: { search: "MGD" | "CDDD"; idSearch: string | null }
}) => {
    const { search, idSearch } = searchParams
    const ListMyworks = await fetchApi({ search, idSearch })

    return (
        <TableMywork
            data={ListMyworks.map((item, index) => ({
                ...item,
                key: item?._id ?? ""
            }))}
        />
    )
}
const fetchApi = cache(
    async ({
        search,
        idSearch
    }: {
        search: "MGD" | "CDDD"
        idSearch: string | null
    }): Promise<myWork[]> => {
        const cookie = cookies()
        const session = await getServerSession(authOptions)
        if (!session) {
            return []
        }
        const idRole = session?.user?.userInfo?.defaultGroup.role?.[0]?._id

        const KeySearch: "citizenId" | "appointmentCode" =
            search === "CDDD" ? "citizenId" : "appointmentCode"
        const bodyRequest: any = {
            [KeySearch]: idSearch,
            userRole: idRole
        }
        if (!idSearch) {
            delete bodyRequest[KeySearch]
        }
        try {
            const res = await axios.post(
                process.env.NEXT_PUBLIC_APPOINT_MENTS!,
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
            throw new Error("error fetching", e)
        }
    }
)
// export const dynamic = "auto"
// export const dynamic = "force-dynamic"
export default MyWork
