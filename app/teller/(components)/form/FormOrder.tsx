"use client"
import React, { memo, useCallback } from "react"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import { Button, Form, Input, InputNumber } from "antd"
import SelectEproduct from "@/app/teller/(components)/customSelect/SelectForm"
import { info } from "console"

const onFinish = (values: any) => {
    console.log("Success:", values)
}

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}

const FormOder: React.FC = () => {
    const [form] = Form.useForm()
    const { dataGlobal } = useContextMyWorkDetail()
    const Info = dataGlobal.inFoUser
    const HandlerOnchangeEproduct = useCallback((value: string) => {
        form.setFieldsValue({ eProduct: value })
    }, [])
    return (
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 7 }}
            style={{ maxWidth: 600 }}
            initialValues={{
                CCCD: Info?.citizenId ?? "",
                name: Info?.fullName ?? "",
                phoneNumber: Info?.mobilePhoneNumber ?? "",
                email: Info?.emailAddress ?? ""
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Dịch vụ đăng ký"
                name="eProduct"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Vui lòng chọn dịch vụ!"
                    }
                ]}
            >
                <SelectEproduct
                    onChange={HandlerOnchangeEproduct}
                    type="getEProduct"
                />
            </Form.Item>

            <Form.Item
                style={{ marginTop: "15px" }}
                label="CCCD"
                name="CCCD"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Vui lòng nhập CCCD!"
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                style={{ marginTop: "15px" }}
                label="Họ và tên"
                name="name"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Vui lòng nhập Họ và tên!"
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                style={{ marginTop: "15px" }}
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Vui lòng nhập số điện thoại!"
                    }
                ]}
            >
                <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
                style={{ marginTop: "15px" }}
                label="Email"
                name="email"
                rules={[
                    {
                        type: "email",
                        message: "Vui lòng nhập đúng định dạng E-mail!"
                    },
                    {
                        required: true,
                        message: "Vui lòng nhập E-mail!"
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{ offset: 10, span: 16 }}
                style={{ marginTop: "50px" }}
            >
                <Button type="primary" htmlType="submit">
                    Xác nhận
                </Button>
            </Form.Item>
        </Form>
    )
}

export default memo(FormOder)
