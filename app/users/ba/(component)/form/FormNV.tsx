"use client"
import {
    useContextBa,
    useContextTranfer
} from "@/components/cusTomHook/useContext"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import useGetInfoUser from "@/components/cusTomHook/useGetInfoUser"
import { Button, Col, Form, Input, Row } from "antd"
import React, { memo, useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import TranfeNV from "../TranfeNV"

import { AddEproduct, UpdateEproduct } from "@/app/(service)/eProduct"
import {
    eProduct,
    requestBodyAddEproduct,
    requestBodyUpdateEproduct
} from "@/app/(types)/eProduct"
import { useEnvContext } from "next-runtime-env"
import { setting } from "../../../(components)/button/ButtonOpenModalProduct"

import { RevalidateTreeEProductViewPermssion } from "@/app/(actions)/action"
import {
    GethEformTemplate,
    SeacrhEformTemplate
} from "@/app/(service)/EformTemplate"
import { DataTranfer } from "@/app/(types)/typeDataTranfe"
import { useQuery } from "@tanstack/react-query"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = { type: setting; rowData?: eProduct; cancelModel: () => void }

const UseFecthApiFormAll = ({
    urlSeacrhEform,
    urlGetEform,
    token,
    session
}: {
    urlSeacrhEform: string
    urlGetEform: string
    token: string
    session: string
}) => {
    const { InFoUser } = useGetInfoUser()

    const Role: any = InFoUser?.defaultGroup?.role?.[0]
    const idRole = Role?._id
    const { error, data, isRefetching, isLoading } = useQuery<any>({
        queryKey: ["formtemplatesAll"],
        queryFn: async () => {
            const resAll = await Promise.all([
                await SeacrhEformTemplate({
                    url: urlSeacrhEform!,
                    bodyRequest: { userRole: idRole, onlyApprove: true },
                    token,
                    session
                }),
                await GethEformTemplate({
                    url: urlGetEform!,
                    bodyRequest: {},
                    token,
                    session
                })
            ])

            return resAll
        },
        retry: 3,
        refetchOnWindowFocus: false
    })

    return {
        isRefetching,
        isLoading,
        error,
        FormAll: data?.[0].data,
        FormNotUse: data?.[1].data
    }
}

const FormNV: React.FC<Props> = ({ rowData, type, cancelModel }) => {
    const [form] = Form.useForm()
    const {
        NEXT_PUBLIC_ADD_EPRODUCT,
        NEXT_PUBLIC_UPDATE_EPRODUCT,
        NEXT_PUBLIC_EFORM_SEARCH_TEMPLATE,
        NEXT_PUBLIC_GET_EFORM_TEMPLATE
    } = useEnvContext()
    const { token, session } = useCustomCookies()
    const { messageApi, setDataGlobal, dataGlobal } = useContextBa()
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false)
    const { listRight, setListLeft, setListRight, setLoading, listLeft } =
        useContextTranfer()
    const { FormNotUse, FormAll, isLoading, isRefetching } = UseFecthApiFormAll(
        {
            urlSeacrhEform: NEXT_PUBLIC_EFORM_SEARCH_TEMPLATE!,
            urlGetEform: NEXT_PUBLIC_GET_EFORM_TEMPLATE!,
            session,
            token
        }
    )

    useEffect(() => {
        setLoading(isLoading || isRefetching)
        if (FormNotUse && FormAll) {
            const dataListRight: DataTranfer[] = []
            const dataListLeft: DataTranfer[] = []
            let objIDTemplate: any = {}
            if (type === "UPDATE_MODAL") {
                //check duplicates
                objIDTemplate = rowData?.formTemplate?.reduce(
                    (acc: any, item) => {
                        acc[`${item?._id ?? item}`] = true
                        return acc
                    },
                    {}
                )
                FormAll.forEach((template: any) => {
                    if (objIDTemplate[`${template?._id}`]) {
                        dataListRight.push({
                            id: template?._id ?? "",
                            name: template?.name ?? "",
                            checkBox: false
                        })
                    }
                })
                setListRight(dataListRight)
            }

            FormNotUse.forEach((template: any) => {
                // if (!objIDTemplate[`${template?._id}`]) {
                dataListLeft.push({
                    id: template?._id ?? "",
                    name: template?.name ?? "",
                    checkBox: false
                })
                // }
            })

            setListLeft(dataListLeft)
        }
        return () => {
            setDataGlobal((data) => ({ ...data, checkedForm: true }))
        }
    }, [isLoading, isRefetching])

    //check form
    useEffect(() => {
        if (FormNotUse) {
            const dataListLeft: DataTranfer[] = []
            let objIDTemplate: any = {}

            //check duplicates
            objIDTemplate = listRight.reduce((acc: any, item) => {
                acc[`${item?.id}`] = true
                return acc
            }, {})

            const templates = FormNotUse
            templates.forEach((tempalate: any) => {
                if (!objIDTemplate[`${tempalate?._id}`]) {
                    dataListLeft.push({
                        id: tempalate?._id ?? "",
                        name: tempalate?.name ?? "",
                        checkBox: false
                    })
                }
            })

            setListLeft(dataListLeft)
        }
    }, [dataGlobal.checkedForm])
    console.log("list left", listLeft)
    const onFinish = ({
        idNV,
        name,
        description
    }: {
        idNV: string
        imageProduct: {
            thumbUrl: string
            type: string
        }
        name: string
        description: string
    }) => {
        const formTemlapteId: string[] = listRight.map((item) => item?.id)
        if (type === "ADD_MODAL") {
            const body: requestBodyAddEproduct = {
                name: name,
                description: description,
                active: true,
                department: rowData?.department ?? "",
                code: idNV,
                parent: `${rowData?._id}`,
                type: "B",
                formTemplate: formTemlapteId
            }

            if (!rowData?._id) {
                // không có id parent tức là thêm vào cấp cáo nhất không con của ai
                delete body.parent
            }
            AddNVFC(body)
        }
        if (type === "UPDATE_MODAL") {
            const body: requestBodyUpdateEproduct = {
                id: rowData?._id ?? "",
                name: name,

                description: description,
                active: true,
                code: idNV,
                formTemplate: formTemlapteId,
                type: "B"
            }

            UpdateNVFC(body)
        }
    }

    const AddNVFC = async (body: requestBodyAddEproduct) => {
        setLoadingBtn(true)
        try {
            const res = await AddEproduct({
                url: NEXT_PUBLIC_ADD_EPRODUCT!,
                bodyRequest: body,
                token,
                session
            })
            if (res.status === 200) {
                const resEproduct: any = res.data
                await RevalidateTreeEProductViewPermssion()
                messageApi("success", "Thêm nghiệp vụ thành công")
                cancelModel()
                setDataGlobal((data) => {
                    const eProducts = [...data.eProducts]
                    function addEProduct(eProduct: eProduct[]) {
                        const dataAdd = {
                            ...resEproduct,
                            parent: {
                                id: rowData?._id ?? "",
                                name: rowData?.name ?? ""
                            },
                            children: []
                        }
                        for (let i = 0; i < eProduct.length; i++) {
                            const item = eProduct[i]
                            if (item._id === body.parent) {
                                item.children?.unshift(dataAdd)
                                return
                            }
                            if (item?.children && item?.children?.length > 0) {
                                addEProduct(item?.children ?? [])
                            }
                        }
                    }

                    addEProduct(eProducts)
                    return {
                        ...data,
                        eProducts: eProducts
                    }
                })
            }
        } catch (err) {
            messageApi("error", "có lỗi")
        }
        setLoadingBtn(false)
    }
    const UpdateNVFC = async (body: requestBodyUpdateEproduct) => {
        setLoadingBtn(true)
        try {
            const res = await UpdateEproduct({
                url: NEXT_PUBLIC_UPDATE_EPRODUCT!,
                bodyRequest: body,
                token,
                session
            })
            if (res.status === 200) {
                const resEproduct: any = res.data
                delete resEproduct?.parent
                // await RevalidateTreeEProduct()
                messageApi("success", "Cập nhật nghiệp vụ thành công")
                cancelModel()
                setDataGlobal((data) => {
                    const eProducts = [...data.eProducts]
                    function updateEProduct(eProduct: eProduct[]) {
                        for (let i = 0; i < eProduct.length; i++) {
                            const item = eProduct[i]
                            if (item._id === body.id) {
                                eProduct[i] = {
                                    ...item,
                                    ...resEproduct
                                }
                                return
                            }
                            if (item?.children && item?.children?.length > 0) {
                                updateEProduct(item?.children ?? [])
                            }
                        }
                    }
                    updateEProduct(eProducts)
                    return {
                        ...data,
                        eProducts: eProducts
                    }
                })
            }
        } catch (err) {
            messageApi("error", "có lỗi")
        }
        setLoadingBtn(false)
    }

    return (
        <Form
            layout="vertical"
            name="basic"
            form={form}
            labelCol={{ span: 7 }}
            initialValues={
                type === "ADD_MODAL"
                    ? {}
                    : {
                          idNV: rowData?.code ?? "",
                          name: rowData?.name ?? "",
                          description: rowData?.description ?? ""
                      }
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row gutter={20}>
                <Col span={8}>
                    <Form.Item
                        style={{ marginBottom: "25px" }}
                        label="Mã nghiệp vụ"
                        name="idNV"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Vui lòng nhập mã nghiệp vụ!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        style={{ marginBottom: "25px" }}
                        label="Tên nghiệp vụ"
                        name="name"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Vui lòng nhập tên nghiệp vụ!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Dịch vụ "
                        name="eProduct"
                        // rules={[
                        //     {
                        //         required: true,
                        //         whitespace: true,
                        //         message: "Vui lòng chọn dịch vụ!"
                        //     }
                        // ]}
                    >
                        {/* <SelectEproduct
                            disabled={type === "UPDATE_MODAL"}
                            onChange={HandlerOnchangeEproduct}
                            type="getEProduct"
                        /> */}
                        <Input
                            disabled
                            defaultValue={
                                type === "ADD_MODAL"
                                    ? rowData?.name
                                    : rowData?.parent?.name
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                style={{ marginBottom: "25px" }}
                label="Mô tả"
                name="description"
            >
                <Input.TextArea style={{ minHeight: "150px" }} />
            </Form.Item>
            <div className="flex flex-row-reverse my-[20px]">
                <Button loading={loadingBtn} type="primary" htmlType="submit">
                    Xác nhận
                </Button>
            </div>
            <DndProvider backend={HTML5Backend}>
                <TranfeNV />
            </DndProvider>
        </Form>
    )
}

export default memo(FormNV)
