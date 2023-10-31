"use client"

//import OzViewer from "@/components/OzViewer"
import { EformTemplate } from "@/app/(types)/EformTemplate"
import { timeStampToDayjs } from "@/app/(utilities)/TimeStampToDayjs"
import { ContextTemplate } from "@/components/context/context"
import { useQuery } from "@tanstack/react-query"
import { Form, Skeleton, message } from "antd"
import axios from "axios"
import dayjs from "dayjs"
import tz from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import delay from "delay"
import dynamic from "next/dynamic"
import { useContext, useEffect, useState } from "react"
import TemplateForm from "../new/TemplateForm"
import TransferTemplate from "../new/TransferTemplate"
import CustomButtonGroup from "./CustomButtonGroup"

dayjs.extend(utc)
dayjs.extend(tz)

const OzViewer = dynamic(() => import("@/components/OzViewer"), { ssr: false })

interface OptionProps {
    id: string
    name: string
    checkBox: boolean
    type: string
}

const NewTemplateWrapper = ({
    id,
    data
}: {
    id?: string
    data: EformTemplate[]
}) => {
    const [form] = Form.useForm()

    const [messageApi, contextHolder] = message.useMessage()
    const {
        setFormData,
        setChoosenBlock,
        setListLeft,
        listRight,
        setSubmitType,
        setIsInsert
    } = useContext(ContextTemplate)
    const [viewerKey, setViewerKey] = useState<number>(0)

    useEffect(() => {
        if (data.length > 0) {
            setIsInsert(false)
            setChoosenBlock({
                choosenBlock: data[0].block!,
                changeBlock: 0
            })

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
    const onSubmit = () => {
        setSubmitType("SUBMIT")
        form.submit()
    }
    const onSave = () => {
        setSubmitType("SAVE")
        form.submit()
    }
    const onCancel = () => {
        resetEForm()
        /* const oz = document.getElementById("OZViewer")
        const inputdata = oz!.GetInformation("INPUT_JSON_ALL")
        var params = "connection.inputjson=" + inputdata + ";"
        oz!.ReBind(0, "data", params, ";") */
    }

    const useTemplate = () =>
        useQuery<OptionProps[]>({
            queryKey: ["option"],
            queryFn: async () => {
                console.log("Query time")
                const res = await axios.post(
                    process.env.NEXT_PUBLIC_EFORM_LIST!,
                    {
                        repository: "Dịch vụ tài khoản"
                    }
                )
                const res_1 = res.data as {
                    name: string
                    repository: string
                    serverPath: string
                }[]
                const _option: OptionProps[] = []
                res_1.forEach((resChild) => {
                    _option.push({
                        id: resChild.repository + resChild.name,
                        name: resChild.name,
                        checkBox: false,
                        type: resChild.repository
                    })
                })
                setListLeft(_option)
                return _option
            },
            //staleTime: 60 * 1000, //60sec
            retry: 3,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false
        })

    const { error, isLoading } = useTemplate()

    if (isLoading) return <Skeleton.Input className="w-fit" active={true} />

    if (error) return null

    return (
        <div>
            {contextHolder}
            <TemplateForm id={id} form={form} />
            <TransferTemplate />
            <CustomButtonGroup
                onPreview={onPreview}
                onSubmit={onSubmit}
                onSave={onSave}
                onCancel={onCancel}
            />
            <OzViewer viewerKey={viewerKey} />
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

export default NewTemplateWrapper
