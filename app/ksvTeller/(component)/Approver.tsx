"use client"
import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button, Flex } from "antd"
import delay from "delay"
import { formTemplate } from "@/app/(types)/eProduct"
import { choosenBlock } from "@/app/teller/(components)/context"
import { block } from "@/app/(types)/eProduct"
import { DefaultParams } from "@/components/OzViewer"

const OzViewer = dynamic(() => import("@/components/OzViewer"), {
    loading: () => <div style={{ color: "red" }}>Loading eform...</div>,
    ssr: false
})
type Props = {
    EformTemplate: formTemplate[]
}
const Approver: React.FC<Props> = ({ EformTemplate }) => {
    const [keyOZviewr, setKeyOZviewr] = useState<number>(0)
    const resetEForm = () => {
        setKeyOZviewr(Math.random())
    }
    console.log("EformTemplate", EformTemplate)
    useEffect(() => {
        const LoadEfrom = async () => {
            if (EformTemplate.length > 0) {
                resetEForm()
                await delay(2000)
                const choosenBlock: choosenBlock[] = []

                EformTemplate.forEach((element) => {
                    let count = 0
                    const blocks = element?.block ?? []
                    blocks.forEach((block: block) => {
                        choosenBlock.push({
                            name: block.name,
                            location: count.toString(),
                            ozrRepository: block.ozrRepository,
                            idTemplate: element?._id ?? ""
                        })
                    })
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
            }
        }
        LoadEfrom()
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
