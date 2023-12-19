import React, { memo, useState } from "react"
import { Button } from "antd"
import { useContextAdmin } from "@/components/cusTomHook/useContext"
import { useEnvContext } from "next-runtime-env"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { eProduct, requestBodyUpdateEproduct } from "@/app/(types)/eProduct"
import { UpdateEproduct } from "@/app/(service)/eProduct"
import { useContextBa } from "@/components/cusTomHook/useContext"
type Props = {
    data: { idUpdate: string; active: boolean }
    CancelModal: () => void
}
const ActiveForm: React.FC<Props> = ({ data, CancelModal }) => {
    const { NEXT_PUBLIC_UPDATE_EPRODUCT } = useEnvContext()
    const [loading, setLoading] = useState<boolean>(false)
    const { messageApi, setDataGlobal } = useContextBa()
    const { token, session } = useCustomCookies()
    const UpdateproductFC = async (body: requestBodyUpdateEproduct) => {
        try {
            const res = await UpdateEproduct({
                url: NEXT_PUBLIC_UPDATE_EPRODUCT!,
                bodyRequest: body,
                token,
                session
            })
            if (res.status === 200) {
                const resEproduct: eProduct = res.data
                messageApi("success", "Cập nhật sản  phẩm thành công")
                CancelModal()
                setDataGlobal((data) => {
                    const eProducts = [...data.eProducts]
                    function updateEProduct(eProduct: eProduct[]) {
                        eProduct.forEach((item, index) => {
                            if (item._id === body.id) {
                                eProduct[index] = {
                                    ...item,
                                    ...resEproduct
                                }
                                return
                            }
                            if (item?.children && item?.children?.length > 0) {
                                updateEProduct(item?.children ?? [])
                            }
                        })
                    }
                    updateEProduct(eProducts)
                    return {
                        ...data,
                        eProducts: eProducts
                    }
                })
            }
        } catch (err) {
            messageApi("error", "có lỗi")
        }
    }
    return (
        <div className="flex py-[10px] justify-end ">
            <Button
                onClick={CancelModal}
                style={{ marginRight: "15px" }}
                type="primary"
                danger
            >
                Hủy
            </Button>
            <Button
                onClick={async () => {
                    setLoading(true)
                    await UpdateproductFC({
                        id: data.idUpdate,
                        active: !data.active
                    })
                    setLoading(false)
                }}
                type="primary"
                loading={loading}
            >
                Xác nhận
            </Button>
        </div>
    )
}
export default memo(ActiveForm)
