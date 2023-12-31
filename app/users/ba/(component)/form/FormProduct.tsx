"use client"
import React, { memo, useCallback, useState } from "react"

import useCustomCookies from "@/components/cusTomHook/useCustomCookies"

import { RevalidateTreeEProductViewPermssion } from "@/app/(actions)/action"
import { AddEproduct, UpdateEproduct } from "@/app/(service)/eProduct"
import {
    eProduct,
    requestBodyAddEproduct,
    requestBodyUpdateEproduct
} from "@/app/(types)/eProduct"
import { useContextBa } from "@/components/cusTomHook/useContext"
import useGetInfoUser from "@/components/cusTomHook/useGetInfoUser"
import SelectDepatment from "@/components/selector/SelectForm"
import { Button, Form, Input } from "antd"
import { useEnvContext } from "next-runtime-env"
import { setting } from "../../../(components)/button/ButtonOpenModalProduct"
import Uploadfile from "../Uploadfile"
const onFinishFailed = async (errorInfo: any) => {
    console.log("Failed:", await errorInfo)
}
type Props = { type: setting; rowData?: eProduct; cancelModel: () => void }
const FormProduct: React.FC<Props> = ({ rowData, type, cancelModel }) => {
    const [form] = Form.useForm()
    const { NEXT_PUBLIC_ADD_EPRODUCT, NEXT_PUBLIC_UPDATE_EPRODUCT } =
        useEnvContext()
    const { token, session } = useCustomCookies()
    const { InFoUser } = useGetInfoUser()
    const { messageApi, setDataGlobal } = useContextBa()
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false)

    const onFinish = ({
        department,
        idProduct,
        name,
        description,
        imageProduct
    }: {
        department: string
        idProduct: string
        imageProduct: {
            thumbUrl: string
            type: string
        }
        name: string
        description: string
    }) => {
        if (type === "ADD_MODAL") {
            const body: requestBodyAddEproduct = {
                name: name,
                description: description,
                active: true,
                department,
                code: idProduct,
                parent: `${rowData?._id}`,
                type: "P",
                image: {
                    data: imageProduct?.thumbUrl,
                    contentType: imageProduct?.type
                }
            }
            if (!imageProduct?.thumbUrl || !imageProduct?.type) {
                delete body.image
            }
            if (!rowData?._id) {
                // không có id parent tức là thêm vào cấp cáo nhất không con của ai
                delete body.parent
            }
            AddproductFC(body)
        }
        if (type === "UPDATE_MODAL") {
            const body: requestBodyUpdateEproduct = {
                id: rowData?._id ?? "",
                name: name,
                description: description,
                department,
                active: true,
                code: idProduct,
                type: "P",
                image: {
                    data: imageProduct?.thumbUrl,
                    contentType: imageProduct?.type
                }
            }
            if (!imageProduct?.thumbUrl || !imageProduct?.type) {
                delete body.image
            }
            UpdateproductFC(body)
        }
    }

    const AddproductFC = async (body: requestBodyAddEproduct) => {
        setLoadingBtn(true)
        try {
            const res = await AddEproduct({
                url: NEXT_PUBLIC_ADD_EPRODUCT!,
                bodyRequest: body,
                token,
                session
            })
            if (res.status === 200) {
                const resEproduct: eProduct = res.data
                await RevalidateTreeEProductViewPermssion()
                messageApi("success", "Thêm sản phẩm thành công")
                cancelModel()
                setDataGlobal((data) => {
                    const eProducts = [...data.eProducts]
                    function addEProduct(eProduct: eProduct[]) {
                        const dataAdd = {
                            ...resEproduct,
                            children: []
                            // image: {
                            //     data: body?.image?.data ?? "",
                            //     contentType: body?.image?.contentType ?? ""
                            // }
                        }
                        if (!body?.parent) {
                            eProduct.push(dataAdd)
                            return
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
    const UpdateproductFC = async (body: requestBodyUpdateEproduct) => {
        setLoadingBtn(true)
        try {
            const res = await UpdateEproduct({
                url: NEXT_PUBLIC_UPDATE_EPRODUCT!,
                bodyRequest: body,
                token,
                session
            })
            if (res.status === 200) {
                const resEproduct: eProduct = res.data
                // await RevalidateTreeEProduct()
                messageApi("success", "Cập nhật sản  phẩm thành công")
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
    const HanderOnchangeDepartment = useCallback((value: any) => {
        form.setFieldsValue({ department: value })
    }, [])
    return (
        <>
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 7 }}
                style={{ maxWidth: 600 }}
                initialValues={
                    type === "ADD_MODAL"
                        ? {}
                        : {
                              idProduct: rowData?.code ?? "",
                              name: rowData?.name ?? "",
                              description: rowData?.description ?? "",
                              department: rowData?.department ?? ""
                          }
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Mã sản phẩm"
                    name="idProduct"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng nhập mã sản phẩm!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng nhập tên sản phẩm!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Đơn vị"
                    name="department"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng chọn đơn vị!"
                        }
                    ]}
                >
                    <SelectDepatment
                        type="getDepartment"
                        onChange={HanderOnchangeDepartment}
                        enabledFecthData={type === "UPDATE_MODAL"}
                    />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Hình sản phẩm"
                    name="imageProduct"
                    // rules={[
                    //     {
                    //         validator: (_, value: any) => {
                    //             if (!value.thumbUrl && !value.type) {
                    //                 return Promise.reject(
                    //                     "vui lòng chọn hình sản phẩm"
                    //                 )
                    //             }

                    //             return Promise.resolve()
                    //         }
                    //     }
                    // ]}
                >
                    <Uploadfile
                        onChange={(data) => {
                            form.setFieldsValue({
                                imageProduct: data
                            })
                        }}
                        image={
                            rowData
                                ? {
                                      data: `${rowData?.image?.data}`,
                                      type: `${rowData?.image?.contentType}`
                                  }
                                : undefined
                        }
                    />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Mô tả"
                    name="description"
                    // rules={[
                    //     {
                    //         required: true,
                    //         whitespace: true,
                    //         message: "Vui lòng chọn dịch vụ!"
                    //     }
                    // ]}
                >
                    <Input.TextArea style={{ minHeight: "150px" }} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ offset: 10, span: 16 }}
                    style={{ marginBottom: "25px", marginTop: "25px" }}
                >
                    <Button
                        loading={loadingBtn}
                        type="primary"
                        htmlType="submit"
                    >
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default memo(FormProduct)
