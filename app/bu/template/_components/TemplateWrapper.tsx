"use client"

//import OzViewer from "@/components/OzViewer"
import { EformTemplate } from "@/app/(types)/EformTemplate"
import { Permission } from "@/app/(types)/Permission"
import { FindPermission, uniqueValue } from "@/app/(utilities)/ArrayUtilities"
import { timeStampToDayjs } from "@/app/(utilities)/TimeStampToDayjs"
import { ContextTemplate } from "@/components/context/context"
import { Form, message } from "antd"
import axios from "axios"
import dayjs from "dayjs"
import tz from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import delay from "delay"
import { useSession } from "next-auth/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { OptionProps } from "../[id]/page"
import TemplateForm from "../new/TemplateForm"
import TransferTemplate from "../new/TransferTemplate"
import CustomButtonGroup from "./CustomButtonGroup"

dayjs.extend(utc)
dayjs.extend(tz)

const OzViewer = dynamic(() => import("@/components/OzViewer"), {
    loading: () => <>Loading eform...</>,
    ssr: false
})

const TemplateWrapper = ({
    id,
    data,
    listLeft,
    permission
}: {
    id?: string
    data: EformTemplate[]
    listLeft: OptionProps[]
    permission: Permission[]
}) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const {
        setFormData,
        setChoosenBlock,
        setListLeft,
        listRight,
        setListRight,
        setSubmitType,
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
                        id: element.ozrRepository + element.name!,
                        name: element.name!,
                        checkBox: false,
                        type: element.ozrRepository!
                    })
                })
                setListRight(_listRight)
            }
            //console.log("List result", UniqueValue(listLeft, _listRight))

            setListLeft(uniqueValue(listLeft, _listRight))

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
    }, [])

    const resetEForm = () => {
        setViewerKey(Math.random())
    }
    const onPreview = async () => {
        setIsDisabled(true)
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
                    ozrRepository: element.type
                })
            })

            setChoosenBlock({
                choosenBlock: choosenBlock,
                changeBlock: 0
            })
        } else {
            messageApi.error("Please choose at least 1 block")
        }
        setIsDisabled(false)
    }
    const onSubmit = () => {
        setIsDisabled(true)
        setSubmitType("SUBMIT")
        form.submit()
    }
    const onSave = () => {
        setIsDisabled(true)
        setSubmitType("SAVE")
        form.submit()
    }
    const onCancel = () => {
        resetEForm()
    }

    const onVerify = async () => {
        setIsDisabled(true)
        const data = {
            ozrName:
                "input\\Dịch vụ tài khoản\\EXIMBANK Đề nghị kiêm hợp đồng sử dụng dịch vụ tài khoản thanh toán.ozr",
            inputData: "",
            exportFormat: "pdf",
            exportPath: "MyName.ozr",
            exportFileName: "MyName.pdf"
        }

        const myData = await axios.post(
            "http://10.4.18.92/training/script/export - no2.jsp",
            data,
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        const repsonsedata: string = myData.data
            .toString()
            .replace(/(?:\\[rn])+/g, "")
            .trim()
        console.log("Repsonse yo", repsonsedata)
        setIsDisabled(false)
    }

    const onBack = () => {
        router.push("/bu/template")
        router.refresh()
    }

    return (
        <div>
            {contextHolder}
            {FindPermission(permission, "children", "VisibleFormInput") ? (
                <>
                    <TemplateForm id={id} form={form} />
                    <TransferTemplate />
                </>
            ) : (
                <></>
            )}
            <CustomButtonGroup
                permission={permission}
                onPreview={onPreview}
                onSubmit={onSubmit}
                onSave={onSave}
                onCancel={onCancel}
                onVerify={onVerify}
                onBack={onBack}
            />
            <OzViewer viewerKey={viewerKey} />
        </div>
    )
}

export default TemplateWrapper
