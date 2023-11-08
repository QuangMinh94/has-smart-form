"use client"

//import OzViewer from "@/components/OzViewer"
import { EformTemplate } from "@/app/(types)/EformTemplate"
import { uniqueValue } from "@/app/(utilities)/ArrayUtilities"
import { timeStampToDayjs } from "@/app/(utilities)/TimeStampToDayjs"
import { ContextTemplate } from "@/components/context/context"
import { Form } from "antd"
import dayjs from "dayjs"
import tz from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import dynamic from "next/dynamic"
import { useContext, useEffect, useState } from "react"
import { OptionProps } from "../[id]/page"
import TemplateForm from "../new/TemplateForm"

dayjs.extend(utc)
dayjs.extend(tz)

const OzViewer = dynamic(() => import("@/components/OzViewer"), {
    loading: () => <>Loading eform...</>,
    ssr: false
})

const TemplateWrapperDetail = ({
    id,
    data,
    listLeft
}: {
    id?: string
    data: EformTemplate[]
    listLeft: OptionProps[]
}) => {
    const [form] = Form.useForm()
    const {
        setFormData,
        setChoosenBlock,
        setListLeft,
        setListRight,
        setIsInsert,
        setIsDisabled
    } = useContext(ContextTemplate)
    const [viewerKey, setViewerKey] = useState<number>(0)

    useEffect(() => {
        setIsDisabled(false)
        if (data.length > 0) {
            setIsInsert(false)
            setChoosenBlock({
                choosenBlock: data[0].block ? data[0].block : [],
                changeBlock: 0
            })

            const _listRight: OptionProps[] = []
            if (data[0].block) {
                data[0].block.forEach((element) => {
                    _listRight.push({
                        id: element.ozrRepository + "/" + element.name!,
                        name: element.name!,
                        checkBox: false,
                        type: element.ozrRepository!
                    })
                })
                setListRight(_listRight)
            }
            //console.log("List result", UniqueValue(listLeft, _listRight))
            if (listLeft.length > 0) {
                setListLeft(uniqueValue(listLeft, _listRight))
            }

            form.setFieldsValue({
                formName: data[0].name,
                formCode: data[0].code,
                description: data[0].description,
                validFrom: timeStampToDayjs(
                    new Date(data[0].validFrom as string).getTime()
                ),
                validTo: timeStampToDayjs(
                    new Date(data[0].validTo as string).getTime()
                )
            })
        } else {
            setListLeft(listLeft)
            setIsInsert(true)
            setChoosenBlock({
                choosenBlock: [],
                changeBlock: 0
            })
            form.setFieldsValue({
                formName: "",
                formCode: "",
                description: "",
                validFrom: null,
                validTo: null
            })
        }

        setFormData(data)
        setViewerKey(Math.random())
    }, [id])

    return (
        <div>
            <TemplateForm disabled={true} id={id} form={form} />
            <OzViewer viewerKey={viewerKey} />
        </div>
    )
}

export default TemplateWrapperDetail
