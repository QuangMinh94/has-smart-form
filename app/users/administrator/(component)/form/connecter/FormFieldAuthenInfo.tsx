"use client"
import { authenInfo } from "@/app/(types)/formFiled/FormConnectManager/authenInfo"
import { typeForm } from "@/app/users/administrator/(component)/BtnModal"
import { typeAuthen } from "@/app/users/administrator/(component)/ModalFiledForm/connecterManager/AuthenInfo"
import { useContextAdminconnectManager } from "@/components/cusTomHook/useContext"
import { Button, Form, Input } from "antd"
import React, { memo } from "react"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = {
    CancelModal: () => void
    typeForm: typeAuthen
    typeAcTionForm: typeForm
    datarow: authenInfo
}
type FieldType = authenInfo
const FormFieldAuthenInfo: React.FC<Props> = ({
    CancelModal,
    typeForm,
    typeAcTionForm,
    datarow
}) => {
    const [form] = Form.useForm()
    const { setDataForm } = useContextAdminconnectManager()
    const HandelerCRUD = (dataHandeler: any, dataUpdate: FieldType) => {
        if (typeAcTionForm === "ADD_MODAL") {
            dataHandeler.unshift(dataUpdate)
        }
        if (typeAcTionForm === "UPDATE_MODAL") {
            const index = dataHandeler.findIndex(
                (item: any, index: number) => index === Number(datarow.key) - 1
            )

            dataHandeler.splice(index, 1, dataUpdate)
        }
        if (typeAcTionForm === "REMOVE_MODAL") {
            const index = dataHandeler.findIndex(
                (item: any, index: number) => index === Number(datarow.key) - 1
            )
            dataHandeler.splice(index, 1)
        }
    }
    const onFinish = (data: FieldType) => {
        setDataForm((dataForm) => {
            const authenHeader = dataForm.authenInfo.header
            const authenBody = dataForm.authenInfo.body
            const authenFieldHeader = dataForm.authenInfo.fieldsHeader
            if (typeForm === "header") {
                HandelerCRUD(authenHeader, data)
            }
            if (typeForm === "body") {
                HandelerCRUD(authenBody, data)
            }
            if (typeForm === "fieldHeader") {
                HandelerCRUD(authenFieldHeader, data)
            }
            return {
                ...dataForm,
                authenInfo: {
                    ...dataForm.authenInfo,
                    header: authenHeader,
                    body: authenBody,
                    fieldsHeader: authenFieldHeader
                }
            }
        })
        CancelModal()
    }

    return (
        <>
            <Form
                name={typeForm}
                form={form}
                labelCol={{ span: 7 }}
                style={{ width: 600 }}
                initialValues={{
                    name: datarow?.name,
                    value: datarow?.value,
                    description: datarow?.description
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                {typeAcTionForm === "REMOVE_MODAL" || (
                    <>
                        <Form.Item<FieldType>
                            style={{ marginBottom: "25px", width: "100%" }}
                            label={
                                typeForm === "fieldHeader"
                                    ? "Nhập thông tin"
                                    : "Tên trường hệ thống"
                            }
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: `Vui lòng nhập  ${
                                        typeForm === "fieldHeader"
                                            ? "thông tin"
                                            : "tên trường hệ thống"
                                    }`
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        {typeForm === "fieldHeader" || (
                            <>
                                <Form.Item<FieldType>
                                    style={{ marginBottom: "25px" }}
                                    label="Giá trị"
                                    name="value"
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Vui lòng chọn giá trị"
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item<FieldType>
                                    style={{ marginBottom: "25px" }}
                                    label="Mô tả"
                                    name="description"
                                >
                                    <Input.TextArea />
                                </Form.Item>
                            </>
                        )}
                    </>
                )}
                <div className="my-[25px] flex justify-end ">
                    <Button
                        type="primary"
                        style={{ minWidth: "100px" }}
                        onClick={CancelModal}
                        danger
                    >
                        Hủy
                    </Button>
                    <div className="ml-[10px]">
                        <Button type="primary" htmlType="submit">
                            {typeAcTionForm === "REMOVE_MODAL"
                                ? "Xác nhận"
                                : "Lưu"}
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default memo(FormFieldAuthenInfo)
