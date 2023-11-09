"use client"
import { veriFyEformTask } from "@/app/(service)/EformTemplate"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import routers from "@/router/cusTomRouter"
import { Button, Input, Popconfirm, message } from "antd"
import { useParams, useRouter } from "next/navigation"
import React, { useState } from "react"
const { TextArea } = Input
const confirm = (cbAsync: () => Promise<void>) => {
    return cbAsync()
}
const cancel = (setValueText: React.Dispatch<React.SetStateAction<string>>) => {
    // message.error("Click on No")
    setValueText("")
}

type Props = {
    type: "approve" | "notApprove"
}
const BtnNotApproveAndApprove: React.FC<Props> = ({ type }) => {
    const { token, session } = useCustomCookies()
    const params = useParams()
    const Router = useRouter()
    const [valueText, setValueText] = useState<string>("")
    const [messageApi, contextHolder] = message.useMessage()
    const HandlerSubmit = async () => {
        try {
            const res = await veriFyEformTask({
                bodyRequest: {
                    id: `${params?.id}`,
                    rejectReason: valueText,
                    button: type === "approve" ? "SUBMIT" : "REJECT"
                },
                token: token,
                session: session
            })

            if (res.status === 200) {
                messageApi.success(
                    type === "approve"
                        ? "Phê duyệt thành công "
                        : "Từ chối thành công"
                )
                Router.replace(routers("ksvteller").mywork.path, {
                    scroll: true
                })
            }
        } catch (e: any) {
            messageApi.error("có lỗi vui lòng thử lại sau ")
        }
    }
    return (
        <>
            {contextHolder}
            <Popconfirm
                destroyTooltipOnHide={true}
                title={type === "approve" ? "Xác nhận" : "Lý do từ chối"}
                placement="left"
                description={
                    type === "approve" ? undefined : (
                        <TextArea
                            value={valueText}
                            onChange={(e) => setValueText(e.target.value)}
                        />
                    )
                }
                onConfirm={() => confirm(HandlerSubmit)}
                onCancel={() => cancel(setValueText)}
                okText="Đồng ý"
                cancelText="Hủy bỏ"
            >
                <Button
                    className="min-w-[100px]"
                    danger={type === "notApprove"}
                    type="primary"
                >
                    {type === "approve" ? "Phê duyệt" : "Từ chối"}
                </Button>
            </Popconfirm>
        </>
    )
}

export default BtnNotApproveAndApprove
