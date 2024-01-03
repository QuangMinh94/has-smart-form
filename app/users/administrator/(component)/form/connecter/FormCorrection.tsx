"use client"
import { corrections } from "@/app/(types)/Connecter"
import { typeForm } from "@/app/users/administrator/(component)/BtnModal"
import { useContextAdminAttachBu } from "@/components/cusTomHook/useContext"
import SelectForm from "@/components/selector/SelectForm"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Form, Input, Row } from "antd"
import React, { memo, useCallback, useState } from "react"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = {
    CancelModal: () => void
    typeForm: typeForm
    dataRow: corrections
}
type FieldType = corrections
const FormFieldParametter: React.FC<Props> = ({
    CancelModal,
    typeForm,
    dataRow
}) => {
    const [form] = Form.useForm()
    const { setDataGlobal } = useContextAdminAttachBu()
    const [nameType, setNameType] = useState<string>("")
    const onFinish = (data: FieldType) => {
        setDataGlobal((dataGlobal) => {
            const Correction = dataGlobal.Correction
            if (typeForm === "ADD_MODAL") {
                const id: any = data.type
                Correction.unshift({ ...data, type: { id, name: nameType } })
            }
            console.log(Correction)
            // if (typeForm === "UPDATE_MODAL") {
            //     const index = parametters.findIndex(
            //         (item, index) => index === Number(dataRow.key) - 1
            //     )

            //     parametters.splice(index, 1, data)
            // }
            // if (typeForm === "REMOVE_MODAL") {
            //     const index = parametters.findIndex(
            //         (item, index) => index === Number(dataRow.key) - 1
            //     )
            //     parametters.splice(index, 1)
            // }

            return { ...dataGlobal, Correction }
        })
        CancelModal()
    }

    const onChangeType = useCallback((value: string, option: any) => {
        console.log("options", option)
        setNameType(option?.label)
        form.setFieldsValue({ type: value })
    }, [])
    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 7 }}
                // initialValues={}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Row align="middle" gutter={14}>
                    <Col span={5}>
                        <Form.Item<FieldType>
                            // style={{ marginBottom: "25px" }}
                            // label="field"
                            name="attachBusiness"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Vui lòng nhập trường hệ thống"
                                }
                            ]}
                        >
                            <Input placeholder="Trường trên hệ thống" />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item<FieldType>
                            // style={{ marginBottom: "25px" }}
                            // label="field"
                            name="parametterConntion"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Vui lòng nhập trường kết nối đích"
                                }
                            ]}
                        >
                            <Input placeholder="Trường kết nối đích" />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item<FieldType>
                            // style={{ marginBottom: "25px" }}
                            // label="field"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Vui lòng nhập loại "
                                }
                            ]}
                        >
                            <SelectForm
                                onChange={onChangeType}
                                type="cateGoriFilterDataType"
                                placeholder="Loại "
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item<FieldType>
                            // style={{ marginBottom: "25px" }}
                            // label="field"
                            name="description"
                        >
                            <Input.TextArea placeholder="Mô tả" />
                        </Form.Item>
                    </Col>

                    <Col span={2}>
                        <div className="flex justify-center">
                            <Button
                                onClick={CancelModal}
                                style={{ marginRight: "8px" }}
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    style={{ color: "red" }}
                                />
                            </Button>
                            <Button htmlType="submit">
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    style={{ color: "green" }}
                                />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default memo(FormFieldParametter)
