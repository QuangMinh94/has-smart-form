import {
    RevalidateListConnecterManager,
    RevalidateListDepartment,
    RevalidateListUser
} from "@/app/(actions)/action"
import { updateUser } from "@/app/(service)/User"
import { addOrUpdateConnection } from "@/app/(service)/connection"
import { updateDepartment } from "@/app/(service)/department"
import { addAndUpdateGroup } from "@/app/(service)/group"
import { pathModel } from "@/app/users/administrator/(component)/BtnModal"
import { useContextAdmin } from "@/components/cusTomHook/useContext"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { Button } from "antd"
import { useEnvContext } from "next-runtime-env"
import React, { memo, useState } from "react"
type Props = {
    pathModel: pathModel
    data: { idUpdate: string; active: boolean }
    CancelModal: () => void
}
const ActiveForm: React.FC<Props> = ({ pathModel, data, CancelModal }) => {
    const {
        NEXT_PUBLIC_UPDATE_USER,
        NEXT_PUBLIC_UPDATE_DEPARTMENT,
        NEXT_PUBLIC_UPDATE_GROUP,
        NEXT_PUBLIC_UPDATE_CONNECTION
    } = useEnvContext()
    const [loading, setLoading] = useState<boolean>(false)
    const { messageApi } = useContextAdmin()
    const { token, session } = useCustomCookies()
    const updateActive = {
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
                    CancelModal()
                }
            } catch (e) {
                messageApi("error", "xảy ra lỗi vui lòng thử lại sau")
            }
        },
        ADMIN_DEPARTMENT: async () => {
            try {
                const res = await updateDepartment({
                    url: NEXT_PUBLIC_UPDATE_DEPARTMENT!,
                    bodyRequest: {
                        id: data.idUpdate ?? "",
                        active: !data.active
                    },
                    token,
                    session
                })
                if (res.status === 200) {
                    await RevalidateListDepartment()
                    messageApi(
                        "success",
                        ` ${
                            data.active
                                ? "vô hiệu hóa chi nhánh thành công"
                                : "kích hoạt chi nhánh thành công"
                        }`
                    )
                    CancelModal()
                }
            } catch (e: any) {
                const err: any = e.response.data

                if (err?.code === 500) {
                    messageApi("error", `${err.message}`)
                } else {
                    messageApi("error", "xảy ra lỗi vui lòng thử lại sau")
                }
            }
        },
        ADMIN_GROUP: async () => {
            try {
                const res = await addAndUpdateGroup({
                    url: NEXT_PUBLIC_UPDATE_GROUP!,
                    bodyRequest: {
                        id: data.idUpdate ?? "",
                        active: !data.active
                    },
                    token,
                    session
                })
                if (res.status === 200) {
                    await RevalidateListDepartment()
                    messageApi(
                        "success",
                        ` ${
                            data.active
                                ? "vô hiệu hóa nhóm thành công"
                                : "kích hoạt nhóm thành công"
                        }`
                    )
                    CancelModal()
                }
            } catch (e: any) {
                const err: any = e.response.data

                if (err?.code === 500) {
                    messageApi("error", `${err.message}`)
                } else {
                    messageApi("error", "xảy ra lỗi vui lòng thử lại sau")
                }
            }
        },
        ADMIN_ROLE: () => {},
        ADMIN_CONNECTER_MANAGER: async () => {
            try {
                const res = await addOrUpdateConnection({
                    url: NEXT_PUBLIC_UPDATE_CONNECTION!,
                    bodyRequest: {
                        id: data.idUpdate ?? "",
                        active: !data.active
                    },
                    token,
                    session
                })
                if (res.status === 200) {
                    await RevalidateListConnecterManager()
                    messageApi(
                        "success",
                        ` ${
                            data.active
                                ? "vô hiệu thành công"
                                : "kích hoạt thành công"
                        }`
                    )
                    CancelModal()
                }
            } catch (e: any) {
                const err: any = e.response.data

                if (err?.code === 500) {
                    messageApi("error", `${err.message}`)
                } else {
                    messageApi("error", "xảy ra lỗi vui lòng thử lại sau")
                }
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
            <Button
                onClick={async () => {
                    setLoading(true)
                    await updateActive[pathModel]()
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
