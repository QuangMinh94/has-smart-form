import LayoutAdmin from "@/app/users/administrator/(component)/LayoutAdmin"

import ActionHeaderRole from "@/app/users/administrator/(component)/ActionHeader/Role"
import BtnModal from "@/app/users/administrator/(component)/BtnModal"
import Loading from "@/app/users/teller/mywork/loading"
import dynamic2 from "next/dynamic"

import { cookies } from "next/headers"

const TableUser = dynamic2(
    () => import("@/app/users/administrator/(component)/table/tableUser"),
    {
        loading: () => <Loading />,
        ssr: false
    }
)

const fectheGroup = async ({
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
            next: { tags: ["ListRole"] },
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
    const Users = await fectheGroup({
        Active: searchParams.active ?? true,
        SearchName: searchParams.searchname ? searchParams.searchname : ""
    })

    return (
        <LayoutAdmin
            BtnAdd={
                <BtnModal
                    titleModel="Thêm nhóm quyền"
                    type="ADD_MODAL"
                    pathModel="ADMIN_ROLE"
                    rowData={{}}
                />
            }
            title="Quản trị nhóm quyền"
            HeaderAction={<ActionHeaderRole />}
            Table={<TableUser Users={Users ?? []} />}
        />
    )
}
export const dynamic = "force-dynamic"
export default User
