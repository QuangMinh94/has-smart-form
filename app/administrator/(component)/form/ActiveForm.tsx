import React, { memo } from "react"
import { pathModel } from "@/app/administrator/(component)/BtnModal"
import { Button } from "antd"
import { updateUser } from "@/app/(service)/User"
import { useContextAdmin } from "@/components/cusTomHook/useContext"
import { useEnvContext } from "next-runtime-env"
import { RevalidateListUser } from "@/app/(actions)/action"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
type Props = {
    pathModel: pathModel
    data: { idUpdate: string; active: boolean }
    CancelModal: () => void
}
const ActiveForm: React.FC<Props> = ({ pathModel, data, CancelModal }) => {
    const { NEXT_PUBLIC_UPDATE_USER } = useEnvContext()
    const { messageApi } = useContextAdmin()
    const { token, session } = useCustomCookies()
    const updateActive: any = {
        ADMIN_USER: async () => {
            try {
                const res = await updateUser({
                    url: NEXT_PUBLIC_UPDATE_USER!,
                    bodyRequest: {
                        id: data.idUpdate ?? "",
                        active: !data.active
                    },
                    token,
                    session
                })
                if (res.status === 200) {
                    await RevalidateListUser()
                    messageApi(
                        "success",
                        ` ${
                            data.active
                                ? "hủy tài khoản thành công"
                                : "kích hoạt tài khoản thành công"
                        }`
                    )
                }
            } catch (e) {
                messageApi("error", "xảy ra lỗi vui lòng thử lại sau")
            }
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
            <Button onClick={updateActive[pathModel]} type="primary">
                Xác nhận
            </Button>
        </div>
    )
}
export default memo(ActiveForm)
