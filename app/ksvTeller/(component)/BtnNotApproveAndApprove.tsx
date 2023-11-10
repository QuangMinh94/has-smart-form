"use client"
import { veriFyEformTask } from "@/app/(service)/EformTemplate"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import UseGetInfoUser from "@/components/cusTomHook/useGetInfoUser"
import routers from "@/router/cusTomRouter"
import { Button, Input, Popconfirm, message, Modal } from "antd"
import axios from "axios"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import React, { memo, useState } from "react"
const { TextArea } = Input
const confirm = (cbAsync: () => Promise<void>) => {
    return cbAsync()
}
type Props = {
    type: "approve" | "notApprove"
}
const BtnNotApproveAndApprove: React.FC<Props> = ({ type }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false)
    const { token, session } = useCustomCookies()
    const { InFoUser } = UseGetInfoUser()
    const params = useParams()
    const Router = useRouter()
    const searchParams = useSearchParams()
    const [valueText, setValueText] = useState<string>("")
    const [messageApi, contextHolder] = message.useMessage()
    const { dataGlobal, choosenBlock } = useContextMyWorkDetail()

    const HandlerSigning = async () => {
        setLoadingConfirm(true)
        const m = new Date()
        const dateString =
            m.getUTCFullYear() +
            "" +
            (m.getUTCMonth() + 1) +
            "" +
            m.getUTCDate() +
            "" +
            m.getUTCHours() +
            "" +
            m.getUTCMinutes() +
            "" +
            m.getUTCSeconds() +
            "" +
            m.getMilliseconds()
        const oz = document.getElementById("OZViewer")

        if (oz) {
            const inputdatas = JSON.parse(
                oz.GetInformation("INPUT_JSON_ALL_GROUP_BY_REPORT")
            )
            //console.log("Inputdata", inputdatas)

            //map print data
            const _printData: any[] = []
            inputdatas.forEach((inputdata: any, index: number) => {
                _printData.push({
                    templateName:
                        choosenBlock?.choosenBlock?.[index].ozrRepository +
                        "/" +
                        choosenBlock?.choosenBlock?.[index].name,
                    templateArray: inputdata.Input
                })
            })

            if (_printData.length !== 0) {
                //preparing data to export to pdf
                const requestBody = {
                    ozrNameArray: JSON.stringify(_printData),
                    exportFormat: "pdf",
                    exportFileName: dateString + ".pdf"
                }

                try {
                    //calling axios to export
                    const response = await axios.post(
                        process.env.NEXT_PUBLIC_EXPORT_SERVICE!,
                        requestBody,
                        {
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded"
                            }
                        }
                    )
                    //return exportFileName if success, return empty string if failed
                    const responseData: string = response.data.toString().trim()
                    if (responseData !== "") {
                        //prepareing data
                        const signRequest = {
                            signerEmail: InFoUser?.mail,
                            signerName: InFoUser?.userName,
                            signLocation: "~3",
                            eFormTaskId:
                                dataGlobal.myworkDetail.eformTask?.[0]?._id,
                            filePath:
                                process.env.NEXT_PUBLIC_EXPORT_FOLDER! +
                                "/" +
                                responseData
                        }
                        console.log("Sign request", signRequest)
                        //call docusign service
                        const docuResponse = await axios.post(
                            process.env.NEXT_PUBLIC_EFORM_SIGNING!,
                            signRequest,
                            {
                                headers: {
                                    Authorization: "Bearer " + token,
                                    Session: session
                                }
                            }
                        )

                        console.log("Docu response", docuResponse.data)
                        await HandlerSubmit()
                    } else {
                        messageApi.error("Ký thất bại.Xin hãy thử lại sau")
                    }
                } catch (error: any) {
                    messageApi.error("có lỗi")
                    console.log("OH SHIT ERROR", error.response)
                }
            } else {
                messageApi.error("Không có document để phê duyệt")
            }
        }
        setLoadingConfirm(false)
    }
    const HandlerSubmit = async () => {
        try {
            const data = dataGlobal.myworkDetail.eformTask?.[0].data
            const res = await veriFyEformTask({
                bodyRequest: {
                    id: `${params?.id}`,
                    rejectReason: valueText,
                    button: type === "approve" ? "SUBMIT" : "REJECT",
                    citizenId: searchParams.get("CCCD") ?? "",
                    data: data
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
                Router.refresh()
            }
        } catch (e: any) {
            messageApi.error("có lỗi vui lòng thử lại sau ")
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const handleOpen = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <p id="disableInput" />
            {contextHolder}

            <Button
                onClick={handleOpen}
                className="min-w-[100px]"
                danger={type === "notApprove"}
                type="primary"
            >
                {type === "approve" ? "Phê duyệt" : "Từ chối"}
            </Button>
            <Modal
                title={type === "approve" ? "Xác nhận" : "Lý do từ chối"}
                open={isModalOpen}
                onCancel={handleCancel}
                confirmLoading={loadingConfirm}
                destroyOnClose={true}
                onOk={() => confirm(HandlerSigning)}
                okText="Đồng ý"
                cancelText="Hủy"
            >
                {type === "notApprove" && (
                    <TextArea
                        style={{ minWidth: "20vw", height: "10vw" }}
                        value={valueText}
                        onChange={(e) => setValueText(e.target.value)}
                    />
                )}
            </Modal>
        </>
    )
}

export default memo(BtnNotApproveAndApprove)
