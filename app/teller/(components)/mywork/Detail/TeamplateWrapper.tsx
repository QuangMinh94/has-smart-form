"use client"
import { message } from "antd"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { addEformTask } from "@/app/(service)/addEformTasks"
import { RequestEformTaks, taskEform } from "@/app/(types)/eFormTask"

const OzViewer = dynamic(() => import("@/components/OzViewer"), {
    loading: () => <div style={{color:"red"}}>Loading eform...</div>,
    ssr: false
})

const TemlateWrapper: React.FC = () => {
    const cookies = useCookies()
    const [messageApi, contextHolder] = message.useMessage()
    const [viewerKey, setViewerKey] = useState<number>(0)
    const { listRight, setChoosenBlock, dataGlobal } = useContextMyWorkDetail()
    const resetEForm = () => {
        setViewerKey(Math.random())
    }
    const onPreview = async () => {
        if (listRight.length > 0) {
            resetEForm()
            //resetEForm()
            await delay(2000)
            const choosenBlock: {
                name: string
                location: string
                ozrRepository: string
            }[] = []

            listRight.forEach((element) => {
                let count = 0
                choosenBlock.push({
                    name: element.name,
                    location: count.toString(),
                    ozrRepository: element.repository
                })
            })

            setChoosenBlock({
                choosenBlock: choosenBlock,
                changeBlock: 0
            })
            const oz = document.getElementById("OZViewer")
            console.log(choosenBlock)
            choosenBlock.forEach((block) => {
                oz!.CreateReportEx(
                    DefaultParams(
                        process.env.NEXT_PUBLIC_EFORM_SERVER_APP!,
                        "/" + block.ozrRepository + "/" + block.name,
                        block.name
                    ),
                    ";"
                )
                //oz!.Script("refresh")
            })
        } else {
            messageApi.error("Please choose at least 1 block")
        }
    }
    const onCancel = () => {
        resetEForm()
    }
    const onSubmit = async () => {
        HandlerActionEform("SUBMIT")
    }
    const onSave = () => {
        HandlerActionEform("SAVE")
    }
    const HandlerActionEform = async (type: "SAVE" | "SUBMIT") => {
        try {
            const oz = document.getElementById("OZViewer")
            if (oz) {
                if (oz.GetInformation("INPUT_CHECK_VALIDITY") == "valid") {
                    var inputdatas = JSON.parse(
                        oz.GetInformation("INPUT_JSON_ALL_GROUP_BY_REPORT")
                    )
                    console.log("My data where", inputdatas)
                    const reversedata = [...listRight].reverse()
                    const eformTasks: taskEform[] = []

                    inputdatas.forEach((inputdata: any, index: number) => {
                        eformTasks.push({
                            data: inputdata,
                            fromTemplate: reversedata?.[index]?.id,
                            documentId: "test"
                        })
                    })

                    const body: RequestEformTaks = {
                        eformTasks: eformTasks,
                        appointment: dataGlobal.appointment,
                        button: type
                    }
                    console.log(body)
                    const res = await addEformTask({
                        bodyRequest: body,
                        token: cookies.get("token") ?? "",
                        session: cookies.get("session") ?? ""
                    })
                    if (res.status === 200) {
                        messageApi.success("success")
                    }
                } else {
                    messageApi.error("no input data")
                }
            }
        } catch (e: any) {
            messageApi.error("err")
        }
    }

    return (
        <div>
            {contextHolder}
            <DndProvider backend={HTML5Backend}>
                <TranferMyWork />
                <div className="mt-10">
                    <ButtonHandleEform
                        onCancel={onCancel}
                        onPreview={onPreview}
                        onSave={onSave}
                        onSubmit={onSubmit}
                    />
                </div>
                <OzViewer viewerKey={viewerKey} />
            </DndProvider>
        </div>
    )
}
const DefaultParams = (
    url: string,
    reportName: string,
    displayname: string
) => {
    return `connection.servlet=${url};
connection.reportname=${reportName};
global.concatthumbnail=true;
connection.refreshperiod=1;
viewer.createreport_doc_index=0;
    global.concatpreview=false;
    viewer.showtab=true;
    connection.displayname=${displayname};
    viewer.thumbnailsection_showclosebutton=true;`
}
export default TemlateWrapper
