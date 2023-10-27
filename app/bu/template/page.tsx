import { EformTemplate } from "@/app/(types)/EformTemplate"
import axios from "axios"
import { cookies } from "next/headers"
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
            <PageHeader>
                <TemplateTable data={_data} />
            </PageHeader>
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
