import { connnector } from "@/app/(types)/Connecter"
import CustomTabBu from "@/app/users/administrator/(component)/CustomTabBu"
import { CustomEproduct } from "@/app/users/administrator/(component)/TreeCustome/CustomTreeAttachBusiness"
import { cookies } from "next/headers"
import ProviderAttachBu from "../../../(component)/provider/connecter/ProviderAttachBu"
const fecth = async ({
    active,
    name
}: {
    active: boolean
    name: string
}): Promise<{ connnector: connnector[]; eProduct: CustomEproduct[] }> => {
    try {
        const body = { active }

        const cookie = cookies()
        const [resConnecter, resEproduct] = await Promise.all([
            fetch(process.env.GET_CONNECTION!, {
                next: { tags: ["ListConnecterManager"] },
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie.get("token")?.value ?? "",
                    Session: cookie.get("session")?.value ?? ""
                }
            }),
            fetch(process.env.EPRODUCT_TREEDATA_CONNECTION!, {
                next: { tags: ["TreeEProduct"] },
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie.get("token")?.value ?? "",
                    Session: cookie.get("session")?.value ?? ""
                }
            })
        ])
        const Connecter = await resConnecter.json()
        const Eproduct = await resEproduct.json()
        return { connnector: Connecter, eProduct: Eproduct }
    } catch (error: any) {
        console.log("error", error)
        throw new Error("error", error)
    }
}

const PageAttachBu = async () => {
    // const body = {
    //     active: searchParams?.active === "false" ? false : true,
    //     name: searchParams?.name ?? ""
    // }

    const { eProduct, connnector } = await fecth({ active: true, name: "" })

    return (
        <ProviderAttachBu
            Eproduct={eProduct}
            Connecter={connnector.map((item, index) => ({
                ...item,
                key: index + 1
            }))}
            Correction={[]}
        >
            <CustomTabBu />
        </ProviderAttachBu>
    )
}

export const dynamic = "force-dynamic"
export default PageAttachBu
