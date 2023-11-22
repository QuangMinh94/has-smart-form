import { EformTemplate } from "@/app/(types)/EformTemplate"
import { Role } from "@/app/(types)/Group"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
import { DecryptedString } from "@/app/(utilities)/Crypto"
import { authOptions } from "@/app/api/auth/authOptions"
import ProviderTemplate from "@/components/context/providerTemplate"
import axios from "axios"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { cache } from "react"
import TemplateWrapperDetail from "@/app/bu/template/details/TemplateWrapperDetail"
/* 
axios.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2))
    return request
}) */

const TemplateDetailPage = async () => {
    const session = await getServerSession(authOptions)
    const id = cookies().get("encryptedId")
    if (!session) notFound()
    if (!id) notFound()

    const decryptedId = DecryptedString(id.value)
    const permission = session.user.userInfo.permission
    const userRole = session.user.userInfo.defaultGroup?.role as Role[]

    // if (!FindPermission(permission, "children", "VisibleTemplateBU")) notFound()

    const data: EformTemplate[] = await fetchTemplate(
        process.env.EFORM_GET_UPDATE_TEMPLATE!,
        {
            id: decryptedId,
            userRole: userRole[0]._id
        }
    )

    return (
        <ProviderTemplate>
            <TemplateWrapperDetail listLeft={[]} id={decryptedId} data={data} />
        </ProviderTemplate>
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

export const dynamic = "force-dynamic"
//export const revalidate = 10

export default TemplateDetailPage
