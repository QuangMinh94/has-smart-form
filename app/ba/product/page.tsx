import { cookies } from "next/headers"
import { eProduct } from "@/app/(types)/eProduct"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/authOptions"
import FillterProduct from "../(component)/fillter/FillterProduct"
import LayoutTreeView from "../(component)/table/TreeViewProduct"
import { requestBodyEproductTree } from "@/app/(types)/eProduct"
import ButtonOpenModal from "@/app/ba/(component)/ButtonOpenModal"
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

const fetchApi = async (): Promise<eProduct[]> => {
    const cookie = cookies()
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //     return []
    // }
    // const idRole = session?.user?.userInfo?.defaultGroup.role?.[0]?._id

    try {
        const res = await GetProductTree({
            bodyRequest: {},
            session: cookie.get("session")?.value ?? "",
            token: cookie.get("token")?.value ?? ""
        })
        return res.data
    } catch (e: any) {
        throw new Error("error fetching", e)
    }
}
const ProductPage = async () => {
    const tree = await fetchApi()
    console.log("tree", tree)
    return (
        <div>
            <div className="mb-[20px] flex items-center">
                <div className="flex-1">
                    <div className="w-[30%]">
                        <FillterProduct />
                    </div>
                </div>
                <div>
                    <ButtonOpenModal
                        type="ADD_MODAL"
                        titleModal="Tạo sản phẩm"
                        typeRow="P"
                        clickBtn={true}
                    />
                </div>
            </div>
            <LayoutTreeView TreeEProduct={tree} />
        </div>
    )
}

export const dynamic = "force-dynamic"
export default ProductPage
