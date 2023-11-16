import FillterBlock from "../(component)/fillter/Fillterblock"
import TableBlock from "../(component)/table/TableBlock"
import { authOptions } from "@/app/api/auth/authOptions"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { SeacrhEformTemplate } from "@/app/(service)/EformTemplate"
import { RequestSeacrhEformTemplate } from "@/app/(types)/eFormTask"
import { EformTemplate } from "@/app/(types)/EformTemplate"
const fetchApi = async ({
    nameSearch
}: {
    nameSearch: string
}): Promise<EformTemplate[]> => {
    const cookie = cookies()
    const session = await getServerSession(authOptions)
    if (!session) {
        return []
    }
    const idRole = session?.user?.userInfo?.defaultGroup.role?.[0]?._id

    try {
        const bodyRequest: RequestSeacrhEformTemplate = {
            userRole: idRole,
            onlyApprove: true
        }
        if (nameSearch) {
            bodyRequest.name = nameSearch
        }
        const res = await SeacrhEformTemplate({
            bodyRequest: bodyRequest,
            session: cookie.get("session")?.value ?? "",
            token: cookie.get("token")?.value ?? ""
        })
        return res.data
    } catch (e: any) {
        throw new Error("error fetching", e)
    }
}
const BlockPage = async ({
    searchParams
}: {
    searchParams: { name: string }
}) => {
    const data = await fetchApi({ nameSearch: searchParams.name })

    return (
        <div>
            <div className="my-[20px] w-[30%]">
                <FillterBlock />
            </div>
            <TableBlock
                data={data.map((item) => ({ ...item, key: item._id }))}
            />
        </div>
    )
}

export const dynamic = "force-dynamic"
export default BlockPage
