"use client"
import React, { memo, useCallback } from "react"

import { Button, Form, Input, InputNumber } from "antd"
import SelectEproduct from "@/app/teller/(components)/customSelect/SelectForm"

const onFinish = (values: any) => {
    console.log("Success:", values)
}

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}

const FormOder: React.FC = () => {
    const [form] = Form.useForm()
    return (
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 7 }}
            style={{ maxWidth: 600 }}
            initialValues={{ username: "hoang" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                style={{ marginTop: "25px" }}
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
