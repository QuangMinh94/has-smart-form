import { DefaultActiveRule } from "@/app/(types)/EformTemplate"
import { FolderTree } from "@/app/(types)/Folder"
import { Permission } from "@/app/(types)/Permission"
import { TreeDataType } from "@/app/(types)/TreeDataType"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
import { authOptions } from "@/app/api/auth/authOptions"
import ProviderTemplate from "@/components/context/providerTemplate"
import axios from "axios"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { cache } from "react"
import TemplateWrapper from "../_components/TemplateWrapper"

const NewTemplate = async () => {
    const session = await getServerSession(authOptions)
    if (!session) notFound()

    const permission: Permission[] = session.user.userInfo.permission

    if (!FindPermission(permission, "children", "VisibleBU")) notFound()

    //get tree data
    const treeData: FolderTree[] = await fetchTemplate(
        process.env.FOLDER_TREE_VIEW!,
        {}
    )

    const treeDataView: TreeDataType[] = MappingChildren(treeData)

    return (
        <ProviderTemplate>
            <TemplateWrapper
                displayRules={DefaultActiveRule}
                treeData={treeDataView}
                listLeft={[]}
                data={[]}
            />
        </ProviderTemplate>
    )
}

const MappingChildren = (product: FolderTree[]) => {
    if (product.length === 0) return []

    const childrenView: TreeDataType[] = []
    product.forEach((element) => {
        childrenView.push({
            value: element._id,
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
