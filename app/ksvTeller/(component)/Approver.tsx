"use client"
import { block, formTemplate } from "@/app/(types)/eProduct"
import { eFormTask, myWork } from "@/app/(types)/teller/mywork"
import { choosenBlockCustom } from "@/app/teller/(components)/mywork/Detail/TeamplateWrapper"
import { Flex } from "antd"
import delay from "delay"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"

import { DataTranfeCustom } from "@/app/teller/(components)/mywork/Detail/HeaderUiContent"
import { DefaultParams } from "@/components/OzViewer"
import BtnNotApproveAndApprove from "./BtnNotApproveAndApprove"
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
        const eformTaskCheck: any = mywork.eformTask.reduce(
            (acc: any, item) => {
                acc[
                    `${item?.data?.ReportDisplayName}${item?.formTemplate?._id}`
                ] = item?.data
                return acc
            },
            {}
        )
        resetEForm()
        await delay(2000)
        const choosenBlock: choosenBlockCustom[] = []

        listRight.forEach((element) => {
            let count = 0
            element.block.forEach((block: block) => {
                choosenBlock.push({
                    name: block?.name,
                    location: count?.toString(),
                    ozrRepository: block?.ozrRepository,
                    idTemplate: element?.id,
                    Input: JSON.stringify(
                        eformTaskCheck[`${block?.name}${element?.id}`]?.Input
                    )
                })
            })
        })

        const oz = document.getElementById("OZViewer")
        if (oz) {
            for (let i = choosenBlock.length - 1; i >= 0; i--) {
                const block = choosenBlock[i]
                oz.CreateReportEx(
                    DefaultParams(
                        process.env.NEXT_PUBLIC_EFORM_SERVER_APP!,
                        "/" + block?.ozrRepository + "/" + block?.name,
                        block?.name,
                        block?.Input
                    ),
                    ";"
                )
            }
        }
    }

    useEffect(() => {
        const cusTomerFormtemplate = (
            EformTask: eFormTask[]
        ): formTemplate[] => {
            const check: any = {}
            const formTemplate: formTemplate[] = []
            EformTask?.forEach((task) => {
                if (!check[`${task?.formTemplate?._id}`]) {
                    formTemplate.push(task?.formTemplate)
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

            return dataListRight
        }
        const GetEform = () => {
            const formTemplate = cusTomerFormtemplate(mywork.eformTask)
            const listRight = CustomerListRight(formTemplate)

            if (listRight.length > 0) {
                HandelerPreview(listRight)
            }
        }
        if (mywork?.eformTask && mywork.eformTask.length > 0) {
            GetEform()
        }
    }, [])

    return (
        <div>
            <Flex justify="flex-end" gap={10} className="mt-10 mb-2">
                <BtnNotApproveAndApprove type="approve" />
                <BtnNotApproveAndApprove type="notApprove" />
            </Flex>
            <OzViewer viewerKey={keyOZviewr} />
        </div>
    )
}
export default Approver
