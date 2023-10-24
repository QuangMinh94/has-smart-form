"use client"

import OzViewer from "@/components/OzViewer"
import { ContextTemplate } from "@/components/context/context"
import { useQuery } from "@tanstack/react-query"
import { Form, Skeleton, message } from "antd"
import axios from "axios"
import { useContext } from "react"
import CustomButtonGroup from "../_components/CustomButtonGroup"
import TemplateForm from "./TemplateForm"
import TransferTemplate from "./TransferTemplate"

interface OptionProps {
    id: string
    name: string
    checkBox: boolean
    type: string
}

const NewTemplateWrapper = () => {
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const { setChoosenBlock, setListLeft, listRight, setSubmitType } =
        useContext(ContextTemplate)
    const onPreview = () => {
        if (listRight.length > 0) {
            const choosenBlock = listRight

            setChoosenBlock({
                choosenBlock: choosenBlock,
                changeBlock: 0
            })

            const oz = document.getElementById("OZViewer")
            choosenBlock.forEach((block) => {
                oz!.CreateReportEx(
                    DefaultParams(
                        process.env.NEXT_PUBLIC_EFORM_SERVER_APP!,
                        "/" + block.type + "/" + block.name,
                        block.name
                    ),
                    ";"
                )
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
    const onCancel = () => {}

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
        <>
            {contextHolder}
            <TemplateForm form={form} />
            <TransferTemplate />
            <CustomButtonGroup
                onPreview={onPreview}
                onSubmit={onSubmit}
                onSave={onSave}
                onCancel={onCancel}
            />
            <OzViewer />
        </>
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
    global.concatpreview=false;
    viewer.showtab=true;
    connection.displayname=${displayname};
    viewer.thumbnailsection_showclosebutton=true;`
}

const BackupParams = `connection.servlet=http://10.4.18.92/training/server;
connection.reportname=/input/Dịch vụ tài khoản/EXIMBANK Đề nghị kiêm hợp đồng sử dụng dịch vụ tài khoản thanh toán.ozr;
viewer.showthumbnail=false;
global.concatthumbnail=true;
    global.concatpreview=false;
    viewer.showtree=true;
    viewer.showtab=true;
    connection.displayname=EXIMBANK Đề nghị kiêm hợp đồng sử dụng dịch vụ tài khoản thanh toán;
    viewer.thumbnailsection_showclosebutton=true;`

export default NewTemplateWrapper
