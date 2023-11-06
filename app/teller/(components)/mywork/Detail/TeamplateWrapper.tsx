"use client"
import { addEformTask } from "@/app/(service)/addEformTasks"
import { RequestEformTaks, taskEform } from "@/app/(types)/eFormTask"
import { DefaultParams } from "@/components/OzViewer"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import { message } from "antd"
import delay from "delay"
import { useCookies } from "next-client-cookies"
import dynamic from "next/dynamic"
import { useParams } from "next/navigation"
import React, { useState, useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ButtonHandleEform from "../../customButton/ButtonHandleEform"
import TranferMyWork from "./TranferMyWork"
import { block } from "@/app/(types)/eProduct"
import { choosenBlock } from "@/app/teller/(components)/context"
import { myWork, eFormTask } from "@/app/(types)/teller/mywork"
import { formTemplate } from "@/app/(types)/eProduct"
import { DataTranfeCustom } from "@/app/teller/(components)/mywork/Detail/HeaderUiContent"
const OzViewer = dynamic(() => import("@/components/OzViewer"), {
    loading: () => <div style={{ color: "red" }}>Loading eform...</div>,
    ssr: false
})
export interface choosenBlockcustom extends choosenBlock {
    Input: any
}

type Props = { mywork: myWork }
const TemlateWrapper: React.FC<Props> = ({ mywork }) => {
    const cookies = useCookies()
    const params = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage()
    const [viewerKey, setViewerKey] = useState<number>(0)
    const { listRight, setChoosenBlock, choosenBlock, setListRight } =
        useContextMyWorkDetail()
    const resetEForm = () => {
        setViewerKey(Math.random())
    }

    useEffect(() => {
        const cusTomerFormtemplate = (
            EformTask: eFormTask[]
        ): formTemplate[] => {
            const check: any = {}
            const formTemplate: formTemplate[] = []
            EformTask.forEach((task) => {
                if (!check[`${task?.formTemplate?._id}`]) {
                    formTemplate.push(task.formTemplate)
                }
                check[`${task?.formTemplate?._id}`] = true
            })
            return formTemplate
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
                    block: tempalate.block ?? []
                })
            })
            setListRight(dataListRight)
            return dataListRight
        }
        const GetEform = async () => {
            const formTemplate = cusTomerFormtemplate(mywork.eformTask)
            const listRight = CustomerListRight(formTemplate)
            const eformTaskOBJ: any = {}

            mywork.eformTask.forEach((eformTask) => {
                eformTaskOBJ[
                    `${eformTask?.data?.ReportDisplayName}${eformTask.formTemplate._id}`
                ] = eformTask.data
            })

            if (listRight.length > 0) {
                resetEForm()
                await delay(2000)
                const choosenBlock: choosenBlockcustom[] = []

                listRight.forEach((element) => {
                    let count = 0
                    element.block.forEach((block: block) => {
                        choosenBlock.push({
                            name: block.name,
                            location: count.toString(),
                            ozrRepository: block.ozrRepository,
                            idTemplate: element?.id,
                            Input: JSON.stringify(
                                eformTaskOBJ[`${block?.name}${element?.id}`]
                                    ?.Input
                            )
                        })
                    })
                })
                console.log("choosenBlock", choosenBlock)
                const oz = document.getElementById("OZViewer")
                for (let i = choosenBlock.length - 1; i >= 0; i--) {
                    const block = choosenBlock[i]
                    oz!.CreateReportEx(
                        DefaultParamsInput(
                            process.env.NEXT_PUBLIC_EFORM_SERVER_APP!,
                            "/" + block.ozrRepository + "/" + block.name,
                            block.name,
                            block.Input
                        ),
                        ";"
                    )
                }
                setChoosenBlock({
                    choosenBlock: choosenBlock,
                    changeBlock: 0
                })
            }
        }
        GetEform()
    }, [])

    const onPreview = async () => {
        if (listRight.length > 0) {
            resetEForm()
            await delay(2000)
            const choosenBlock: choosenBlock[] = []

            listRight.forEach((element) => {
                let count = 0
                element.block.forEach((block: block) => {
                    choosenBlock.push({
                        name: block.name,
                        location: count.toString(),
                        ozrRepository: block.ozrRepository,
                        idTemplate: element?.id
                    })
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
            setChoosenBlock({
                choosenBlock: choosenBlock,
                changeBlock: 0
            })
        } else {
            messageApi.error("Please choose at least 1 block")
        }
    }

    const onCancel = () => {
        resetEForm()
    }

    const onSubmit = async () => {
        setLoading(true)
        HandlerActionEform("SUBMIT")
    }

    const onSave = async () => {
        setLoading(true)
        HandlerActionEform("SAVE")
    }
    const oz = document.getElementById("OZViewer")
    console.log("oz", oz)
    const HandlerActionEform = async (type: "SAVE" | "SUBMIT") => {
        try {
            const oz = document.getElementById("OZViewer")
            if (oz) {
                // if (oz.GetInformation("INPUT_CHECK_VALIDITY") == "valid") {

                var inputdatas = JSON.parse(
                    oz.GetInformation("INPUT_JSON_ALL_GROUP_BY_REPORT")
                )

                console.log("My data where", inputdatas)
                console.log("chossenBlock", choosenBlock?.choosenBlock)
                const eformTasks: taskEform[] = []
                inputdatas.forEach((inputdata: any, index: number) => {
                    eformTasks.push({
                        data: inputdata,
                        formTemplate:
                            choosenBlock?.choosenBlock?.[index]?.idTemplate ??
                            "",
                        documentId: "test"
                    })
                })
                const body: RequestEformTaks = {
                    eformTasks: eformTasks,
                    appointment: `${params?.id}`,
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
export const DefaultParamsInput = (
    url: string,
    reportName: string,
    displayname: string,
    inputJson: string = "",
    index: string = "0"
) => {
    return `connection.servlet=${url};
connection.reportname=${reportName};
global.concatthumbnail=true;
connection.refreshperiod=1;
viewer.createreport_doc_index=${index};
    global.concatpreview=false;
    viewer.showtab=true;
    connection.displayname=${displayname};
    connection.inputjson=${inputJson};
    viewer.thumbnailsection_showclosebutton=true;
    information.debug=true;
    eform.signpad_zoom=50;
    eform.signpad_type=dialog;
    viewer.reportchangecommand=true;`
}
export default TemlateWrapper
