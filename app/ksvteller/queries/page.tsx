import { Appointment } from "@/app/(types)/Apointment"
import { Department } from "@/app/(types)/Department"
import { Users } from "@/app/(types)/Users"
import { channel } from "@/app/(types)/channel"
import { eProduct } from "@/app/(types)/eProduct"
import { status } from "@/app/(types)/status"
import FilterOption from "@/components/FilterOptions"
import ResultTable, { ResultTableType } from "@/components/ResultTable"
import QueriesTemplate from "@/components/context/queriesTemplate"
import axios from "axios"
import { cookies } from "next/headers"
import { cache } from "react"

axios.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2))
    return request
})

type ParamObject = {
    label: string
    value: string
    key: string
}

const KSVQueriesPage = async ({
    searchParams
}: {
    searchParams: {
        citizenId: string
        appointmentCode: string
        name: string
        channel: string
        fromDate: number | undefined
        toDate: number | undefined
        status: string
        executor: string
        eProduct: string
    }
}) => {
    let searchInput = {}
    if (searchParams) {
        for (var key in searchParams) {
            try {
                if (
                    key === "channel" ||
                    key === "status" ||
                    key === "executor" ||
                    key === "eProduct" ||
                    key === "officeBranch"
                ) {
                    const decodeBase64 = decodeURIComponent(
                        atob(searchParams[key as keyof typeof searchInput])
                    )
                    const paramObject: ParamObject[] = JSON.parse(decodeBase64)
                    const idList: string[] = []
                    paramObject.forEach((e) => {
                        idList.push(e.key)
                    })
                    if (idList.length > 0) {
                        Object.assign(searchInput, {
                            [key]: idList
                        })
                    }
                } else if (key === "from" || key === "to") {
                    const dateValue = new Date(
                        parseInt(
                            searchParams[key as keyof typeof searchInput]
                        ) * 1000
                    )
                    Object.assign(searchInput, {
                        [key]: dateValue
                    })
                } else {
                    Object.assign(searchInput, {
                        [key]: searchParams[key as keyof typeof searchInput]
                    })
                }
            } catch (error: any) {
                console.log("Error", error)
            }
        }
    }

    let createDate = {}
    let isFromExist: boolean = false
    let isToExist: boolean = false
    //add from and to key to createDate
    for (const key in searchInput) {
        if (key === "from" || key === "to") {
            if (key === "from") {
                isFromExist = true
            }
            if (key === "to") {
                isToExist = true
            }
            Object.assign(createDate, {
                [key]: searchInput[key as keyof typeof searchInput]
            })
        }
    }

    if (isFromExist && isToExist) {
        //check if createDate is empty or not
        if (Object.keys(createDate).length !== 0) {
            //not empty, assign to searchInput
            Object.assign(searchInput, { createDate: createDate })
        }
    }

    //delete from and to from searchInput
    for (const key in searchInput) {
        if (key === "from" || key === "to") {
            delete searchInput[key as keyof typeof searchInput]
        }
    }

    //console.log("SEARCH INPUT", searchInput)

    const _dataTable: ResultTableType[] = []

    const filterData = await fetchFilterAppointment(
        process.env.FILTER_APPOINTMENT!,
        searchInput
    )

    filterData?.forEach((element) => {
        _dataTable.push({
            key: element._id,
            departmentCode: (element.officeBranch as Department)
                ? (element.officeBranch as Department).code
                : "",
            appointmentCode: element.appointmentCode,
            citizenId: element.citizenId,
            name: element.name,
            eProduct: element.eProduct as eProduct,
            channel: element.channel as channel,
            createdDate: element.createDate,
            status: element.status as status,
            executor: element.executor as Users,
            officeBranch: (element.officeBranch as Department)
                ? (element.officeBranch as Department).name
                : "",
            queryCode: element.queryCode
        })
    })

    return (
        <QueriesTemplate>
            <FilterOption route="/teller/queries" />
            <ResultTable data={_dataTable} route="/teller/queries/" />
        </QueriesTemplate>
    )
}

const fetchFilterAppointment = cache(async (url: string, searchInput: any) => {
    const cookie = cookies()
    const res = await axios.post(url, searchInput, {
        headers: {
            Authorization: "Bearer " + cookie.get("token")?.value,
            Session: cookie.get("session")?.value
        }
    })
    const data = res.data as Appointment[]
    return data
})

export const dynamic = "force-dynamic"

export default KSVQueriesPage
