"use client"
import { useEnvContext } from "next-runtime-env"
import { addEformTask } from "@/app/(service)/EformTemplate"
import {
    SeacrhCustomInFo,
    filterAppointMent
} from "@/app/(service)/appointments"
import { RequestEformTaks } from "@/app/(types)/eFormTask"
import { block, formTemplate } from "@/app/(types)/eProduct"
import { eFormTask, myWork } from "@/app/(types)/teller/mywork"
import { choosenBlock } from "@/app/teller/(components)/context"
import { DataTranfeCustom } from "@/app/teller/(components)/mywork/Detail/HeaderUiContent"
import { DefaultParams, OzDelimiter } from "@/components/OzViewer"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import { InforUser, Users } from "@/app/(types)/Users"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import routers from "@/router/cusTomRouter"
import { message } from "antd"
import delay from "delay"
import dynamic from "next/dynamic"
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams
} from "next/navigation"
import React, { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ButtonHandleEform from "../../customButton/ButtonHandleEform"
import TranferMyWork from "./TranferMyWork"

import "./viewoz.css"
const OzViewer = dynamic(() => import("@/components/OzViewer"), {
    loading: () => <div style={{ color: "red" }}>Loading eform...</div>,
    ssr: false
})

type Props = { mywork: myWork }
const TemlateWrapper: React.FC<Props> = ({ mywork }) => {
    const {
        NEXT_PUBLIC_SEARCH_CUSTOMER_INFO,
        NEXT_PUBLIC_EFORM_TASK,
        NEXT_PUBLIC_FILTER_APPOINT_MENTS,
        NEXT_PUBLIC_EFORM_SERVER_APP
    } = useEnvContext()
    const [DataMywork, setMyWork] = useState<myWork>(mywork)
    const { token, session } = useCustomCookies()
    const params = useParams()
    const router = useRouter()
    console.log("dataMywork: ", DataMywork)
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage()
    const [viewerKey, setViewerKey] = useState<number>(0)
    const [idFormTempLate, setIdFormTempLate] = useState<string[]>([])
    const { listRight, setChoosenBlock, setListRight, setDataGlobal } =
        useContextMyWorkDetail()
    const resetEForm = () => {
        setViewerKey(Math.random())
    }

    const Blocks = (listRightBlock: any[]): choosenBlock[] => {
        const choosenBlock: choosenBlock[] = []
        const checkDuplicateBlock = new Set()
        listRightBlock.forEach((element) => {
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
        return choosenBlock
    }

    useEffect(() => {
        //console.log("Here")
        setDataGlobal((data) => ({ ...data, myworkDetail: DataMywork }))
        router.refresh()
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
            const formTemplate = cusTomerFormtemplate(
                DataMywork?.eformTask ?? []
            )
            const listRight = CustomerListRight(formTemplate)

            if (listRight.length > 0) {
                resetEForm()
                await delay(3000)

                const choosenBlock = Blocks(listRight)
                console.log("choosenBlock", choosenBlock)

                const dataInput = DataMywork?.eformTask?.[0]?.data?.Input

                console.log("dataInput", dataInput)
                const oz = document.getElementById("OZViewer")
                if (oz) {
                    for (let i = choosenBlock.length - 1; i >= 0; i--) {
                        const block = choosenBlock[i]

                        oz.CreateReportEx(
                            DefaultParams(
                                NEXT_PUBLIC_EFORM_SERVER_APP!,
                                "/" + block.ozrRepository + "/" + block.name,
                                block.name,
                                OzDelimiter(),
                                JSON.stringify(dataInput)
                            ),
                            OzDelimiter()
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

        if (DataMywork?.eformTask && DataMywork.eformTask.length > 0) {
            GetEform()
        }
    }, [JSON.stringify(DataMywork)])

    const onPreview = async () => {
        try {
            if (listRight.length > 0) {
                const resSeacrhCustomInFo = await SeacrhCustomInFo({
                    url: NEXT_PUBLIC_SEARCH_CUSTOMER_INFO!,
                    bodyRequest: { citizenId: searchParams.get("CCCD") ?? "" },
                    session,
                    token
                })
                let info: InforUser = resSeacrhCustomInFo.data[0]
                if (resSeacrhCustomInFo.data?.length <= 0) {
                    const resFilterAppointMent = await filterAppointMent({
                        url: NEXT_PUBLIC_FILTER_APPOINT_MENTS!,
                        bodyRequest: {
                            appointmentCode: searchParams.get("code") ?? ""
                        },
                        session,
                        token
                    })
                    const User = resFilterAppointMent.data[0]

                    info = {
                        fullName: User?.name,
                        citizenId: User?.citizenId,
                        emailAddress: User?.email,
                        mobilePhoneNumber: User?.phoneNumber
                    }
                }
                console.log("foIn", info)
                resetEForm()
                await delay(3000)
                const choosenBlock = Blocks(listRight)
                const oz = document.getElementById("OZViewer")
                const dataInput = DataMywork?.eformTask?.[0]?.data?.Input
                for (let i = choosenBlock.length - 1; i >= 0; i--) {
                    const block = choosenBlock[i]

                    oz!.CreateReportEx(
                        DefaultParams(
                            NEXT_PUBLIC_EFORM_SERVER_APP!,
                            "/" + block.ozrRepository + "/" + block.name,
                            block.name,
                            OzDelimiter(),
                            JSON.stringify({
                                ...info,
                                ...dataInput,
                                Group2: info?.gender
                            })
                        ),
                        OzDelimiter()
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
        } catch (e) {
            messageApi.error("có lỗi vui lòng thử lại sau")
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

                const inputdata = JSON.parse(
                    oz.GetInformation("INPUT_JSON_ALL")
                )

                const body: RequestEformTaks = {
                    data: { Input: inputdata },
                    formTemplate: idFormTempLate,
                    appointmentId: `${params?.id}`,
                    documentId: "test",
                    button: type
                }

                console.log("requestbody", body)

                const res = await addEformTask({
                    url: NEXT_PUBLIC_EFORM_TASK!,
                    bodyRequest: body,
                    token,
                    session
                })
                if (res.status === 200) {
                    messageApi.success("success")
                    DataMywork?.eformTask?.[0]?.data?.Input
                    setMyWork((data) => {
                        const eformTask: any = data?.eformTask?.[0]
                        return {
                            ...data,
                            eformTask: [
                                {
                                    ...eformTask,
                                    data: { Input: inputdata }
                                }
                            ]
                        }
                    })
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

            const params =
                "connection.inputjson=" + input_data_current + OzDelimiter()
            numberArray.forEach((element) => {
                oz.ReBind(element, "report", params, OzDelimiter())
            })
        }
    }

    return (
        <div>
            {contextHolder}
            {DataMywork?.displayRule?.visibleView && (
                <DndProvider backend={HTML5Backend}>
                    <TranferMyWork
                        Disabled={!DataMywork.displayRule.visibleTemplate}
                    />
                    {DataMywork?.displayRule?.visibleGroupButton && (
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
                    )}
                    {DataMywork?.displayRule?.visibleOzr || (
                        <p id="disableInput" />
                    )}
                    <OzViewer viewerKey={viewerKey} />
                </DndProvider>
            )}
        </div>
    )
}

export default TemlateWrapper
