import { Permission } from "@/app/(types)/Permission"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
import { authOptions } from "@/app/api/auth/authOptions"
import ProviderTemplate from "@/components/context/providerTemplate"
import axios from "axios"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { OptionProps } from "../[id]/page"
import NewTemplateWrapper from "../_components/TemplateWrapper"

const NewTemplate = async () => {
    const session = await getServerSession(authOptions)
    if (!session) notFound()

    const permission: Permission[] = session.user.userInfo.permission

    if (!FindPermission(permission, "children", "VisibleBU")) notFound()

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
            <NewTemplateWrapper
                permission={permission}
                listLeft={_option}
                data={[]}
            />
        </ProviderTemplate>
    )
}

export default NewTemplate
