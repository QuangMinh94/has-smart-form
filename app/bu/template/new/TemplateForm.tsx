"use client"

import { DatePicker, Flex, Form, Input } from "antd"

const { TextArea } = Input

type FieldType = {
    formName: string
    formCode?: string
    validFrom?: string
    validTo?: string
    description: string
}

const TemplateForm = () => {
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="vertical"
            //style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={(values) => console.log("Success", values)}
            //onFinishFailed={onFinishFailed}
            autoComplete="on"
        >
            <Flex>
                <Flex vertical className="w-full">
                    <Flex className="w-full">
                        <Form.Item<FieldType>
                            label="Tên form"
                            name="formName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the form name"
                                }
                            ]}
                        >
                            <Input />
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
                        >
                            <Input />
                        </Form.Item>
                    </Flex>
                    <Flex>
                        <Form.Item<FieldType>
                            label="Ngày hiệu lực"
                            name="validFrom"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input valid from"
                                }
                            ]}
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Hiệu lực đến"
                            name="validTo"
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>
                    </Flex>
                </Flex>
                <Form.Item<FieldType>
                    label="Mô tả"
                    name="description"
                    className="w-full"
                >
                    <TextArea
                        showCount
                        maxLength={255}
                        //style={{ height: 120, marginBottom: 24 }}
                        //onChange={onChange}
                        placeholder="can resize"
                        className="w-full"
                    />
                </Form.Item>

                {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}
            </Flex>
        </Form>
    )
}

export default TemplateForm
