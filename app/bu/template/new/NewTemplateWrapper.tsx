"use client"

import OzViewer from "@/components/OzViewer"
import { contextBLockInput } from "@/components/context/templateContext"
import { Form } from "antd"
import { useContext } from "react"
import CustomButtonGroup from "../_components/CustomButtonGroup"
import TemplateForm from "./TemplateForm"

const NewTemplateWrapper = () => {
    const [form] = Form.useForm()
    const { setChoosenBlock } = useContext(contextBLockInput)
    const onPreview = () => {
        const choosenBlock = [
            { name: "BIDV.ozr", location: "1", ozrRepository: "input/Thẻ" },
            {
                name: "EXIMBANK Đề nghị kiêm hợp đồng sử dụng dịch vụ tài khoản thanh toán.ozr",
                location: "1",
                ozrRepository: "input/Dịch vụ tài khoản"
            }
        ]
        setChoosenBlock({
            choosenBlock: choosenBlock,
            changeBlock: 0
        })

        const oz = document.getElementById("OZViewer")
        choosenBlock.forEach((block) =>
            oz!.CreateReportEx(
                DefaultParams(
                    process.env.NEXT_PUBLIC_EFORM_SERVER_APP!,
                    "/" + block.ozrRepository + "/" + block.name,
                    block.name
                ),
                ";"
            )
        )
    }
    const onSubmit = () => {
        form.submit()
    }
    const onSave = () => {}
    const onCancel = () => {}

    return (
        <>
            {/*  <DragDropProvider data={allColumns.columns}>
                <Board />
            </DragDropProvider> */}
            <TemplateForm form={form} />
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
