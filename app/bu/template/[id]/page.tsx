import { EformTemplate } from "@/app/(types)/EformTemplate"
import ProviderTemplate from "@/components/context/providerTemplate"
import axios from "axios"
import { cookies } from "next/headers"
import { cache } from "react"
import TemplateWrapper from "../_components/TemplateWrapper"

export interface OptionProps {
    id: string
    name: string
    checkBox: boolean
    type: string
}

const TemplateDetailPage = async ({ params }: { params: { id: string } }) => {
    const data = await fetchTemplateDetail(
        process.env.NEXT_PUBLIC_EFORM_GET_TEMPLATE! + "/" + params.id
    )

    //list left
    const response = await axios.post(process.env.NEXT_PUBLIC_EFORM_LIST!, {
        repository: "Dịch vụ tài khoản"
    })
    const res_1 = response.data as {
        name: string
        repository: string
        serverPath: string
    }[]
    const _option: OptionProps[] = []
    res_1.forEach((resChild) => {
        _option.push({
            id: resChild.repository + resChild.name,
            name: resChild.name,
            checkBox: false,
            type: resChild.repository
        })
    })

    return (
        <ProviderTemplate>
            <TemplateWrapper
                treeData={[]}
                listLeft={_option}
                id={params.id}
                data={data}
            />
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
