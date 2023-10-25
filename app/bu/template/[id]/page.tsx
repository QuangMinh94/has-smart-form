import { EformTemplate } from "@/app/(types)/EformTemplate"
import ProviderTemplate from "@/components/context/providerTemplate"
import axios from "axios"
import { cookies } from "next/headers"
import NewTemplateWrapper from "../new/NewTemplateWrapper"

const TemplateDetailPage = async ({ params }: { params: { id: string } }) => {
    const cookie = cookies()

    const response = await axios.get(
        process.env.NEXT_PUBLIC_EFORM_GET_TEMPLATE! + "/" + params.id,
        {
            headers: {
                Authorization: "Bearer " + cookie.get("token")?.value,
                Session: cookie.get("session")?.value
            }
        }
    )

    const data = response.data as EformTemplate[]

    return (
        <ProviderTemplate>
            <NewTemplateWrapper key={"edit"} data={data} />
        </ProviderTemplate>
    )
}

export default TemplateDetailPage
