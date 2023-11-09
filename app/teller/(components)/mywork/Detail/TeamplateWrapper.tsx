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
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ButtonHandleEform from "../../customButton/ButtonHandleEform"
import TranferMyWork from "./TranferMyWork"
const OzViewer = dynamic(() => import("@/components/OzViewer"), {
    loading: () => <div style={{ color: "red" }}>Loading eform...</div>,
    ssr: false
})
export interface choosenBlockCustom extends choosenBlock {
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
    const { data: session } = useSession()

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
                    block: tempalate?.block ?? []
                })
            })
            setListRight(dataListRight)
            return dataListRight
        }
        const GetEform = async () => {
            const formTemplate = cusTomerFormtemplate(mywork.eformTask)
            const listRight = CustomerListRight(formTemplate)
            const eformTaskCheck: any = mywork?.eformTask?.reduce(
                (acc: any, item) => {
                    acc[
                        `${item?.data?.ReportDisplayName}${item?.formTemplate?._id}`
                    ] = item.data
                    return acc
                },
                {}
            )

            if (listRight.length > 0) {
                resetEForm()
                await delay(2000)
                const choosenBlock: choosenBlockCustom[] = []

                listRight.forEach((element) => {
                    let count = 0
                    element.block.forEach((block: block) => {
                        choosenBlock.push({
                            name: block.name,
                            location: count.toString(),
                            ozrRepository: block.ozrRepository,
                            idTemplate: element?.id,
                            Input: JSON.stringify(
                                eformTaskCheck[`${block?.name}${element?.id}`]
                                    ?.Input
                            )
                        })
                    })
                })
                console.log("choosenBlock", choosenBlock)
                const oz = document.getElementById("OZViewer")
                if (oz) {
                    for (let i = choosenBlock.length - 1; i >= 0; i--) {
                        const block = choosenBlock[i]
                        oz.CreateReportEx(
                            DefaultParams(
                                process.env.NEXT_PUBLIC_EFORM_SERVER_APP!,
                                "/" + block.ozrRepository + "/" + block.name,
                                block.name,
                                block.Input
                            ),
                            ";"
                        )
                    }
                }
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
        //HandlerSigning()
        HandlerActionEform("SAVE")
    }

    const HandlerSigning = async () => {
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
                            signerEmail: session?.user.userInfo.mail,
                            signerName: session?.user.userInfo.userName,
                            signLocation: "~3",
                            eFormTaskId: mywork._id,
                            filePath:
                                process.env.NEXT_PUBLIC_EXPORT_FOLDER! +
                                "/" +
                                responseData
                        }
                        //console.log("Sign request", signRequest)
                        //call docusign service
                        const docuResponse = await axios.post(
                            process.env.NEXT_PUBLIC_EFORM_SIGNING!,
                            signRequest,
                            {
                                headers: {
                                    Authorization:
                                        "Bearer " + cookies.get("token"),
                                    Session: cookies.get("session")
                                }
                            }
                        )

                        console.log("Docu response", docuResponse.data)
                    } else {
                        messageApi.error(
                            "Xuất file PDF thất bại.Xin hãy thử lại sau"
                        )
                    }
                } catch (error: any) {
                    console.log("OH SHIT ERROR", error.response)
                }
            } else {
                messageApi.error("Không có document để phê duyệt")
            }
        }
    }

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

export default TemlateWrapper
