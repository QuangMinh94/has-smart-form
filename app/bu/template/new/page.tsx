import { Permission } from "@/app/(types)/Permission"
import { TreeProduct } from "@/app/(types)/TreeProduct"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
import { authOptions } from "@/app/api/auth/authOptions"
import ProviderTemplate from "@/components/context/providerTemplate"
import axios from "axios"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { cache } from "react"
import { TreeDataType } from "../../_types/TreeDataType"
import { OptionProps } from "../[id]/page"
import TemplateWrapper from "../_components/TemplateWrapper"

const NewTemplate = async () => {
    const session = await getServerSession(authOptions)
    if (!session) notFound()

    const permission: Permission[] = session.user.userInfo.permission

    if (!FindPermission(permission, "children", "VisibleBU")) notFound()

    //get tree data
    const treeData: TreeProduct[] = await fetchTemplate(
        process.env.EPRODUCT_TREEDATA!,
        {}
    )
    console.log("My tree data", treeData)

    const treeDataView: TreeDataType[] = MappingChildren(treeData)

    /* const _option = await fetchRepositoryList(
        process.env.NEXT_PUBLIC_EFORM_LIST!
    ) */
    return (
        <ProviderTemplate>
            <TemplateWrapper treeData={treeDataView} listLeft={[]} data={[]} />
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

const MappingChildren = (product: TreeProduct[]) => {
    if (product.length === 0) return []

    const childrenView: TreeDataType[] = []
    product.forEach((element) => {
        childrenView.push({
            value: element.parent
                ? "/" + element.parent.name + "/" + element.name
                : "/" + element.name,
            title: element.name,
            children:
                element.children.length !== 0
                    ? MappingChildren(element.children)
                    : []
        })
    })
    return childrenView
}

const fetchTemplate = cache(async (url: string, searchInput: any) => {
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

export default NewTemplate
