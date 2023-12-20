import { cookies } from "next/headers"

import { eProduct, PermissionViewEproduct } from "@/app/(types)/eProduct"
import NoPermssionPage from "@/components/noPermissionPage"
import { ViewPermissonEproduct } from "@/app/(service)/eProduct"
import FillterProduct from "../(component)/fillter/FillterProduct"
import LayoutTreeView from "../(component)/table/TreeViewProduct"
import { requestBodyEproductTree } from "@/app/(types)/eProduct"
import ButtonOpenModal from "@/app/users/ba/(component)/ButtonOpenModal"
import ActiveTree from "../(component)/ActiveTree"
import axios from "axios"

const GetProductTree = async (pram: {
    bodyRequest: requestBodyEproductTree
    token: string
    session: string
}) => {
    const { bodyRequest, token, session } = pram
    const res = await axios.post(process.env.EPRODUCT_TREEDATA!, bodyRequest, {
        headers: {
            Authorization: "Bearer " + token,
            Session: session
        }
    })
    return res
}

const fetchApi = async ({
    active
}: {
    active: boolean
}): Promise<{
    eProduct: eProduct[]
    permissonEproduct: PermissionViewEproduct
}> => {
    const cookie = cookies()

    try {
        const [resTree, resPermisson] = await Promise.all([
            await GetProductTree({
                bodyRequest: { active },
                session: cookie.get("session")?.value ?? "",
                token: cookie.get("token")?.value ?? ""
            }),
            await ViewPermissonEproduct({
                url: process.env.EPRODUCT_VIEW_PERMISSION!,
                session: cookie.get("session")?.value ?? "",
                token: cookie.get("token")?.value ?? ""
            })
        ])
        return {
            eProduct: resTree.data,
            permissonEproduct: resPermisson.data
        }
    } catch (e: any) {
        throw new Error("error fetching", e)
    }
}
const ProductPage = async ({
    searchParams
}: {
    searchParams: { active: string }
}) => {
    const data = await fetchApi({
        active: searchParams?.active === "false" ? false : true
    })

    return (
        <>
            {data?.permissonEproduct?.generalRule?.visibleTreeview &&
            data.permissonEproduct.generalRule.visibleView ? (
                <div>
                    <div className="mb-[20px] flex items-center">
                        <div className="flex-1">
                            <div className="w-[30%]">
                                <FillterProduct />
                            </div>
                        </div>
                        <div className="mr-[20px]">
                            <ActiveTree />
                        </div>
                        {data?.permissonEproduct?.generalRule
                            ?.visibleAddProduct && (
                            <div>
                                <ButtonOpenModal
                                    type="ADD_MODAL"
                                    titleModal="Tạo sản phẩm"
                                    typeRow="P"
                                    clickBtn={true}
                                />
                            </div>
                        )}
                    </div>
                    <LayoutTreeView
                        TreeEProduct={data?.eProduct ?? []}
                        ViewPermissonEproduct={data?.permissonEproduct ?? {}}
                    />
                </div>
            ) : (
                <NoPermssionPage />
            )}
        </>
    )
}

export const dynamic = "force-dynamic"
export default ProductPage
