import { EformTemplate } from "@/app/(types)/EformTemplate"
import { Role } from "@/app/(types)/Group"
import { Users } from "@/app/(types)/Users"
import { authOptions } from "@/app/api/auth/authOptions"
import axios from "axios"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { cache } from "react"
import PageHeader from "../_components/PageHeader"
import { SearchParamProvider } from "../_context/provider"
import TemplateTable, { DataTableType } from "../template/templateTable"

axios.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2))
    return request
})

const MyWorkPage = async ({
    searchParams
}: {
    searchParams: { name: string }
}) => {
    const session = await getServerSession(authOptions)

    if (session) {
        const userInfo = session.user.userInfo as Users
        const userRole = userInfo.defaultGroup?.role as Role[]

        console.log("User role", userInfo.defaultGroup?.role)

        const data = await fetchTemplateData(
            process.env.NEXT_PUBLIC_EFORM_SEARCH_TEMPLATE!,
            searchParams.name
                ? { name: searchParams.name, userRole: userRole[0] }
                : { userRole: userRole[0]._id }
        )

        const _data: DataTableType[] = []
        console.log("Data", data)
        data.forEach((element) => {
            _data.push({
                key: element._id,
                formName: element.name,
                approval: element.approver,
                validFrom: element.validFrom,
                status: element.status?.name
            })
        })

        return (
            <SearchParamProvider>
                <PageHeader path="/bu/mywork">
                    <TemplateTable data={_data} />
                </PageHeader>
            </SearchParamProvider>
        )
    }
    return null
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
