import { cookies } from "next/headers"

import {
    eProduct,
    PermissionViewEproduct,
    requestBodyEproductTree
} from "@/app/(types)/eProduct"
import ButtonOpenModal from "@/app/users/(components)/button/ButtonOpenModalProduct"
import FillterProduct from "@/app/users/(components)/filter/FillterProduct"
import ActiveTree from "@/app/users/(components)/form/ActiveTreeProduct"
import ProviderProduct from "@/app/users/(components)/provider/ProviderProduct"
import LayoutTreeView from "@/app/users/(components)/table/TreeViewProduct"
import NoPermssionPage from "@/components/noPermissionPage"
import ProviderTranfer from "@/components/provider/ProviderTranfer"
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
            fetch(process.env.EPRODUCT_TREEDATA!, {
                next: { tags: ["TreeEProduct"] },
                method: "POST",
                body: JSON.stringify({ active }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie.get("token")?.value ?? "",
                    Session: cookie.get("session")?.value ?? ""
                }
            }),
            fetch(process.env.EPRODUCT_VIEW_PERMISSION!, {
                next: { tags: ["TreeEProductViewPermssion"] },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie.get("token")?.value ?? "",
                    Session: cookie.get("session")?.value ?? ""
                }
            })
            // ViewPermissonEproduct({
            //     url: process.env.EPRODUCT_VIEW_PERMISSION!,
            //     session: cookie.get("session")?.value ?? "",
            //     token: cookie.get("token")?.value ?? ""
            // })
        ])
        const tree = await resTree.json()
        const permisson = await resPermisson.json()
        return {
            eProduct: tree,
            permissonEproduct: permisson
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
        <ProviderProduct>
            <ProviderTranfer>
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
                            ViewPermissonEproduct={
                                data?.permissonEproduct ?? {}
                            }
                        />
                    </div>
                ) : (
                    <NoPermssionPage />
                )}
            </ProviderTranfer>
        </ProviderProduct>
    )
}

export const dynamic = "force-dynamic"
export default ProductPage
