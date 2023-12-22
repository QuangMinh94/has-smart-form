import { FilterEformTemplate } from "@/app/(service)/EformTemplate"
import { EformTemplate } from "@/app/(types)/EformTemplate"
import {
    RequestFilterTemplate,
    RequestSeacrhEformTemplate
} from "@/app/(types)/eFormTask"
import { authOptions } from "@/app/api/auth/authOptions"
import axios from "axios"
import { getServerSession } from "next-auth"
import dynamic2 from "next/dynamic"
import { cookies } from "next/headers"
import FillterBlock from "../(component)/fillter/Fillterblock"
import Loading from "../loading"
const TableBlock = dynamic2(() => import("../(component)/table/TableBlock"), {
    loading: () => <Loading />,
    ssr: false
})
const BlockPage = async ({
    searchParams
}: {
    searchParams: {
        name?: string
        creator?: string
        approved?: string
        status?: string
        major?: string
        timecreate?: string
        timeend?: string
    }
}) => {
    const { name, creator, approved, status, major, timecreate, timeend } =
        searchParams

    const data = await fetchApi({
        nameSearch: name,
        creator,
        approved,
        status,
        major,
        timecreate,
        timeend
    })

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
    creator,
    approved,
    status,
    major,
    timecreate,
    timeend,
    nameSearch
}: {
    nameSearch?: string
    creator?: string
    approved?: string
    status?: string
    major?: string
    timecreate?: string
    timeend?: string
}): Promise<EformTemplate[]> => {
    try {
        const cookie = cookies()
        const session = await getServerSession(authOptions)
        // const idRole = session?.user?.userInfo?.defaultGroup.role?.[0]?._id
        if (!session) {
            return []
        }

        // goi service filter khi filter Option
        // if (timecreate || timeend || creator || approved || major || status) {
        const bodyRequestFilter: RequestFilterTemplate = {
            name: nameSearch,
            creator,
            approver: approved,
            status,
            eProduct: major,
            createdDate: { from: timecreate, to: timeend }
        }
        if (!nameSearch) {
            delete bodyRequestFilter.name
        }
        if (!creator) {
            delete bodyRequestFilter.creator
        }
        if (!approved) {
            delete bodyRequestFilter.approver
        }
        if (!major) {
            delete bodyRequestFilter.eProduct
        }
        if (!status) {
            delete bodyRequestFilter.status
        }
        if (!timecreate && !timeend) {
            delete bodyRequestFilter.createdDate
        } else {
            if (!timecreate) {
                delete bodyRequestFilter?.createdDate?.from
            }
            if (!timeend) {
                delete bodyRequestFilter?.createdDate?.to
            }
        }
        const res = await FilterEformTemplate({
            url: process.env.EFORM_FILTER_TEMPLATE!,
            bodyRequest: bodyRequestFilter,
            session: cookie.get("session")?.value ?? "",
            token: cookie.get("token")?.value ?? ""
        })
        return res.data
        // }

        // const bodyRequest: RequestSeacrhEformTemplate = {
        //     userRole: idRole,
        //     onlyApprove: true
        // }
        // if (nameSearch) {
        //     bodyRequest.name = nameSearch
        // }
        // const res = await SeacrhEformTemplate({
        //     bodyRequest: bodyRequest,
        //     session: cookie.get("session")?.value ?? "",
        //     token: cookie.get("token")?.value ?? ""
        // })

        // return res.data
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
