import ProviderTemplate from "@/components/context/providerTemplate"
import axios from "axios"
import { OptionProps } from "../[id]/page"
import NewTemplateWrapper from "../_components/NewTemplateWrapper"

const NewTemplate = async () => {
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
            <NewTemplateWrapper listLeft={_option} data={[]} />
        </ProviderTemplate>
    )
}

export default NewTemplate
