"use client"
import { block, formTemplate } from "@/app/(types)/eProduct"
import { eFormTask, myWork } from "@/app/(types)/teller/mywork"
import { choosenBlock } from "@/app/teller/(components)/context"
import { DataTranfeCustom } from "@/app/teller/(components)/mywork/Detail/HeaderUiContent"
import { DefaultParams, OzDelimiter } from "@/components/OzViewer"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Input, Row, message } from "antd"
import delay from "delay"
import { useEnvContext } from "next-runtime-env"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { CustomerLabel } from "./CustomLabel"

const OzViewer = dynamic(() => import("@/components/OzViewer"), {
    loading: () => <div style={{ color: "red" }}>Loading eform...</div>,
    ssr: false
})

type Props = { mywork: myWork }
const TemlateWrapperQueries: React.FC<Props> = ({ mywork }) => {
    const [DataMywork, setMyWork] = useState<myWork>(mywork)
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage()
    const [viewerKey, setViewerKey] = useState<number>(0)
    const [idFormTempLate, setIdFormTempLate] = useState<string[]>([])
    const { setChoosenBlock, setListRight, setDataGlobal } =
        useContextMyWorkDetail()
    const resetEForm = () => {
        setViewerKey(Math.random())
    }
    const { NEXT_PUBLIC_EFORM_SERVER_APP } = useEnvContext()

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

    return (
        <div>
            {contextHolder}
            {DataMywork && (
                <Row className="mb-5" gutter={10} align="middle">
                    <Col span={6}>
                        <CustomerLabel text="Mã giao dịch">
                            <Input
                                disabled
                                value={DataMywork.appointmentCode}
                            />
                        </CustomerLabel>
                    </Col>
                    <Col span={6}>
                        <CustomerLabel text="CCCD">
                            <Input disabled value={DataMywork.citizenId} />
                        </CustomerLabel>
                    </Col>
                    <Col span={6}>
                        <CustomerLabel text="Tên khách hàng">
                            <Input disabled value={DataMywork.name} />
                        </CustomerLabel>
                    </Col>
                    <Col span={6}>
                        <div className="flex justify-end">
                            <Button
                                type="primary"
                                icon={
                                    <FontAwesomeIcon
                                        icon={faLongArrowAltLeft}
                                    />
                                }
                                onClick={() => {
                                    router.back()
                                }}
                            >
                                Quay lại
                            </Button>
                        </div>
                    </Col>
                </Row>
            )}
            {DataMywork.eformTask &&
                (DataMywork.status!.code === "APPROVE" ||
                    DataMywork.status!.code === "REJECT") && (
                    <a
                        href={
                            "/api/download?id=" +
                            DataMywork.eformTask[0].ecmDocumentId
                        }
                        target="_blank"
                    >
                        Xem file kết quả
                    </a>
                )}
            <OzViewer viewerKey={viewerKey} />
        </div>
    )
}

export default TemlateWrapperQueries
