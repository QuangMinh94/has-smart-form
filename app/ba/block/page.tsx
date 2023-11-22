import FillterBlock from "../(component)/fillter/Fillterblock"
import { authOptions } from "@/app/api/auth/authOptions"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { RequestSeacrhEformTemplate } from "@/app/(types)/eFormTask"
import { EformTemplate } from "@/app/(types)/EformTemplate"
import dynamic2 from "next/dynamic"
import axios from "axios"
import Loading from "../loading"
const TableBlock = dynamic2(() => import("../(component)/table/TableBlock"), {
    loading: () => <Loading />,
    ssr: false
})
const BlockPage = async ({
    searchParams
}: {
    searchParams: { name: string }
}) => {
    const data = await fetchApi({ nameSearch: searchParams.name })

    return (
        <>
            <div className="my-[20px] w-[30%]">
                <FillterBlock />
            </div>
            <TableBlock
                data={data.map((item) => ({ ...item, key: item._id }))}
            />
        </>
    )
}
const fetchApi = async ({
    nameSearch
}: {
    nameSearch: string
}): Promise<EformTemplate[]> => {
    try {
        const cookie = cookies()
        const session = await getServerSession(authOptions)
        const idRole = session?.user?.userInfo?.defaultGroup.role?.[0]?._id
        if (!session) {
            return []
        }
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
const SeacrhEformTemplate = async (pram: {
    bodyRequest: RequestSeacrhEformTemplate
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(
        process.env.EFORM_SEARCH_TEMPLATE!,
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
export const dynamic = "force-dynamic"
export default BlockPage
