import { DefaultDeactiveRule, EformTemplate } from "@/app/(types)/EformTemplate"
import { Role } from "@/app/(types)/Group"
import { TreeProduct } from "@/app/(types)/TreeProduct"
import { authOptions } from "@/app/api/auth/authOptions"
import NotAuthenPage from "@/app/notAuthorized/page"
import ProviderTemplate from "@/components/context/providerTemplate"
import axios from "axios"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { RedirectType, redirect } from "next/navigation"
import { cache } from "react"
import { TreeDataType } from "../../_types/TreeDataType"
import TemplateWrapper from "../_components/TemplateWrapper"

axios.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2))
    return request
})

export interface OptionProps {
    id: string
    name: string
    checkBox: boolean
    type: string
}

const TemplateDetailPage = async ({ params }: { params: { id: string } }) => {
    const session = await getServerSession(authOptions)
    if (!session) redirect("/auth/signin", RedirectType.replace)

    const userRole = session.user.userInfo.defaultGroup?.role as Role[]

    const data: EformTemplate[] = await fetchTemplate(
        process.env.EFORM_GET_UPDATE_TEMPLATE!,
        {
            id: params.id,
            userRole: userRole[0]._id
        }
    )

    //get tree data
    const treeData: TreeProduct[] = await fetchTemplate(
        process.env.EPRODUCT_TREEDATA_PUBLIC!,
        {}
    )
    const treeDataView: TreeDataType[] = MappingChildren(treeData)

    console.log("DATASDADAS", data)

    return (
        <>
            {data.length > 0 && data[0].displayRule!.visibleView ? (
                <ProviderTemplate>
                    <TemplateWrapper
                        displayRules={
                            data[0].displayRule
                                ? data[0].displayRule
                                : DefaultDeactiveRule
                        }
                        treeData={treeDataView}
                        listLeft={[]}
                        id={params.id}
                        data={data}
                    />
                </ProviderTemplate>
            ) : (
                <NotAuthenPage />
            )}
        </>
    )
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

export default TemplateDetailPage
