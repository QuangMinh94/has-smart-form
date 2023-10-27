import { EformTemplate } from "@/app/(types)/EformTemplate"
import ProviderTemplate from "@/components/context/providerTemplate"
import axios from "axios"
import { cookies } from "next/headers"
import { cache } from "react"
import NewTemplateWrapper from "../_components/NewTemplateWrapper"

const TemplateDetailPage = async ({ params }: { params: { id: string } }) => {
    const data = await fetchTemplateDetail(
        process.env.NEXT_PUBLIC_EFORM_GET_TEMPLATE! + "/" + params.id
    )

    return (
        <ProviderTemplate>
            <NewTemplateWrapper id={params.id} data={data} />
        </ProviderTemplate>
    )
}

const fetchTemplateDetail = cache(async (url: string) => {
    const cookie = cookies()
    const res = await axios.get(url, {
        headers: {
            Authorization: "Bearer " + cookie.get("token")?.value,
            Session: cookie.get("session")?.value
        }
    })
    const data = res.data as EformTemplate[]
    return data
})

export default TemplateDetailPage
