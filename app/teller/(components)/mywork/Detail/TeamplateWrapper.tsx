"use client"
import { message } from "antd"
import React, { useState } from "react"
import dynamic from "next/dynamic"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
const OzViewer = dynamic(() => import("@/components/OzViewer"), { ssr: false })
import TranferMyWork from "./TranferMyWork"
import ButtonHandleEform from "../../customButton/ButtonHandleEform"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import delay from "delay"
const TemlateWrapper: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const [viewerKey, setViewerKey] = useState<number>(0)
    const { listRight, setChoosenBlock } = useContextMyWorkDetail()
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
    const onSubmit = () => {
        const oz = document.getElementById("OZViewer")
        if (oz) {
            if (oz.GetInformation("INPUT_CHECK_VALIDITY") == "valid") {
                var inputdata = oz.GetInformation(
                    "INPUT_JSON_ALL_GROUP_BY_REPORT"
                )
                console.log("hoang", inputdata)
            }else{
                console.log("no input data")
            }
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
                        onSave={() => {}}
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
