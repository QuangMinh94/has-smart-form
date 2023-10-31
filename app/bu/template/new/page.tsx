import { Permission } from "@/app/(types)/Permission"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
import { authOptions } from "@/app/api/auth/authOptions"
import ProviderTemplate from "@/components/context/providerTemplate"
import axios from "axios"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { cache } from "react"
import { OptionProps } from "../[id]/page"
import TemplateWrapper from "../_components/TemplateWrapper"

const NewTemplate = async () => {
    const session = await getServerSession(authOptions)
    if (!session) notFound()

    const permission: Permission[] = session.user.userInfo.permission

    if (!FindPermission(permission, "children", "VisibleBU")) notFound()

    const _option = await fetchRepositoryList(
        process.env.NEXT_PUBLIC_EFORM_LIST!
    )
    return (
        <ProviderTemplate>
            <TemplateWrapper listLeft={_option} data={[]} />
        </ProviderTemplate>
    )
}

const fetchRepositoryList = cache(async (url: string) => {
    const response = await axios.post(url, {
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
    return _option
})

export default NewTemplate
