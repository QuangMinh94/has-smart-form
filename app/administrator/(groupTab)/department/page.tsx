import React from "react"
import LayoutAdmin from "@/app/administrator/(component)/LayoutAdmin"

import Loading from "@/app/teller/mywork/loading"
import BtnModal from "@/app/administrator/(component)/BtnModal"
import ActionHeaderDepartment from "@/app/administrator/(component)/ActionHeader/department"
import ProviderTree from "@/app/administrator/(component)/provider/ProviderTree"
import dynamic2 from "next/dynamic"
import ProviderTranfer from "@/app/administrator/(component)/provider/ProviderTransfer"
import { cookies } from "next/headers"

const TreeDepartMent = dynamic2(
    () => import("@/app/administrator/(component)/table/treeDepartMent"),
    {
        loading: () => <Loading />,
        ssr: false
    }
)

const fectheDepartmentTree = async ({
    Active
}: {
    Active: boolean
}): Promise<any> => {
    try {
        const body = { active: Active }

        const cookie = cookies()
        console.log("Session", cookie.get("session")?.value ?? "")
        console.log("Authorization", cookie.get("token")?.value ?? "")
        const res = await fetch(process.env.GET_DEPARTMENT_TREE!, {
            next: { tags: ["ListDepartment"] },
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
    const DepartmentTree = await fectheDepartmentTree({
        Active: searchParams.active ?? true
    })

    return (
        <ProviderTree>
            <ProviderTranfer>
                <LayoutAdmin
                    BtnAdd={
                        <BtnModal
                            titleModel="Thêm đơn vị"
                            type="ADD_MODAL"
                            pathModel="ADMIN_DEPARTMENT"
                            rowData={{}}
                        />
                    }
                    title="Quản trị đơn vị"
                    HeaderAction={<ActionHeaderDepartment />}
                    Table={<TreeDepartMent Department={DepartmentTree ?? []} />}
                />
            </ProviderTranfer>
        </ProviderTree>
    )
}
export const dynamic = "force-dynamic"
export default User
