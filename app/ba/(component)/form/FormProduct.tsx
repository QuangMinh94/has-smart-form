"use client"
import React, { memo, useCallback, useState } from "react"

import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import useGetInfoUser from "@/components/cusTomHook/useGetInfoUser"
import { Button, Form, Input, message } from "antd"
import Uploadfile from "../Uploadfile"
import { useRouter } from "next/navigation"
import { setting } from "../ButtonOpenModal"
import { eProduct } from "@/app/(types)/eProduct"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = { type: setting; rowData: eProduct }
const FormOder: React.FC<Props> = ({ rowData, type }) => {
    const [form] = Form.useForm()
    const { token, session } = useCustomCookies()
    const { InFoUser } = useGetInfoUser()

    const [messageApi, contextHolder] = message.useMessage()
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false)

    const HandlerOnchangeEproduct = useCallback((value: string) => {
        form.setFieldsValue({ eProduct: value })
    }, [])
    const onFinish = ({
        eProduct,
        CCCD,
        name,
        phoneNumber,
        email
    }: {
        eProduct: string
        CCCD: string
        name: string
        phoneNumber: string
        email: string
    }) => {}
    console.log("row", rowData)
    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 7 }}
                style={{ maxWidth: 600 }}
                // initialValues={{
                //     CCCD: Info?.citizenId ?? "",
                //     name: Info?.fullName ?? "",
                //     phoneNumber: Info?.mobilePhoneNumber ?? "",
                //     email: Info?.emailAddress ?? "",
                //     address: InFoUser?.department?.name ?? ""
                // }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Mã sản phẩm"
                    name="idProduct"
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
                    label="Hình sản phẩm"
                    name="imageProduct"
                    rules={[
                        {
                            validator: (_, value: any) => {
                                if (!value.thumbUrl && !value.type) {
                                    return Promise.reject(
                                        "vui lòng chọn hình sản phẩm"
                                    )
                                }

                                return Promise.resolve()
                            }
                        }
                    ]}
                >
                    <Uploadfile
                        onChange={(data) => {
                            form.setFieldsValue({
                                imageProduct: data
                            })
                        }}
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

export default memo(FormOder)
