import TableMywork from "../(components)/table/tableMywork"
import { myWork } from "@/app/(types)/teller/mywork"
import axios from "axios"
import { cache } from "react"
import { cookies } from "next/headers"
import { lte } from "lodash"
const MyWork = async ({
    searchParams
}: {
    searchParams: { search: "MGD" | "CDDD"; idSearch: string | null }
}) => {
    const { search, idSearch } = searchParams
    const ListMyworks = await fetchApi({ search, idSearch })

    return <TableMywork data={ListMyworks} />
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
        const KeySearch:"citizenId" = search === "CDDD" ? "citizenId" : "citizenId"
        const bodyRequest:any = {
            [KeySearch]: idSearch
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
export const dynamic = "auto"
// export const dynamic = "force-dynamic"
export default MyWork
