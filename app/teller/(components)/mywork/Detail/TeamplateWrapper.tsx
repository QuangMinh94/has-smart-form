"use client"
import { addEformTask } from "@/app/(service)/EformTemplate"
import { RequestEformTaks, taskEform } from "@/app/(types)/eFormTask"
import { block, formTemplate } from "@/app/(types)/eProduct"
import { eFormTask, myWork } from "@/app/(types)/teller/mywork"
import { choosenBlock } from "@/app/teller/(components)/context"
import { DataTranfeCustom } from "@/app/teller/(components)/mywork/Detail/HeaderUiContent"
import { DefaultParams } from "@/components/OzViewer"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import { message } from "antd"
import axios from "axios"
import delay from "delay"
import { useSession } from "next-auth/react"
import { useCookies } from "next-client-cookies"
import dynamic from "next/dynamic"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ButtonHandleEform from "../../customButton/ButtonHandleEform"
import TranferMyWork from "./TranferMyWork"
import routers from "@/router/cusTomRouter"
const OzViewer = dynamic(() => import("@/components/OzViewer"), {
    loading: () => <div style={{ color: "red" }}>Loading eform...</div>,
    ssr: false
})
export interface choosenBlockCustom extends choosenBlock {}

type Props = { mywork: myWork }
const TemlateWrapper: React.FC<Props> = ({ mywork }) => {
    const cookies = useCookies()
    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage()
    const [viewerKey, setViewerKey] = useState<number>(0)
    const [idFormTempLate, setIdFormTempLate] = useState<string[]>([])
    const {
        listRight,
        setChoosenBlock,

        setListRight,
        setDataGlobal
    } = useContextMyWorkDetail()
    const resetEForm = () => {
        setViewerKey(Math.random())
    }

    useEffect(() => {
        setDataGlobal((data) => ({ ...data, myworkDetail: mywork }))
    }, [])
    useEffect(() => {
        const cusTomerFormtemplate = (
            EformTask: eFormTask[]
        ): formTemplate[] => {
            return EformTask[0]?.formTemplate ?? []
        }
        const CustomerListRight = (
            formTemplate: formTemplate[]
        ): DataTranfeCustom[] => {
            const dataListRight: DataTranfeCustom[] = []
            formTemplate.forEach((tempalate) => {
                dataListRight.push({
                    id: tempalate?._id ?? "",
                    name: tempalate?.name ?? "",
                    checkBox: false,
                    block: tempalate?.block ?? []
                })
            })
            setListRight(dataListRight)
            return dataListRight
        }
        const GetEform = async () => {
            const formTemplate = cusTomerFormtemplate(mywork?.eformTask ?? [])
            const listRight = CustomerListRight(formTemplate)

            if (listRight.length > 0) {
                resetEForm()
                await delay(2000)
                const choosenBlock: choosenBlockCustom[] = []
                const checkDuplicateBlock = new Set()
                listRight.forEach((element) => {
                    let count = 0
                    element.block.forEach((block: block) => {
                        const idBlockCustom: string = `${block.name}${block.ozrRepository}`
                        if (!checkDuplicateBlock.has(idBlockCustom)) {
                            choosenBlock.push({
                                name: block.name,
                                location: count.toString(),
                                ozrRepository: block.ozrRepository,
                                idTemplate: element?.id
                            })
                        }
                        checkDuplicateBlock.add(idBlockCustom)
                    })
                })
                console.log("choosenBlock", choosenBlock)

                const dataInput = mywork?.eformTask?.[0]?.data?.data ?? []
                const ObjDataInput: any = dataInput.reduce(
                    (acc: any, item: any) => {
                        acc[item?.ReportDisplayName] = item?.Input
                        return acc
                    },
                    {}
                )
                console.log("Report", ObjDataInput)
                const oz = document.getElementById("OZViewer")
                if (oz) {
                    for (let i = choosenBlock.length - 1; i >= 0; i--) {
                        const block = choosenBlock[i]
                        const dataInput = JSON.stringify(
                            ObjDataInput[`${block.name}`]
                        )
                        oz.CreateReportEx(
                            DefaultParams(
                                process.env.NEXT_PUBLIC_EFORM_SERVER_APP!,
                                "/" + block.ozrRepository + "/" + block.name,
                                block.name,
                                dataInput
                            ),
                            ";"
                        )
                    }
                }
                setIdFormTempLate(listRight.map((item) => item?.id))
                setChoosenBlock({
                    choosenBlock: choosenBlock,
                    changeBlock: 0
                })
            }
        }

        if (mywork?.eformTask && mywork.eformTask.length > 0) {
            GetEform()
        }
    }, [])

    const onPreview = async () => {
        if (listRight.length > 0) {
            resetEForm()
            await delay(2000)
            const choosenBlock: choosenBlock[] = []
            const checkDuplicateBlock = new Set()
            listRight.forEach((element) => {
                let count = 0
                element.block.forEach((block: block) => {
                    const idBlockCustom: string = `${block.name}${block.ozrRepository}`

                    if (!checkDuplicateBlock.has(idBlockCustom)) {
                        choosenBlock.push({
                            name: block.name,
                            location: count.toString(),
                            ozrRepository: block.ozrRepository,
                            idTemplate: element?.id
                        })
                        checkDuplicateBlock.add(idBlockCustom)
                    }
                })
            })

            const oz = document.getElementById("OZViewer")
            for (let i = choosenBlock.length - 1; i >= 0; i--) {
                const block = choosenBlock[i]

                oz!.CreateReportEx(
                    DefaultParams(
                        process.env.NEXT_PUBLIC_EFORM_SERVER_APP!,
                        "/" + block.ozrRepository + "/" + block.name,
                        block.name
                    ),
                    ";"
                )
            }
            setIdFormTempLate(listRight.map((item) => item?.id))
            setChoosenBlock({
                choosenBlock: choosenBlock,
                changeBlock: 0
            })
        } else {
            messageApi.error("Vui lòng chọn một biểu mẫu")
        }
    }

    const onCancel = () => {
        resetEForm()
    }

    const onSubmit = async () => {
        if (idFormTempLate.length > 0) {
            HandlerActionEform("SUBMIT")
        } else {
            messageApi.error("Vui lòng chọn một biểu mẫu")
        }
    }

    const onSave = async () => {
        //HandlerSigning()
        if (idFormTempLate.length > 0) {
            HandlerActionEform("SAVE")
        } else {
            messageApi.error("Vui lòng chọn một biểu mẫu")
        }
    }

    const HandlerActionEform = async (type: "SAVE" | "SUBMIT") => {
        try {
            setLoading(true)
            const oz = document.getElementById("OZViewer")
            if (oz) {
                // if (oz.GetInformation("INPUT_CHECK_VALIDITY") == "valid") {

                const inputdatas = JSON.parse(
                    oz.GetInformation("INPUT_JSON_ALL_GROUP_BY_REPORT")
                )
                // const inputdata = JSON.parse(
                //     oz.GetInformation("INPUT_JSON_ALL")
                // )
                console.log("datagop", inputdatas)

                const body: RequestEformTaks = {
                    data: { data: inputdatas },
                    formTemplate: idFormTempLate,
                    appointmentId: `${params?.id}`,
                    documentId: "test",
                    button: type
                }
                console.log("requestbody", body)

                const res = await addEformTask({
                    bodyRequest: body,
                    token: cookies.get("token") ?? "",
                    session: cookies.get("session") ?? ""
                })
                if (res.status === 200) {
                    messageApi.success("success")
                    if (type === "SUBMIT") {
                        router.replace(routers("teller").mywork.path, {
                            scroll: true
                        })
                        router.refresh()
                    }
                }
                setLoading(false)
                // }
                // else {
                //     messageApi.error("no input data")
                // }
            }
        } catch (e: any) {
            setLoading(false)
            messageApi.error("có lỗi")
        }
    }

    const onSync = () => {
        //rebind the data
        //get number of reports
        const oz = document.getElementById("OZViewer")

        if (oz) {
            /*  const inputdatas = JSON.parse(
                oz.GetInformation("INPUT_JSON_ALL_GROUP_BY_REPORT")
            )
            console.log("Input ye", inputdatas) */
            const numOfReport: number = oz.GetInformation("REPORT_COUNT")

            //get report index
            const currentReportIndex: number = oz.GetInformation(
                "CURRENT_REPORT_INDEX"
            )

            //create the array with length of number of reports,exclude the currentReportIndex
            const numberArray: number[] = []
            for (let i = 0; i < numOfReport; i++) {
                if (i !== currentReportIndex) numberArray.push(i)
            }

            //get input json of current report and sync with other reports
            const input_data_current = oz.GetInformation("INPUT_JSON")

            const params = "connection.inputjson=" + input_data_current + ";"
            numberArray.forEach((element) => {
                oz.ReBind(element, "report", params, ";")
            })
        }
    }

    return (
        <div>
            {contextHolder}
            <DndProvider backend={HTML5Backend}>
                <TranferMyWork />
                <div className="mt-10">
                    <ButtonHandleEform
                        loading={loading}
                        onCancel={onCancel}
                        onPreview={onPreview}
                        onSave={onSave}
                        onSubmit={onSubmit}
                        onSync={onSync}
                    />
                </div>
                <OzViewer viewerKey={viewerKey} />
            </DndProvider>
        </div>
    )
}

export default TemlateWrapper
