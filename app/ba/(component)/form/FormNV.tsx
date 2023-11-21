"use client"
import React, { memo, useState, useCallback, useEffect } from "react"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import useGetInfoUser from "@/components/cusTomHook/useGetInfoUser"
import { Button, Form, Input, Row, Col } from "antd"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import TranfeNV from "../TranfeNV"
import {
    useContextBa,
    useContextTranfer
} from "@/components/cusTomHook/useContext"

import { setting } from "../ButtonOpenModal"
import {
    eProduct,
    requestBodyAddEproduct,
    requestBodyUpdateEproduct
} from "@/app/(types)/eProduct"
import { AddEproduct, UpdateEproduct } from "@/app/(service)/eProduct"
import { useEnvContext } from "next-runtime-env"
import { EformTemplate } from "@/app/(types)/EformTemplate"
import { SeacrhEformTemplate } from "@/app/(service)/EformTemplate"
import { useQuery } from "@tanstack/react-query"
import { DataTranfer } from "@/app/(types)/typeDataTranfe"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = { type: setting; rowData?: eProduct; cancelModel: () => void }

const UseFecthApi = () => {
    const { NEXT_PUBLIC_EFORM_SEARCH_TEMPLATE } = useEnvContext()
    const { InFoUser } = useGetInfoUser()
    const { token, session } = useCustomCookies()
    const Role: any = InFoUser?.defaultGroup.role?.[0]
    const idRole = Role?._id
    const { isLoading, error, data, refetch } = useQuery<EformTemplate[]>({
        queryKey: ["formtemplates"],
        queryFn: async () => {
            const res = await SeacrhEformTemplate({
                url: NEXT_PUBLIC_EFORM_SEARCH_TEMPLATE!,
                bodyRequest: { userRole: idRole, onlyApprove: true },
                token,
                session
            })

            return res.data
        },
        retry: 3,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    })

    return { isLoading, error, data, refetch }
}
const FormNV: React.FC<Props> = ({ rowData, type, cancelModel }) => {
    const [form] = Form.useForm()
    const { NEXT_PUBLIC_ADD_EPRODUCT, NEXT_PUBLIC_UPDATE_EPRODUCT } =
        useEnvContext()
    const { token, session } = useCustomCookies()
    const { messageApi, setDataGlobal, dataGlobal } = useContextBa()
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false)
    const {
        listRight,
        setListLeft,
        setListRight,
        setLoading,
        setChangeListFilter
    } = useContextTranfer()

    const { data, isLoading } = UseFecthApi()
    const templateInNv = (eProduct: eProduct[]): any => {
        const objID: any = {}
        const ForIdTemplate = (eProduct: eProduct[]) => {
            eProduct.forEach((item) => {
                if (item.formTemplate && item.formTemplate.length > 0) {
                    item.formTemplate.forEach((template) => {
                        objID[`${template?._id}`] = template.name
                    })
                }
                if (item?.children && item.children.length > 0) {
                    ForIdTemplate(item?.children)
                }
            })
        }
        ForIdTemplate(eProduct)
        return objID
    }
    useEffect(() => {
        setLoading(isLoading)
        if (data) {
            const dataListRight: DataTranfer[] = []
            const dataListLeft: DataTranfer[] = []
            const IdCheckTemplate = templateInNv(dataGlobal.eProducts)
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
                data.forEach((template) => {
                    if (objIDTemplate[`${template?._id}`]) {
                        dataListRight.push({
                            id: template?._id ?? "",
                            name: template?.name ?? "",
                            checkBox: false
                        })
                    }
                })
            }

            const templates = data.filter(
                (item) => !IdCheckTemplate[`${item._id}`]
            )
            templates.forEach((template) => {
                if (!objIDTemplate[`${template?._id}`]) {
                    dataListLeft.push({
                        id: template?._id ?? "",
                        name: template?.name ?? "",
                        checkBox: false
                    })
                }
            })
            console.log("listR1", dataListRight)
            setListLeft(dataListLeft)
            setListRight(dataListRight)
        }
        console.log("sao ay nhi")
    }, [isLoading, data?.length])

    //check form
    useEffect(() => {
        if (data) {
            const dataListLeft: DataTranfer[] = []
            const IdCheckTemplate = templateInNv(dataGlobal.eProducts)
            let objIDTemplate: any = {}

            //check duplicates
            objIDTemplate = listRight.reduce((acc: any, item) => {
                acc[`${item?.id}`] = true
                return acc
            }, {})
            console.log("listRight", listRight)
            let templates = data.filter(
                (item) => !IdCheckTemplate[`${item._id}`]
            )
            if (!dataGlobal.checkedForm) {
                templates = data
            }

            templates.forEach((tempalate) => {
                if (!objIDTemplate[`${tempalate?._id}`]) {
                    dataListLeft.push({
                        id: tempalate?._id ?? "",
                        name: tempalate?.name ?? "",
                        checkBox: false
                    })
                }
            })

            setListLeft(dataListLeft)
            setChangeListFilter((p) => !p)
        }
    }, [dataGlobal.checkedForm, JSON.stringify(listRight)])

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
                        eProduct.forEach((item) => {
                            if (item._id === body.parent) {
                                item.children?.unshift(dataAdd)
                                return
                            }
                            if (item?.children && item?.children?.length > 0) {
                                addEProduct(item?.children ?? [])
                            }
                        })
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
                messageApi("success", "Cập nhật nghiệp vụ thành công")
                cancelModel()
                setDataGlobal((data) => {
                    const eProducts = [...data.eProducts]
                    function updateEProduct(eProduct: eProduct[]) {
                        eProduct.forEach((item, index) => {
                            if (item._id === body.id) {
                                eProduct[index] = {
                                    ...item,
                                    ...resEproduct
                                }
                                return
                            }
                            if (item?.children && item?.children?.length > 0) {
                                updateEProduct(item?.children ?? [])
                            }
                        })
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
    const HandlerOnchangeEproduct = useCallback((value: string) => {
        form.setFieldsValue({ eProduct: value })
    }, [])
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
