"use client"
import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button, Flex } from "antd"
import delay from "delay"
import { formTemplate } from "@/app/(types)/eProduct"
import { myWork, eFormTask } from "@/app/(types)/teller/mywork"
import {
    choosenBlockcustom,
    DefaultParamsInput
} from "@/app/teller/(components)/mywork/Detail/TeamplateWrapper"
import { block } from "@/app/(types)/eProduct"

import { DataTranfeCustom } from "@/app/teller/(components)/mywork/Detail/HeaderUiContent"
const OzViewer = dynamic(() => import("@/components/OzViewer"), {
    loading: () => <div style={{ color: "red" }}>Loading eform...</div>,
    ssr: false
})
type Props = {
    mywork: myWork
}
const Approver: React.FC<Props> = ({ mywork }) => {
    const [keyOZviewr, setKeyOZviewr] = useState<number>(0)
    const resetEForm = () => {
        setKeyOZviewr(Math.random())
    }
    const HandelerPreview = async (listRight: DataTranfeCustom[]) => {
        const eformTaskOBJ: any = {}

        mywork.eformTask.forEach((eformTask) => {
            eformTaskOBJ[
                `${eformTask?.data?.ReportDisplayName}${eformTask.formTemplate._id}`
            ] = eformTask.data
        })
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
                        eformTaskOBJ[`${block?.name}${element?.id}`]?.Input
                    )
                })
            })
        })

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

            return dataListRight
        }
        const GetEform = () => {
            const formTemplate = cusTomerFormtemplate(mywork.eformTask)
            const listRight = CustomerListRight(formTemplate)

            if (listRight.length > 0) {
                HandelerPreview(listRight)
            }
        }
        GetEform()
    }, [])
    return (
        <div>
            <Flex justify="flex-end" gap={10} className="mt-10 mb-2">
                <Button type="primary">Approve</Button>
                <Button type="primary" danger>
                    Not Approve
                </Button>
            </Flex>
            <OzViewer viewerKey={keyOZviewr} />
        </div>
    )
}
export default Approver
