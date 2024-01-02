import { connnector } from "@/app/(types)/Connecter"
import ActionHeaderManager from "@/app/users/administrator/(component)/ActionHeader/connecter/manager"
import LayoutAdmin from "@/app/users/administrator/(component)/LayoutAdmin"
import ProviderManager from "@/app/users/administrator/(component)/provider/connecter/ProviderManager"
import TableAttachBusiness from "@/app/users/administrator/(component)/table/connecter/tableManager"
import { cookies } from "next/headers"

const fectheConnecterManager = async ({
    active,
    name
}: {
    active: boolean
    name: string
}): Promise<connnector[]> => {
    try {
        const body = { active: true }
        console.log("body", body)

        const cookie = cookies()
        const res = await fetch(process.env.GET_CONNECTION!, {
            next: { tags: ["ListConnecterManager"] },
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
    } catch (error: any) {
        console.log("error", error)
        throw new Error("error", error)
    }
}
const PageManager = async () => {
    // const body = {
    //     active: searchParams?.active === "false" ? false : true,
    //     name: searchParams?.name ?? ""
    // }

    const data = await fectheConnecterManager({ active: true, name: "" })

    return (
        <ProviderManager>
            <LayoutAdmin
                title="Quản lý kết nối"
                HeaderAction={<ActionHeaderManager />}
                Table={
                    <TableAttachBusiness
                        connnector={
                            data.map((item, index) => ({
                                ...item,
                                key: index + 1
                            })) ?? []
                        }
                    />
                }
            />
        </ProviderManager>
    )
}
export default PageManager
