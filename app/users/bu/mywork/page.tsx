import { EformTemplate } from "@/app/(types)/EformTemplate"
import { Role } from "@/app/(types)/Group"
import { Permission } from "@/app/(types)/Permission"
import { Users } from "@/app/(types)/Users"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
import { authOptions } from "@/app/api/auth/authOptions"
import axios from "axios"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { RedirectType, redirect } from "next/navigation"
import { cache } from "react"
import PageHeader from "../_components/PageHeader"
import { SearchParamProvider } from "../_context/provider"
import TemplateTable, { DataTableType } from "../template/templateTable"

/* axios.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2))
    return request
}) */

const MyWorkPage = async ({
    searchParams
}: {
    searchParams: { name: string }
}) => {
    const session = await getServerSession(authOptions)
    if (!session) redirect("/auth/signin", RedirectType.replace)

    const userInfo = session.user.userInfo as Users
    const userRole = userInfo.defaultGroup?.role as Role[]
    const permission = session.user.userInfo.permission as Permission[]

    const data = await fetchTemplateData(
        process.env.EFORM_SEARCH_TEMPLATE!,
        searchParams.name
            ? { name: searchParams.name, userRole: userRole[0]._id }
            : { userRole: userRole[0]._id }
    )

    const _data: DataTableType[] = []
    data.forEach((element) => {
        _data.push({
            key: element._id,
            formName: element.name,
            approval: element.approver,
            validFrom: element.validFrom,
            status: element.status?.description
        })
    })

    return (
        <SearchParamProvider>
            <PageHeader
                path="/users/bu/mywork"
                addNewPermission={FindPermission(
                    permission,
                    "children",
                    "VisibleAddNew"
                )}
            >
                <TemplateTable
                    readOnly={false}
                    data={_data}
                    ksvPermission={FindPermission(
                        permission,
                        "children",
                        "VisibleVerifyButton"
                    )}
                />
            </PageHeader>
        </SearchParamProvider>
    )
}

const fetchTemplateData = cache(async (url: string, searchInput: any) => {
    const cookie = cookies()
    const res = await axios.post(url, searchInput, {
        headers: {
            Authorization: "Bearer " + cookie.get("token")?.value,
            Session: cookie.get("session")?.value
        }
    })
    const data = res.data as EformTemplate[]
    return data
})

export const dynamic = "force-dynamic"
//export const revalidate = 10

export default MyWorkPage
