import React from "react"
import LayoutAdmin from "@/app/users/administrator/(component)/LayoutAdmin"

import Loading from "@/app/users/teller/mywork/loading"
import BtnModal from "@/app/users/administrator/(component)/BtnModal"
import ActionHeaderGroups from "@/app/users/administrator/(component)/ActionHeader/HeaderTree"
import ProviderTree from "@/app/users/administrator/(component)/provider/ProviderTree"
import dynamic2 from "next/dynamic"
import ProviderTranfer from "@/app/users/administrator/(component)/provider/ProviderTransfer"
import { cookies } from "next/headers"

const TreeGroups = dynamic2(
    () => import("@/app/users/administrator/(component)/table/TreeGroups"),
    {
        loading: () => <Loading />,
        ssr: false
    }
)

const fectheGroupTree = async (): Promise<any> => {
    try {
        const cookie = cookies()

        const res = await fetch(process.env.GET_GROUP_TREE!, {
            next: { tags: ["ListGroup"] },
            method: "POST",
            body: JSON.stringify({}),
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

const Group = async () => {
    const Group = await fectheGroupTree()
    return (
        <ProviderTree>
            <ProviderTranfer>
                <LayoutAdmin
                    BtnAdd={
                        <BtnModal
                            titleModel="Thêm nhóm"
                            type="ADD_MODAL"
                            pathModel="ADMIN_GROUP"
                            rowData={{}}
                        />
                    }
                    title="Quản trị nhóm"
                    HeaderAction={<ActionHeaderGroups />}
                    Table={<TreeGroups Group={Group ?? []} />}
                />
            </ProviderTranfer>
        </ProviderTree>
    )
}
export const dynamic = "force-dynamic"
export default Group
