import { EformTemplate } from "@/app/(types)/EformTemplate"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
import { authOptions } from "@/app/api/auth/authOptions"
import axios from "axios"
import delay from "delay"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { RedirectType, notFound, redirect } from "next/navigation"
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
    await delay(2000)
    const session = await getServerSession(authOptions)
    if (!session) redirect("/auth/signin", RedirectType.replace)

    const permission = session.user.userInfo.permission

    if (!FindPermission(permission, "children", "VisibleTemplateBU")) notFound()

    let data: EformTemplate[] = []
    let _data: DataTableType[] = []

    data = await fetchTemplatePage(
        process.env.EFORM_SEARCH_TEMPLATE!,
        searchParams.name ? { name: searchParams.name } : {}
    )
    data.forEach((element) => {
        _data.push({
            key: element._id,
            formName: element.name,
            approval: element.approver
                ? element.approver.lastName + " " + element.approver!.firstName
                : "",
            validFrom: element.validFrom,
            status: element.status?.description,
            queryCode: element.queryCode
        })
    })

    return (
        <SearchParamProvider>
            <PageHeader path="/bu/template" addNewPermission={false}>
                <TemplateTable
                    readOnly={true}
                    data={_data}
                    ksvPermission={FindPermission(
                        permission,
                        "children",
                        "VisibleVerifyButton"
                    )}
                />
            </PageHeader>
        </SearchParamProvider>
    )
}

const fetchTemplatePage = cache(async (url: string, searchInput: any) => {
    const cookie = cookies()
    try {
        const res = await axios.post(url, searchInput, {
            headers: {
                Authorization: "Bearer " + cookie.get("token")?.value,
                Session: cookie.get("session")?.value
            }
        })
        const data = res.data
        return data
    } catch {
        return []
    }
})

export const dynamic = "force-dynamic"
//export const revalidate = 10

export default TemplatePage