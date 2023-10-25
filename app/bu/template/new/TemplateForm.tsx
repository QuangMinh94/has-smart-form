"use client"

import { ContextTemplate } from "@/components/context/context"
import { Col, DatePicker, Flex, Form, FormInstance, Input, Row } from "antd"
import axios from "axios"
import dayjs from "dayjs"
import { useCookies } from "next-client-cookies"
import { useContext } from "react"
const { TextArea } = Input

type FieldType = {
    formName: string
    formCode?: string
    validFrom?: any
    validTo?: string
    description: string
}

const TemplateForm = ({ form }: { form: FormInstance<any> }) => {
    const cookies = useCookies()
    const { choosenBlock, submitType, formData } = useContext(ContextTemplate)
    const onFinish = async (values: any) => {
        const inputValue = {
            description: values.description,
            validFrom: dayjs(values.validFrom).toString(),
            validTo: dayjs(values.validTo).toString(),
            code: Math.random().toString(),
            name: values.formName,
            block: choosenBlock.choosenBlock,
            button: submitType
        }

        await axios.post(process.env.NEXT_PUBLIC_EFORM_TEMPLATE!, inputValue, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + cookies.get("token"),
                Session: cookies.get("session")
            }
        })
    }
    return (
        <Form
            scrollToFirstError
            form={form}
            name="basic"
            wrapperCol={{ span: 24 }}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="on"
        >
            <Row gutter={10}>
                <Col xl={12} lg={12} md={24}>
                    <Flex vertical>
                        <Flex gap={8}>
                            <Form.Item<FieldType>
                                label="Tên form"
                                name="formName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the form name"
                                    }
                                ]}
                                className="w-3/6"
                            >
                                <Input
                                    value={
                                        formData.length > 0
                                            ? formData[0].name
                                            : ""
                                    }
                                />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Mã form"
                                name="formCode"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the form code"
                                    }
                                ]}
                                className="w-3/6"
                            >
                                <Input
                                    value={
                                        formData.length > 0
                                            ? formData[0].code
                                            : ""
                                    }
                                />
                            </Form.Item>
                        </Flex>
                        <Flex gap={8}>
                            <Form.Item<FieldType>
                                label="Ngày hiệu lực"
                                name="validFrom"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input valid from"
                                    }
                                ]}
                                className="w-3/6"
                            >
                                <DatePicker
                                    className="w-full"
                                    //value={formData.validFrom}
                                />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Hiệu lực đến"
                                name="validTo"
                                className="w-3/6"
                            >
                                <DatePicker
                                    className="w-full"
                                    //value={formData.validTo}
                                />
                            </Form.Item>
                        </Flex>
                    </Flex>
                </Col>
                <Col xl={12} lg={12} md={24}>
                    <Form.Item<FieldType>
                        label="Mô tả"
                        name="description"
                        className="w-full"
                    >
                        <TextArea
                            showCount
                            rows={5}
                            maxLength={255}
                            //style={{ height: 120, marginBottom: 24 }}
                            //onChange={onChange}
                            placeholder="can resize"
                            className="w-full"
                            value={
                                formData.length > 0
                                    ? formData[0].description
                                    : ""
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default TemplateForm
