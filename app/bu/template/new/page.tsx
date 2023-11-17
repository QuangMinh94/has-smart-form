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

    const treeDataView: TreeDataType[] = MappingChildren(treeData)

    /* const _option = await fetchRepositoryList(
        env("EFORM_LIST!
    ) */
    return (
        <ProviderTemplate>
            <TemplateWrapper treeData={treeDataView} listLeft={[]} data={[]} />
        </ProviderTemplate>
    )
}

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
