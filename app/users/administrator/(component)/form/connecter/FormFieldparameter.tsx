"use client"
import { parametter } from "@/app/(types)/formFiled/FormConnectManager/parametter"
import { typeForm } from "@/app/users/administrator/(component)/BtnModal"
import { useContextAdminconnectManager } from "@/components/cusTomHook/useContext"
import { Button, Form, Input } from "antd"
import React, { memo } from "react"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = {
    CancelModal: () => void
    typeForm: typeForm
    dataRow: parametter
}
type FieldType = parametter
const FormFieldParametter: React.FC<Props> = ({
    CancelModal,
    typeForm,
    dataRow
}) => {
    const [form] = Form.useForm()
    const { setDataForm } = useContextAdminconnectManager()
    const onFinish = (data: FieldType) => {
        setDataForm((dataForm) => {
            const parametters = dataForm.parametter
            if (typeForm === "ADD_MODAL") {
                parametters.unshift(data)
            }
            if (typeForm === "UPDATE_MODAL") {
                const index = parametters.findIndex(
                    (item, index) => index === Number(dataRow.key) - 1
                )

                parametters.splice(index, 1, data)
            }
            if (typeForm === "REMOVE_MODAL") {
                const index = parametters.findIndex(
                    (item, index) => index === Number(dataRow.key) - 1
                )
                parametters.splice(index, 1)
            }

            return { ...dataForm, parametter: parametters }
        })
        CancelModal()
    }

    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 7 }}
                initialValues={{ field: dataRow.field }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                {typeForm === "REMOVE_MODAL" || (
                    <Form.Item<FieldType>
                        style={{ marginBottom: "25px" }}
                        label="field"
                        name="field"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Vui lòng nhập field"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                )}

                <div className="my-[25px] flex justify-end ">
                    <Button type="primary" onClick={CancelModal} danger>
                        Hủy
                    </Button>
                    <div className="ml-[10px]">
                        <Button type="primary" htmlType="submit">
                            {typeForm === "REMOVE_MODAL" ? "Xóa" : "Lưu"}
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default memo(FormFieldParametter)
