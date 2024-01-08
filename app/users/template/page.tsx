import { FilterEformTemplate } from "@/app/(service)/EformTemplate"
import { EformTemplate } from "@/app/(types)/EformTemplate"
import { RequestFilterTemplate } from "@/app/(types)/eFormTask"
import { FindPermission } from "@/app/(utilities)/ArrayUtilities"
import { authOptions } from "@/app/api/auth/authOptions"
import axios from "axios"
import delay from "delay"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers"
import { RedirectType, notFound, redirect } from "next/navigation"
import { cache } from "react"
import TemplateTable, { DataTableType } from "../(components)/templateTable"
import { SearchParamProvider } from "../(context)/provider"
import PageHeader from "../myworkbu/_components/PageHeader"
/* 
axios.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2))
    return request
}) */

const TemplatePage = async ({
    searchParams
}: {
    searchParams: {
        name: string
        creator?: string
        approved?: string
        status?: string
        major?: string
        timecreate?: string
        timeend?: string
    }
}) => {
    const { creator, approved, status, major, timecreate, timeend, name } =
        searchParams
    await delay(2000)
    const session = await getServerSession(authOptions)
    if (!session) redirect("/auth/signin", RedirectType.replace)

    const permission = session.user.userInfo.permission

    if (!FindPermission(permission, "children", "VisibleTemplateBU")) notFound()

    let data: EformTemplate[] = []
    let _data: DataTableType[] = []

    // if (timecreate || timeend || creator || approved || major || status) {
    //tìm kiếm thep bộ lọc
    const cookie = cookies()
    const bodyRequestFilter: RequestFilterTemplate = {
        name,
        creator,
        approver: approved,
        status,
        eProduct: major,
        createdDate: { from: timecreate, to: timeend }
    }
    if (!creator) {
        delete bodyRequestFilter.creator
    }
    if (!approved) {
        delete bodyRequestFilter.approver
    }
    if (!major) {
        delete bodyRequestFilter.eProduct
    }
    if (!status) {
        delete bodyRequestFilter.status
    }
    if (!timecreate && !timeend) {
        delete bodyRequestFilter.createdDate
    } else {
        if (!timecreate) {
            delete bodyRequestFilter?.createdDate?.from
        }
        if (!timeend) {
            delete bodyRequestFilter?.createdDate?.to
        }
    }
    if (!name) {
        delete bodyRequestFilter.name
    }
    console.log("bodyRquest", bodyRequestFilter)
    const res = await FilterEformTemplate({
        url: process.env.EFORM_FILTER_TEMPLATE!,
        bodyRequest: bodyRequestFilter,
        session: cookie.get("session")?.value ?? "",
        token: cookie.get("token")?.value ?? ""
    })
    data = res.data
    // } else {
    //     data = await fetchTemplatePage(
    //         process.env.EFORM_SEARCH_TEMPLATE!,
    //         searchParams.name ? { name: searchParams.name } : {}
    //     )
    // }

    data.forEach((element) => {
        _data.push({
            key: element?._id,
            formName: element?.name,
            approval: element?.approver
                ? element?.approver?.lastName +
                  " " +
                  element?.approver!.firstName
                : "",
            validFrom: element?.validFrom,
            status: element?.status?.description,
            queryCode: element?.queryCode
        })
    })

    return (
        <SearchParamProvider>
            <PageHeader path="/users/bu/template" addNewPermission={false}>
                <TemplateTable
                    readOnly={true}
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

const fetchTemplatePage = cache(async (url: string, searchInput: any) => {
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

export default TemplatePage
