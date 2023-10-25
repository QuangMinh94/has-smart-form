import { EformTemplate } from "@/app/(types)/EformTemplate"
import axios from "axios"
import { cookies } from "next/headers"
import PageHeader from "../_components/PageHeader"
import SearchParamProvider from "../_context/searchParamProvider"
import TemplateTable from "./templateTable"

const TemplatePage = async () => {
    const cookie = cookies()
    const response = await axios.post(
        process.env.NEXT_PUBLIC_EFORM_SEARCH_TEMPLATE!,
        {},
        {
            headers: {
                Authorization: "Bearer " + cookie.get("token")?.value,
                Session: cookie.get("session")?.value
            }
        }
    )
    const data = response.data as EformTemplate[]

    return (
        <SearchParamProvider>
            <PageHeader>
                <TemplateTable data={data} />
            </PageHeader>
        </SearchParamProvider>
    )
}

export const dynamic = "force-dynamic"

export default TemplatePage
