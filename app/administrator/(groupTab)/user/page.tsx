import React from "react"
import LayoutAdmin from "@/app/administrator/(component)/LayoutAdmin"

import Loading from "@/app/teller/mywork/loading"
import BtnModal from "@/app/administrator/(component)/BtnModal"
import ActionHeaderUser from "@/app/administrator/(component)/ActionHeader/User"
import dynamic2 from "next/dynamic"

import { cookies } from "next/headers"

import ProviderUser from "../../(component)/provider/providerUser"
const TableUser = dynamic2(
    () => import("@/app/administrator/(component)/table/tableUser"),
    {
        loading: () => <Loading />,
        ssr: false
    }
)

const fectheUser = async ({
    Active,
    SearchName
}: {
    Active: boolean
    SearchName: string
}): Promise<any> => {
    try {
        const body = { active: Active, name: SearchName }

        const cookie = cookies()
        console.log("Session", cookie.get("session")?.value ?? "")
        console.log("Authorization", cookie.get("token")?.value ?? "")
        const res = await fetch(process.env.SEARCH_USER!, {
            next: { tags: ["ListUser"] },
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + cookie.get("token")?.value ?? "",
                Session: cookie.get("session")?.value ?? ""
            }
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log("error", error)
    }
}

const User = async ({
    params,
    searchParams
}: {
    params: {}
    searchParams: { active: boolean; searchname: "" }
}) => {
    console.log("params", searchParams)
    const Users = await fectheUser({
        Active: searchParams.active ?? true,
        SearchName: searchParams.searchname ? searchParams.searchname : ""
    })

    return (
        <ProviderUser>
            <LayoutAdmin
                BtnAdd={
                    <BtnModal
                        titleModel="Thêm tài khoản"
                        type="ADD_MODAL"
                        pathModel="ADMIN_USER"
                        rowData={{}}
                    />
                }
                title="Quản trị người dùng"
                HeaderAction={<ActionHeaderUser />}
                Table={<TableUser Users={Users ?? []} />}
            />
        </ProviderUser>
    )
}
export const dynamic = "force-dynamic"
export default User
