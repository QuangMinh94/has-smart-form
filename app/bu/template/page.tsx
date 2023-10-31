import { EformTemplate } from "@/app/(types)/EformTemplate"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
import { authOptions } from "@/app/api/auth/authOptions"
import axios from "axios"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { cache } from "react"
import PageHeader from "../_components/PageHeader"
import { SearchParamProvider } from "../_context/provider"
import TemplateTable, { DataTableType } from "./templateTable"
/* 
axios.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2))
    return request
}) */

const TemplatePage = async ({
    searchParams
}: {
    searchParams: { name: string }
}) => {
    const session = await getServerSession(authOptions)
    if (!session) notFound()

    const permission = session.user.userInfo.permission

    if (!FindPermission(permission, "children", "VisibleTemplateBU")) notFound()

    const data = await fetchTemplate(
        process.env.NEXT_PUBLIC_EFORM_SEARCH_TEMPLATE!,
        searchParams.name ? { name: searchParams.name } : {}
    )

    const _data: DataTableType[] = []
    data.forEach((element) => {
        _data.push({
            key: element._id,
            formName: element.name,
            approval: element.approver,
            validFrom: element.validFrom,
            status: element.status?.name
        })
    })

    return (
        <SearchParamProvider>
            <div>
                <PageHeader path="/bu/template">
                    <TemplateTable data={_data} />
                </PageHeader>
            </div>
        </SearchParamProvider>
    )
}

const fetchTemplate = cache(async (url: string, searchInput: any) => {
    const cookie = cookies()
    const res = await axios.post(url, searchInput, {
        headers: {
            Authorization: "Bearer " + cookie.get("token")?.value,
            Session: cookie.get("session")?.value
        }
    })
    const data = res.data as EformTemplate[]
    return data
})

export const dynamic = "force-dynamic"
//export const revalidate = 10

export default TemplatePage
